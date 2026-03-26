import { z } from 'zod'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

export const itemImageValidation = {
  maxFiles: 3,
  maxFileSizeInBytes: MAX_IMAGE_SIZE_BYTES,
  acceptedMimeTypes: ACCEPTED_IMAGE_TYPES,
} as const

export const itemFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres.')
    .max(255, 'Nome deve ter no máximo 255 caracteres.'),
  description: z
    .string()
    .trim()
    .min(2, 'Descrição deve ter pelo menos 2 caracteres.'),
  categoryId: z.uuid('Categoria deve ser um UUID válido.'),
  expiredAt: z
    .string()
    .trim()
    .min(1, 'Data de expiração é obrigatória.')
    .refine((value) => !Number.isNaN(new Date(`${value}T12:00:00`).getTime()), {
      message: 'Data de expiração inválida.',
    }),
  status: z.enum(['available', 'donated']).optional(),
})

export type ItemFormInput = z.input<typeof itemFormSchema>
export type ItemFormData = z.output<typeof itemFormSchema>
