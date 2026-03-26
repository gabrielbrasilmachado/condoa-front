import { api } from '@/shared/lib/http/api'
import type {
  CondominiumRequest,
  CondominiumRequestListResponse,
  CondominiumRequestStatus,
  CreateCondominiumRequestPayload,
} from '@/modules/condominiumRequests/types/condominium-request.types'

type ListCondominiumRequestsParams = {
  page?: number
  perPage?: number
  status?: CondominiumRequestStatus
  condominiumId?: string
  sortBy?: 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export async function listOwnCondominiumRequests() {
  const { data } = await api.get<CondominiumRequestListResponse>('/condominium-requests/me', {
    params: {
      page: 1,
      perPage: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    },
  })

  return data
}

export async function listCondominiumRequests(params: ListCondominiumRequestsParams) {
  const { data } = await api.get<CondominiumRequestListResponse>('/condominium-requests', {
    params: {
      page: params.page ?? 1,
      perPage: params.perPage ?? 10,
      status: params.status,
      condominiumId: params.condominiumId,
      sortBy: params.sortBy ?? 'createdAt',
      sortOrder: params.sortOrder ?? 'desc',
    },
  })

  return data
}

export async function createCondominiumRequest(payload: CreateCondominiumRequestPayload) {
  const { data } = await api.post<CondominiumRequest>('/condominium-requests', payload)
  return data
}

export async function approveCondominiumRequest(requestId: string) {
  const { data } = await api.patch<CondominiumRequest>(`/condominium-requests/${requestId}/approve`)
  return data
}

export async function rejectCondominiumRequest(requestId: string, rejectionReason?: string) {
  const payload = rejectionReason?.trim() ? { rejectionReason: rejectionReason.trim() } : {}
  const { data } = await api.patch<CondominiumRequest>(`/condominium-requests/${requestId}/reject`, payload)
  return data
}
