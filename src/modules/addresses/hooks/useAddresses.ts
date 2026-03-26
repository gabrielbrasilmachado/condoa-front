import { useQuery } from '@tanstack/react-query'
import { listAddresses } from '@/modules/addresses/services/address.service'

export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: listAddresses,
  })
}
