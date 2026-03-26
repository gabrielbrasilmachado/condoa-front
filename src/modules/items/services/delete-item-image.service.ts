import { api } from '@/shared/lib/http/api'

export async function deleteItemImage(itemId: string, imageId: string) {
  await api.delete(`/items/${itemId}/images/${imageId}`)
}
