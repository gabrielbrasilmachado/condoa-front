export type CondominiumAddress = {
  id: string
  zipCode: string
  name: string
  number: string
  district: string
  city: string
  state: string
  complement: string | null
} | null

export type Condominium = {
  id: string
  name: string
  createdAt?: string
  updatedAt?: string
  users?: Array<{ id: string }>
  usersCount?: number
  address?: CondominiumAddress
}

export type CondominiumPayload = {
  name: string
}
