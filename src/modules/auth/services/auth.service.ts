import { api } from '@/shared/lib/http/api'
import type { LoginPayload, LoginResponse } from '@/modules/auth/types/auth.types'

export async function login(payload: LoginPayload) {
  const { data } = await api.post<LoginResponse>('/auth/login', payload)
  return data
}

export async function getMe() {
  const { data } = await api.get<{ user: LoginResponse['user'] }>('/auth/me')
  return data.user
}
