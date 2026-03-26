import { z } from 'zod'

const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/

export const registerUserSchema = z
  .object({
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
    password: z
      .string()
      .trim()
      .min(8, 'Senha deve ter pelo menos 8 caracteres.')
      .max(255, 'Senha deve ter no máximo 255 caracteres.'),
    passwordConfirmation: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'A confirmacao de senha deve ser igual a senha informada.',
    path: ['passwordConfirmation'],
  })

export type RegisterUserFormData = z.infer<typeof registerUserSchema>
