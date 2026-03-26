import { api } from '@/shared/lib/http/api'
import type { AuthUser } from '@/modules/auth/types/auth.types'

type UpdateOwnProfilePayload = {
  name: string
  email: string
  phone: string
  currentPassword?: string
  newPassword?: string
}

export async function updateOwnProfile(
  userId: string,
  payload: UpdateOwnProfilePayload,
) {
  const { data } = await api.patch<AuthUser>(`/users/${userId}/profile`, payload)
  return data
}

export type { UpdateOwnProfilePayload }
