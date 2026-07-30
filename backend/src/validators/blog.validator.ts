import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").trim(),
  slug: z.string().min(2, "Slug must be at least 2 characters").trim(),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").trim(),
  content: z.array(z.unknown()).optional(),
  coverImage: z.string().optional(),
  author: z.string().min(2, "Author must be at least 2 characters").trim().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();
