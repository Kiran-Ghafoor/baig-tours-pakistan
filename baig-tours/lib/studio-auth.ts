export const STUDIO_COOKIE_NAME = "baig_tours_studio_auth";
const COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

function cookieSecret(): string {
  return process.env.STUDIO_AUTH_SECRET || process.env.STUDIO_PASSWORD || "";
}

export function isStudioAuthConfigured(): boolean {
  return Boolean(process.env.STUDIO_PASSWORD);
}

function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function verifyStudioPassword(password: unknown): boolean {
  const expected = process.env.STUDIO_PASSWORD || "";
  if (!expected || typeof password !== "string" || password.length === 0) return false;
  return constantTimeEquals(password, expected);
}

async function sign(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(cookieSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidStudioSession(cookieValue: string | undefined): Promise<boolean> {
  if (!isStudioAuthConfigured() || !cookieValue) return false;
  const separator = cookieValue.lastIndexOf(".");
  if (separator <= 0) return false;
  const payload = cookieValue.slice(0, separator);
  const signature = cookieValue.slice(separator + 1);
  const expected = await sign(payload);
  return constantTimeEquals(signature, expected);
}

export async function createStudioSessionCookie() {
  const now = Math.floor(Date.now() / 1000);
  const payload = `${now}`;
  const value = `${payload}.${await sign(payload)}`;

  return {
    name: STUDIO_COOKIE_NAME,
    value,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  } as const;
}

export function clearStudioSessionCookie() {
  return {
    name: STUDIO_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  } as const;
}
