import { z } from "zod";

export const createTourSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").trim(),
  slug: z.string().min(2, "Slug must be at least 2 characters").trim(),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  duration: z.string().min(1, "Duration is required").trim(),
  description: z.string().min(10, "Description must be at least 10 characters").trim(),
  itinerary: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  order: z.coerce.number().int().optional(),
  featured: z.boolean().optional(),
  maxGroupSize: z.coerce.number().int().min(1).optional(),
});

export const updateTourSchema = createTourSchema.partial();
