import { z } from 'zod'

const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/

const passwordSchema = z
  .string()
  .trim()
  .min(8, 'Senha deve ter pelo menos 8 caracteres.')
  .max(255, 'Senha deve ter no máximo 255 caracteres.')

export const profileFormSchema = z
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
    currentPassword: z.string().trim().optional(),
    newPassword: z.string().trim().optional(),
    newPasswordConfirmation: z.string().trim().optional(),
  })
  .superRefine((data, context) => {
    const isChangingPassword =
      Boolean(data.currentPassword) ||
      Boolean(data.newPassword) ||
      Boolean(data.newPasswordConfirmation)

    if (!isChangingPassword) {
      return
    }

    if (!data.currentPassword) {
      context.addIssue({
        code: 'custom',
        message: 'Informe a senha atual para alterar a senha.',
        path: ['currentPassword'],
      })
    } else {
      const parsedCurrentPassword = passwordSchema.safeParse(data.currentPassword)
      if (!parsedCurrentPassword.success) {
        context.addIssue({
          code: 'custom',
          message: parsedCurrentPassword.error.issues[0]?.message ?? 'Senha atual inválida.',
          path: ['currentPassword'],
        })
      }
    }

    if (!data.newPassword) {
      context.addIssue({
        code: 'custom',
        message: 'Informe a nova senha.',
        path: ['newPassword'],
      })
    } else {
      const parsedNewPassword = passwordSchema.safeParse(data.newPassword)
      if (!parsedNewPassword.success) {
        context.addIssue({
          code: 'custom',
          message: parsedNewPassword.error.issues[0]?.message ?? 'Nova senha inválida.',
          path: ['newPassword'],
        })
      }
    }

    if (!data.newPasswordConfirmation) {
      context.addIssue({
        code: 'custom',
        message: 'Confirme a nova senha.',
        path: ['newPasswordConfirmation'],
      })
    }

    if (
      data.newPassword &&
      data.newPasswordConfirmation &&
      data.newPassword !== data.newPasswordConfirmation
    ) {
      context.addIssue({
        code: 'custom',
        message: 'A confirmacao deve ser igual a nova senha.',
        path: ['newPasswordConfirmation'],
      })
    }
  })

export type ProfileFormData = z.infer<typeof profileFormSchema>
