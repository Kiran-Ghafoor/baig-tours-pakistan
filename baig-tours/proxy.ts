import { NextRequest, NextResponse } from "next/server";
import {
  canAccessStudio,
  getSessionUser,
  STUDIO_COOKIE_NAME,
} from "@/lib/studio-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/studio" && !pathname.startsWith("/studio/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(STUDIO_COOKIE_NAME)?.value;
  const user = token ? await getSessionUser(token) : null;

  if (user && canAccessStudio(user.role)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/studio-login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/studio/:path*"],
};
