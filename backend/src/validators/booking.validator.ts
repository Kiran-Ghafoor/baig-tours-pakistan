import { z } from "zod";

export const createBookingSchema = z.object({
  tourSlug: z.string().min(1, "Tour is required").trim(),
  fullName: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Invalid email address").trim(),
  phone: z.string().min(7, "Invalid phone number").trim(),
  travelDate: z.string().min(1, "Travel date is required"),
  travelers: z.coerce.number().int().min(1).max(30),
  notes: z.string().trim().optional(),
});

export const updateBookingSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
  travelDate: z.string().optional(),
  travelers: z.coerce.number().int().min(1).max(30).optional(),
  notes: z.string().trim().optional(),
});
