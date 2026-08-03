import bcrypt from "bcryptjs";
import type { StudioRole } from "@/lib/studio-auth";

export interface StudioUser {
  username: string;
  role: StudioRole;
  passwordHash: string;
}

function decodeUsers(raw: string): string {
  const trimmed = raw.trim();

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) return trimmed;

  try {
    const decoded = Buffer.from(trimmed, "base64").toString("utf8");
    const value = JSON.parse(decoded);
    return JSON.stringify(value);
  } catch {
    return trimmed;
  }
}

function parseUsers(raw: string | undefined): StudioUser[] {
  if (!raw) return [];

  try {
    const value = JSON.parse(decodeUsers(raw));
    if (!Array.isArray(value)) return [];

    return value.filter(
      (u): u is StudioUser =>
        !!u &&
        typeof u.username === "string" &&
        u.username.length > 0 &&
        typeof u.passwordHash === "string" &&
        u.passwordHash.length > 0 &&
        (u.role === "admin" || u.role === "editor" || u.role === "user")
    );
  } catch {
    return [];
  }
}

export function getStudioUsers(): StudioUser[] {
  return parseUsers(process.env.STUDIO_USERS);
}

export function getUserByUsername(username: string): StudioUser | null {
  if (!username) return null;
  return getStudioUsers().find((u) => u.username === username) ?? null;
}

export async function verifyStudioCredentials(
  username: unknown,
  password: unknown
): Promise<StudioUser | null> {
  if (typeof username !== "string" || typeof password !== "string") return null;

  const user = getUserByUsername(username);
  if (!user) return null;

  const matches = await bcrypt.compare(password, user.passwordHash);
  return matches ? user : null;
}
