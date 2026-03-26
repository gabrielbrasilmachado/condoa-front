import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { listCondominiumRequests } from '@/modules/condominiumRequests/services/condominium-request.service'
import type { CondominiumRequestStatus } from '@/modules/condominiumRequests/types/condominium-request.types'

type UseAdminCondominiumRequestsParams = {
  page: number
  perPage: number
  status?: CondominiumRequestStatus
  condominiumId?: string
}

export function useAdminCondominiumRequests({
  page,
  perPage,
  status,
  condominiumId,
}: UseAdminCondominiumRequestsParams) {
  return useQuery({
    queryKey: [
      'condominium-requests',
      'admin',
      page,
      perPage,
      status ?? 'all',
      condominiumId ?? 'all',
    ],
    queryFn: () =>
      listCondominiumRequests({
        page,
        perPage,
        status,
        condominiumId,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
    placeholderData: keepPreviousData,
  })
}
