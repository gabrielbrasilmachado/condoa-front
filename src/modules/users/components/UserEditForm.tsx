import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Stack } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'
import { CondominiumSearchField } from '@/modules/users/components/CondominiumSearchField'
import {
  adminUserEditSchema,
  type AdminUserEditFormData,
} from '@/modules/users/schemas/admin-user-edit.schema'
import type { AdminUser } from '@/modules/users/types/user-admin.types'
import { userRoleLabelMap } from '@/modules/users/types/user-labels'
import { formatPhone } from '@/modules/users/utils/format-phone'
import { AppField } from '@/shared/components/AppField'
import { AppSelect } from '@/shared/components/AppSelect'

type UserEditFormProps = {
  condominiums: Condominium[]
  isLoading?: boolean
  user: AdminUser | null
  onCancel: () => void
  onSubmit: (values: AdminUserEditFormData) => Promise<void>
}

export function UserEditForm({
  condominiums,
  isLoading,
  user,
  onCancel,
  onSubmit,
}: UserEditFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminUserEditFormData>({
    resolver: zodResolver(adminUserEditSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      role: user?.role ?? 'user',
      condominiumId: user?.condominium?.id ?? null,
    },
  })

  useEffect(() => {
    reset({
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      role: user?.role ?? 'user',
      condominiumId: user?.condominium?.id ?? null,
    })
  }, [user, reset])

  return (
    <Stack as='form' gap={5} onSubmit={handleSubmit(onSubmit)}>
      <AppField label='Nome' error={errors.name?.message} required>
        <Input {...register('name')} />
      </AppField>

      <AppField label='E-mail' error={errors.email?.message} required>
        <Input type='email' {...register('email')} />
      </AppField>

      <AppField label='Telefone' error={errors.phone?.message} required>
        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <Input
              type='tel'
              value={field.value}
              placeholder='(11) 99999-9999'
              onChange={(event) => {
                field.onChange(formatPhone(event.target.value))
              }}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
      </AppField>

      <AppField label='Perfil' error={errors.role?.message} required>
        <Controller
          control={control}
          name='role'
          render={({ field }) => (
            <AppSelect
              options={[
                { value: 'user', label: userRoleLabelMap.user },
                { value: 'admin', label: userRoleLabelMap.admin },
              ]}
              value={field.value}
              onChange={(value) => field.onChange(value || 'user')}
            />
          )}
        />
      </AppField>

      <AppField label='Condomínio' error={errors.condominiumId?.message}>
        <Controller
          control={control}
          name='condominiumId'
          render={({ field }) => (
            <CondominiumSearchField
              condominiums={condominiums}
              value={field.value ?? undefined}
              placeholder='Selecione o condomínio'
              emptyLabel='Não atribuído'
              onChange={(value) => field.onChange(value ?? null)}
            />
          )}
        />
      </AppField>

      <Stack direction={{ base: 'column', sm: 'row' }} gap={3}>
        <Button type='submit' loading={isLoading}>
          Salvar alterações
        </Button>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancelar
        </Button>
      </Stack>
    </Stack>
  )
}
