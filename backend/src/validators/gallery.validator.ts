import { z } from "zod";

export const createGallerySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").trim(),
  imageUrl: z.string().url("Image URL must be a valid URL"),
  alt: z.string().min(2, "Alt text must be at least 2 characters").trim().optional(),
  order: z.coerce.number().int().optional(),
  category: z.string().trim().optional(),
  featured: z.boolean().optional(),
});

export const updateGallerySchema = createGallerySchema.partial();
