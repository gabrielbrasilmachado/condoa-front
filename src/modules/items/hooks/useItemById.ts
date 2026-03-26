import { useQuery } from '@tanstack/react-query'
import { getItemById } from '@/modules/items/services/get-item-by-id.service'

export function useItemById(itemId: string) {
  return useQuery({
    queryKey: ['items', 'detail', itemId],
    queryFn: () => getItemById(itemId),
    enabled: Boolean(itemId),
  })
}
