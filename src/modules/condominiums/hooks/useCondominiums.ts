import { useQuery } from '@tanstack/react-query'
import { listCondominiums } from '@/modules/condominiums/services/condominium.service'

export function useCondominiums() {
  return useQuery({
    queryKey: ['condominiums'],
    queryFn: listCondominiums,
  })
}
