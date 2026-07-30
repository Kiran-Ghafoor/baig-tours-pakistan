import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Invalid email address").trim(),
  phone: z.string().min(7, "Invalid phone number").trim(),
  message: z.string().min(10, "Message must be at least 10 characters").trim(),
});
