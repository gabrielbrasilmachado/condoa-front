import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { listMyItems } from '@/modules/items/services/list-my-items.service'
import type { ListItemsParams } from '@/modules/items/types/item.types'

export function useMyItems(params: ListItemsParams) {
  return useQuery({
    queryKey: ['items', 'mine', params],
    queryFn: () => listMyItems(params),
    placeholderData: keepPreviousData,
  })
}
