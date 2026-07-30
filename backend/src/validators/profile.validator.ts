import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2).trim().optional(),
  email: z.string().email().trim().optional(),
  currentPassword: z.string().min(6).optional(),
  newPassword: z.string().min(6).optional(),
}).refine(
  (data) => {
    if (data.currentPassword && !data.newPassword) return false;
    if (!data.currentPassword && data.newPassword) return false;
    return true;
  },
  { message: "Both current and new password are required to change password" }
);
