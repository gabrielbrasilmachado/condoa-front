import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  condominiumFormSchema,
  type CondominiumFormData,
} from '@/modules/condominiums/schemas/condominium-form.schema'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'
import { AppField } from '@/shared/components/AppField'

type CondominiumFormProps = {
  condominium?: Condominium | null
  isLoading?: boolean
  onCancel?: () => void
  onSubmit: (values: CondominiumFormData) => Promise<void>
}

export function CondominiumForm({
  condominium,
  isLoading,
  onCancel,
  onSubmit,
}: CondominiumFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CondominiumFormData>({
    resolver: zodResolver(condominiumFormSchema),
    defaultValues: {
      name: condominium?.name ?? '',
    },
  })

  useEffect(() => {
    reset({
      name: condominium?.name ?? '',
    })
  }, [condominium, reset])

  return (
    <Stack as='form' gap={5} onSubmit={handleSubmit(onSubmit)}>
      <AppField label='Nome' error={errors.name?.message} required>
        <Input placeholder='Ex.: Residencial Palmeiras' {...register('name')} />
      </AppField>

      <Stack direction={{ base: 'column', sm: 'row' }} gap={3}>
        <Button type='submit' loading={isLoading}>
          {condominium ? 'Salvar alterações' : 'Cadastrar condomínio'}
        </Button>
        {onCancel ? (
          <Button variant='outline' onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </Stack>
    </Stack>
  )
}
