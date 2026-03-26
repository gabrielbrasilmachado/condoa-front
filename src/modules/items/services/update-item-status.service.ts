import { api } from '@/shared/lib/http/api'
import type { ItemDetails } from '@/modules/items/types/item.types'

type UpdateItemStatusPayload = {
  status: 'available' | 'donated'
}

export async function updateItemStatus(itemId: string, payload: UpdateItemStatusPayload) {
  const { data } = await api.patch<ItemDetails>(`/items/${itemId}`, payload)
  return data
}
