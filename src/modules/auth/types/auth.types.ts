export type UserRole = 'admin' | 'user'

export type AuthUser = {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  status: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  user: AuthUser
}
