import { api } from '@/shared/lib/http/api'
import type { Item } from '@/modules/items/types/item.types'

export async function listItems() {
  const { data } = await api.get<Item[]>('/items')
  return data
}
