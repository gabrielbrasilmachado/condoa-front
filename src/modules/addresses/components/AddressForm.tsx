import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Spinner, Stack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { lookupZipCode } from '@/modules/addresses/services/address.service'
import {
  addressFormSchema,
  type AddressFormData,
  type AddressFormInput,
} from '@/modules/addresses/schemas/address-form.schema'
import type { Address } from '@/modules/addresses/types/address.types'
import { formatZipCode, normalizeZipCode } from '@/modules/addresses/utils/zip-code'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'
import { CondominiumSearchField } from '@/modules/users/components/CondominiumSearchField'
import { AppField } from '@/shared/components/AppField'
import { toaster } from '@/shared/components/ui/toaster'

type AddressFormProps = {
  address?: Address | null
  condominiums: Condominium[]
  isLoading?: boolean
  onCancel: () => void
  onSubmit: (values: AddressFormData) => Promise<void>
}

export function AddressForm({
  address,
  condominiums,
  isLoading,
  onCancel,
  onSubmit,
}: AddressFormProps) {
  const [isLookingUpZipCode, setIsLookingUpZipCode] = useState(false)
  const lastLookupZipCodeRef = useRef('')

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddressFormInput, unknown, AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      zipCode: address?.zipCode ?? '',
      name: address?.name ?? '',
      district: address?.district ?? '',
      city: address?.city ?? '',
      state: address?.state ?? '',
      number: address?.number ?? '',
      complement: address?.complement ?? '',
      condominiumId: address?.condominiumId ?? '',
    },
  })

  useEffect(() => {
    reset({
      zipCode: address?.zipCode ?? '',
      name: address?.name ?? '',
      district: address?.district ?? '',
      city: address?.city ?? '',
      state: address?.state ?? '',
      number: address?.number ?? '',
      complement: address?.complement ?? '',
      condominiumId: address?.condominiumId ?? '',
    })
    lastLookupZipCodeRef.current = normalizeZipCode(address?.zipCode ?? '')
  }, [address, reset])

  async function handleZipCodeLookup(zipCode: string) {
    const normalizedZipCode = normalizeZipCode(zipCode)

    if (normalizedZipCode.length !== 8) {
      lastLookupZipCodeRef.current = ''
      return
    }

    if (normalizedZipCode === lastLookupZipCodeRef.current) {
      return
    }

    try {
      setIsLookingUpZipCode(true)
      lastLookupZipCodeRef.current = normalizedZipCode
      const data = await lookupZipCode(normalizedZipCode)

      if (data.erro) {
        toaster.error({ title: 'CEP não encontrado.' })
        return
      }

      setValue('name', data.logradouro ?? '', { shouldValidate: true })
      setValue('district', data.bairro ?? '', { shouldValidate: true })
      setValue('city', data.localidade ?? '', { shouldValidate: true })
      setValue('state', data.uf ?? '', { shouldValidate: true })
    } catch {
      toaster.error({ title: 'Não foi possível consultar o CEP.' })
    } finally {
      setIsLookingUpZipCode(false)
    }
  }

  return (
    <Stack as='form' gap={5} onSubmit={handleSubmit(onSubmit)}>
      <AppField label='CEP' error={errors.zipCode?.message} required>
        <Controller
          control={control}
          name='zipCode'
          render={({ field }) => (
            <Input
              value={formatZipCode(field.value ?? '')}
              placeholder='99999-999'
              onChange={(event) => {
                const formattedValue = formatZipCode(event.target.value)
                field.onChange(formattedValue)
                void handleZipCodeLookup(formattedValue)
              }}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
      </AppField>

      <AppField label='Logradouro' error={errors.name?.message} required>
        <Controller
          control={control}
          name='name'
          render={({ field }) => <Input {...field} />}
        />
      </AppField>

      <AppField label='Bairro' error={errors.district?.message} required>
        <Controller
          control={control}
          name='district'
          render={({ field }) => <Input {...field} />}
        />
      </AppField>

      <AppField label='Cidade' error={errors.city?.message} required>
        <Controller
          control={control}
          name='city'
          render={({ field }) => <Input {...field} />}
        />
      </AppField>

      <AppField label='Estado' error={errors.state?.message} required>
        <Controller
          control={control}
          name='state'
          render={({ field }) => (
            <Input
              {...field}
              maxLength={2}
              onChange={(event) => {
                field.onChange(event.target.value.toUpperCase())
              }}
            />
          )}
        />
      </AppField>

      <AppField label='Número' error={errors.number?.message} required>
        <Controller
          control={control}
          name='number'
          render={({ field }) => <Input {...field} />}
        />
      </AppField>

      <AppField label='Complemento' error={errors.complement?.message}>
        <Controller
          control={control}
          name='complement'
          render={({ field }) => (
            <Input
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
      </AppField>

      <AppField label='Condomínio' error={errors.condominiumId?.message} required>
        <Controller
          control={control}
          name='condominiumId'
          render={({ field }) => (
            <CondominiumSearchField
              condominiums={condominiums}
              value={field.value}
              placeholder='Selecione o condomínio'
              onChange={(value) => field.onChange(value ?? '')}
            />
          )}
        />
      </AppField>

      {isLookingUpZipCode ? <Spinner size='sm' color='brand.500' /> : null}

      <Stack direction={{ base: 'column', sm: 'row' }} gap={3}>
        <Button type='submit' loading={isLoading}>
          {address ? 'Salvar alterações' : 'Cadastrar endereço'}
        </Button>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancelar
        </Button>
      </Stack>
    </Stack>
  )
}
