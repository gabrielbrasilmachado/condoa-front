import { api } from '@/shared/lib/http/api'
import type {
  ListItemsParams,
  ListItemsResponse,
} from '@/modules/items/types/item.types'

export async function listMyItems(params: ListItemsParams) {
  const { data } = await api.get<ListItemsResponse>('/items/my-items', {
    params,
  })
  return data
}
