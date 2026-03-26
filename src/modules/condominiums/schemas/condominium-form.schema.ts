import { z } from 'zod'

export const condominiumFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres.')
    .max(255, 'Nome deve ter no máximo 255 caracteres.'),
})

export type CondominiumFormData = z.infer<typeof condominiumFormSchema>
