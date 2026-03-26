import { api } from '@/shared/lib/http/api'
import type { RegisterUserFormData } from '@/modules/users/schemas/register-user.schema'

type RegisterUserPayload = Omit<RegisterUserFormData, 'passwordConfirmation'>

export async function registerUser(data: RegisterUserPayload) {
  const response = await api.post('/users', data)
  return response.data
}
