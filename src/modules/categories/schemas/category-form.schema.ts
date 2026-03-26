import { z } from 'zod'
export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres.')
    .max(255, 'Nome deve ter no máximo 255 caracteres.')
    .transform((value) => value.toUpperCase()),
})
export type CategoryFormData = z.infer<typeof categoryFormSchema>
