export type CondominiumRequestStatus = 'pending' | 'approved' | 'rejected'

export type CondominiumRequest = {
  id: string
  status: CondominiumRequestStatus
  rejectionReason: string | null
  reviewedAt: string | null
  created_at: string
  updated_at: string
  user: {
    id: string
    name: string
    email: string
  }
  condominium: {
    id: string
    name: string
  }
  reviewed_by: {
    id: string
    name: string
  } | null
}

export type CondominiumRequestListResponse = {
  data: CondominiumRequest[]
  meta: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
  filters: {
    status?: CondominiumRequestStatus
    userId?: string
    condominiumId?: string
  }
  sort: {
    sortBy: 'createdAt'
    sortOrder: 'asc' | 'desc'
  }
}

export type CreateCondominiumRequestPayload = {
  condominiumId: string
}
