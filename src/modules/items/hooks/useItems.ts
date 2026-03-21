import { useQuery } from '@tanstack/react-query'
import { listItems } from '@/modules/items/services/list-items.service'

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: listItems,
  })
}
