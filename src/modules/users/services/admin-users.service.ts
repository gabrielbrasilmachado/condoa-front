import { api } from '@/shared/lib/http/api'
import type {
  ListUsersParams,
  ListUsersResponse,
  UpdateUserPayload,
} from '@/modules/users/types/user-admin.types'

export async function listUsers(params: ListUsersParams) {
  const { data } = await api.get<ListUsersResponse>('/users', {
    params,
  })
  return data
}

export async function updateUser(id: string, payload: UpdateUserPayload) {
  const { data } = await api.patch(`/users/${id}`, payload)
  return data
}

export async function updateUserStatus(id: string, status: 'active' | 'inactive') {
  const { data } = await api.patch(`/users/${id}/status`, { status })
  return data
}
