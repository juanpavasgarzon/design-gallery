import { z } from "zod";

export const designSchema = z.object({
  title: z.string().min(1, "Title is required").max(120, "Title is too long"),
  categoryId: z.string().min(1, "Pick a category"),
  description: z.string().optional(),
  embedUrl: z
    .string()
    .min(1, "Embed URL is required")
    .url("Must be a valid URL (https://…)"),
});

export type DesignInput = z.infer<typeof designSchema>;
