import { api } from '@/shared/lib/http/api'
import type { ItemDetails } from '@/modules/items/types/item.types'

export async function getItemById(itemId: string) {
  const { data } = await api.get<ItemDetails>(`/items/${itemId}`)
  return data
}
