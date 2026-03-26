import { z } from 'zod'

const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/

export const adminUserEditSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres.')
    .max(255, 'Nome deve ter no máximo 255 caracteres.'),
  email: z.email('Informe um e-mail valido.').trim().toLowerCase(),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, 'Telefone deve estar no formato (11) 11111-1111.'),
  role: z.enum(['admin', 'user']),
  condominiumId: z.uuid().nullable().optional(),
})

export type AdminUserEditFormData = z.infer<typeof adminUserEditSchema>
