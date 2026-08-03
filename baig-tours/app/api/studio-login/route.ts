import { NextRequest, NextResponse } from "next/server";
import {
  createStudioSessionCookie,
  isStudioAuthConfigured,
} from "@/lib/studio-auth";
import { verifyStudioCredentials } from "@/lib/studio-users";

const FAILURE_DELAY_MS = 300;
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

const attempts = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now >= entry.resetAt) {
    attempts.set(ip, { count: 0, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_ATTEMPTS) return true;
  return false;
}

function recordFailure(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now >= entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

function clearFailures(ip: string) {
  attempts.delete(ip);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  if (isRateLimited(ip)) {
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  if (!isStudioAuthConfigured()) {
    recordFailure(ip);
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  let username: unknown;
  let password: unknown;
  try {
    const body = await request.json();
    username = body?.username;
    password = body?.password;
  } catch {
    // malformed body -> treat as invalid credentials
  }

  if (typeof username !== "string" || typeof password !== "string") {
    recordFailure(ip);
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const user = await verifyStudioCredentials(username, password);
  if (!user) {
    recordFailure(ip);
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  clearFailures(ip);

  const response = NextResponse.json({ ok: true, role: user.role });
  response.cookies.set({
    ...(await createStudioSessionCookie({ username: user.username, role: user.role })),
  });
  return response;
}
