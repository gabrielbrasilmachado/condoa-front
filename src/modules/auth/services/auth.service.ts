import { authApi, api } from '@/shared/lib/http/api'
import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  RefreshResponse,
} from '@/modules/auth/types/auth.types'

export async function login(payload: LoginPayload) {
  const { data } = await authApi.post<LoginResponse>('/auth/login', payload)
  return data
}

export async function refreshSession() {
  const { data } = await authApi.post<RefreshResponse>('/auth/refresh')
  return data
}

export async function logout() {
  await authApi.post('/auth/logout')
}

export async function getMe() {
  const { data } = await api.get<AuthUser>('/auth/me')
  return data
}
