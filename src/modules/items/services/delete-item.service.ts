import { api } from '@/shared/lib/http/api'

export async function deleteItem(itemId: string) {
  await api.delete(`/items/${itemId}`)
}
