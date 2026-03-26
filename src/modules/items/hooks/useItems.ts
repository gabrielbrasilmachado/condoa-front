import { useQuery } from '@tanstack/react-query'
import { listItems } from '@/modules/items/services/list-items.service'
import type { ListItemsParams } from '@/modules/items/types/item.types'

export function useItems(params: ListItemsParams) {
  return useQuery({
    queryKey: ['items', params],
    queryFn: () => listItems(params),
  })
}
