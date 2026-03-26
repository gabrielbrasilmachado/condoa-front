export type UserRole = 'admin' | 'user'

export type AuthUser = {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  status: string
  condominium_id: string | null
  created_at: string
  updated_at: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  expiresIn: number
  user: AuthUser
}

export type RefreshResponse = {
  accessToken: string
  expiresIn: number
}
