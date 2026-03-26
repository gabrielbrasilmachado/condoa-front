import { z } from 'zod'
import { isValidZipCode, normalizeZipCode } from '@/modules/addresses/utils/zip-code'

const nullableComplement = z
  .string()
  .trim()
  .max(255, 'Complemento deve ter no máximo 255 caracteres.')
  .transform((value) => (value === '' ? null : value))

export const addressFormSchema = z.object({
  zipCode: z
    .string()
    .trim()
    .refine(isValidZipCode, 'CEP inválido.')
    .transform(normalizeZipCode),
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres.')
    .max(255, 'Nome deve ter no máximo 255 caracteres.'),
  district: z
    .string()
    .trim()
    .min(2, 'Bairro deve ter pelo menos 2 caracteres.')
    .max(255, 'Bairro deve ter no máximo 255 caracteres.'),
  city: z
    .string()
    .trim()
    .min(2, 'Cidade deve ter pelo menos 2 caracteres.')
    .max(255, 'Cidade deve ter no máximo 255 caracteres.'),
  state: z
    .string()
    .trim()
    .length(2, 'Estado deve ter 2 caracteres.')
    .transform((value) => value.toUpperCase()),
  number: z
    .string()
    .trim()
    .min(1, 'Número deve ser informado.')
    .max(20, 'Número deve ter no máximo 20 caracteres.'),
  complement: nullableComplement,
  condominiumId: z.uuid('CondominiumId deve ser um UUID valido.'),
})

export type AddressFormInput = z.input<typeof addressFormSchema>
export type AddressFormData = z.output<typeof addressFormSchema>
