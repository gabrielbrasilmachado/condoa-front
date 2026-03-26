import { api } from '@/shared/lib/http/api'
import type { ItemDetails } from '@/modules/items/types/item.types'

type UpdateItemPayload = {
  name: string
  description: string
  categoryId: string
  expiredAt: string
  status?: 'available' | 'donated'
}

export async function updateItem(itemId: string, payload: UpdateItemPayload) {
  const { data } = await api.patch<ItemDetails>(`/items/${itemId}`, payload)
  return data
}
