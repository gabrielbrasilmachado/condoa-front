import axios from 'axios'
import { api } from '@/shared/lib/http/api'
import type {
  Address,
  AddressPayload,
  ViaCepResponse,
} from '@/modules/addresses/types/address.types'

export async function listAddresses() {
  const { data } = await api.get<Address[]>('/addresses')
  return data
}

export async function createAddress(payload: AddressPayload) {
  const { data } = await api.post<Address>('/addresses', payload)
  return data
}

export async function updateAddress(id: string, payload: AddressPayload) {
  const { data } = await api.patch<Address>(`/addresses/${id}`, payload)
  return data
}

export async function deleteAddress(id: string) {
  await api.delete(`/addresses/${id}`)
}

export async function lookupZipCode(zipCode: string) {
  const { data } = await axios.get<ViaCepResponse>(
    `https://viacep.com.br/ws/${zipCode}/json/`,
  )

  return data
}
