import * as z from 'zod';

export const postSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(100, 'El título no puede exceder 100 caracteres'),
  body: z.string().min(10, 'El cuerpo debe tener al menos 10 caracteres'),
});

export type PostFormData = z.infer<typeof postSchema>;