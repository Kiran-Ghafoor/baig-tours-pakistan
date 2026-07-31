import { NextRequest, NextResponse } from "next/server";
import { isValidStudioSession, STUDIO_COOKIE_NAME } from "@/lib/studio-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/studio" && !pathname.startsWith("/studio/")) {
    return NextResponse.next();
  }

  const session = request.cookies.get(STUDIO_COOKIE_NAME)?.value;
  const valid = await isValidStudioSession(session);

  if (valid) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/studio-login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/studio/:path*"],
};
