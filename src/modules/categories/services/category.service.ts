import { api } from '@/shared/lib/http/api'
import type {
  Category,
  CategoryPayload,
} from '@/modules/categories/types/category.types'

export async function listCategories() {
  const { data } = await api.get<Category[]>('/categories')
  return data
}

export async function createCategory(payload: CategoryPayload) {
  const { data } = await api.post<Category>('/categories', payload)
  return data
}

export async function updateCategory(id: string, payload: CategoryPayload) {
  const { data } = await api.patch<Category>(`/categories/${id}`, payload)
  return data
}

export async function deleteCategory(id: string) {
  await api.delete(`/categories/${id}`)
}
