import { useQuery } from '@tanstack/react-query'
import { listOwnCondominiumRequests } from '@/modules/condominiumRequests/services/condominium-request.service'

export function useOwnCondominiumRequests() {
  return useQuery({
    queryKey: ['condominium-requests', 'me'],
    queryFn: listOwnCondominiumRequests,
  })
}
