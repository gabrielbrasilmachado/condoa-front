import { api } from '@/shared/lib/http/api'
import type {
  ListItemsParams,
  ListItemsResponse,
} from '@/modules/items/types/item.types'

export async function listItems(params: ListItemsParams) {
  const { data } = await api.get<ListItemsResponse>('/items', {
    params,
  })
  return data
}
