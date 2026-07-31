import { NextRequest, NextResponse } from "next/server";
import { createStudioSessionCookie, verifyStudioPassword } from "@/lib/studio-auth";

export async function POST(request: NextRequest) {
  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    password = undefined;
  }

  if (!verifyStudioPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({ ...(await createStudioSessionCookie()) });
  return response;
}
