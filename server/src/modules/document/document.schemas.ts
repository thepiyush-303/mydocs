import { z } from "zod";

export const createDocumentSchema = z.object({
  title: z.string().trim().min(1).max(100).optional(),
  content: z.string().max(1_000_000).optional()
});

export const updateDocumentSchema = z
  .object({
    title: z.string().trim().min(1).max(100).optional(),
    content: z.string().max(1_000_000).optional()
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: "At least one field is required"
  });

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;