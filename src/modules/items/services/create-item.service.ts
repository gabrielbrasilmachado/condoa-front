import { api } from '@/shared/lib/http/api'

type CreateItemPayload = {
  name: string
  description: string
  categoryId: string
  expiredAt: string
}

type CreatedItemResponse = {
  id: string
  name: string
  description: string
  categoryId: string
  userId: string
  status: string
  expiredAt: string | null
  createdAt: string
  updatedAt: string
}

export async function createItem(payload: CreateItemPayload) {
  const { data } = await api.post<CreatedItemResponse>('/items', payload)
  return data
}
