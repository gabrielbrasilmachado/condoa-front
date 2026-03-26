import { api } from '@/shared/lib/http/api'
import type {
  Condominium,
  CondominiumPayload,
} from '@/modules/condominiums/types/condominium.types'

export async function listCondominiums() {
  const { data } = await api.get<Condominium[]>('/condominiums')
  return data
}

export async function createCondominium(payload: CondominiumPayload) {
  const { data } = await api.post<Condominium>('/condominiums', payload)
  return data
}

export async function updateCondominium(
  id: string,
  payload: CondominiumPayload
) {
  const { data } = await api.patch<Condominium>(`/condominiums/${id}`, payload)
  return data
}

export async function deleteCondominium(id: string) {
  await api.delete(`/condominiums/${id}`)
}
