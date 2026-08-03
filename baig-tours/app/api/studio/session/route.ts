import { NextRequest, NextResponse } from "next/server";
import {
  canAccessStudio,
  getSessionUser,
  STUDIO_COOKIE_NAME,
} from "@/lib/studio-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(STUDIO_COOKIE_NAME)?.value;
  const user = token ? await getSessionUser(token) : null;

  if (!user || !canAccessStudio(user.role)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    username: user.username,
    role: user.role,
  });
}
