import { SignJWT, jwtVerify } from "jose";

export const STUDIO_COOKIE_NAME = "baig_tours_studio_auth";
export const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;

export type StudioRole = "admin" | "editor" | "user";

const STUDIO_ROLES: readonly StudioRole[] = ["admin", "editor", "user"];
const STUDIO_ACCESS_ROLES: readonly StudioRole[] = ["admin", "editor"];

export interface StudioSessionUser {
  username: string;
  role: StudioRole;
}

function cookieSecret(): string {
  return process.env.STUDIO_AUTH_SECRET || process.env.STUDIO_PASSWORD || "";
}

export function isStudioAuthConfigured(): boolean {
  return Boolean(cookieSecret());
}

export function isStudioRole(value: unknown): value is StudioRole {
  return (
    typeof value === "string" &&
    (STUDIO_ROLES as readonly string[]).includes(value)
  );
}

export function canAccessStudio(role: StudioRole): boolean {
  return (STUDIO_ACCESS_ROLES as readonly StudioRole[]).includes(role);
}

async function signSessionToken(user: StudioSessionUser): Promise<string> {
  return new SignJWT({ role: user.role })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(user.username)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS)
    .sign(new TextEncoder().encode(cookieSecret()));
}

export async function getSessionUser(token: string | undefined): Promise<StudioSessionUser | null> {
  const secret = cookieSecret();
  if (!secret || !token) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
    });
    if (typeof payload.sub !== "string" || !isStudioRole(payload.role)) {
      return null;
    }
    return { username: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}

export async function createStudioSessionCookie(user: StudioSessionUser) {
  const value = await signSessionToken(user);

  return {
    name: STUDIO_COOKIE_NAME,
    value,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
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
