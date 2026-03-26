export type UserRole = 'admin' | 'user'
export type UserStatus = 'active' | 'inactive'

export type UserCondominium = {
  id: string
  name: string
}

export type AdminUser = {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  status: UserStatus
  condominium_id: string | null
  condominium: UserCondominium | null
  created_at: string
  updated_at: string
}

export type ListUsersParams = {
  page: number
  perPage: number
  name?: string
  email?: string
  condominiumId?: string
  sortBy: 'createdAt'
  sortOrder: 'asc' | 'desc'
}

export type ListUsersResponse = {
  data: AdminUser[]
  meta: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
  filters: {
    name?: string
    email?: string
    condominiumId?: string
  }
  sort: {
    sortBy: 'createdAt'
    sortOrder: 'asc' | 'desc'
  }
}

export type UpdateUserPayload = {
  name: string
  email: string
  phone: string
  role: UserRole
  condominiumId?: string | null
}
