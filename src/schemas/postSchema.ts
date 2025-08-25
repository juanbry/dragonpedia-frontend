import * as z from 'zod';

export const postSchema = z.object({
  title: z.string().min(5, 'El nombre debe tener al menos 5 caracteres').max(100, 'El título no puede exceder 100 caracteres'),
  body: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
});

export type PostFormData = z.infer<typeof postSchema>;