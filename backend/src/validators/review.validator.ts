import { z } from "zod";

export const createReviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Invalid email").trim().optional(),
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().min(10, "Review must be at least 10 characters").trim(),
  date: z.string().optional(),
  tourName: z.string().trim().optional(),
  avatar: z.string().optional(),
  featured: z.boolean().optional(),
});

export const updateReviewSchema = createReviewSchema.partial();
