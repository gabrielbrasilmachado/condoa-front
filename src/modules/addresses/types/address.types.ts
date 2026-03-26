export type AddressCondominium = {
  id: string
  name: string
}

export type Address = {
  id: string
  zipCode: string
  name: string
  number: string
  district: string
  city: string
  state: string
  complement: string | null
  condominiumId: string
  condominium: AddressCondominium
}

export type AddressPayload = {
  zipCode: string
  name: string
  district: string
  city: string
  state: string
  number: string
  complement?: string | null
  condominiumId: string
}

export type ViaCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}
