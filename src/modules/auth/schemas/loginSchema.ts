import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Informe um e-mail valido.'),
  password: z.string().trim().min(1, 'Senha e obrigatoria.'),
})

export type LoginFormData = z.infer<typeof loginSchema>
