import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Stack } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { useUpdateOwnProfile } from '@/modules/profile/hooks/useUpdateOwnProfile'
import {
  profileFormSchema,
  type ProfileFormData,
} from '@/modules/profile/schemas/profile-form.schema'
import { formatPhone } from '@/modules/users/utils/format-phone'
import { AppField } from '@/shared/components/AppField'
import { FormSection } from '@/shared/components/FormSection'
import { PageHeader } from '@/shared/components/PageHeader'
import { ResponsiveFormGrid } from '@/shared/components/ResponsiveFormGrid'
import { toaster } from '@/shared/components/ui/toaster'
import { getErrorMessage } from '@/shared/lib/http/http-error'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, updateCurrentUser } = useAuth()
  const updateProfileMutation = useUpdateOwnProfile()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
  })

  useEffect(() => {
    reset({
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    })
  }, [reset, user])

  async function onSubmit(values: ProfileFormData) {
    if (!user) {
      return
    }

    try {
      const updatedUser = await updateProfileMutation.mutateAsync({
        userId: user.id,
        payload: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          currentPassword: values.currentPassword || undefined,
          newPassword: values.newPassword || undefined,
        },
      })

      updateCurrentUser(updatedUser)
      reset({
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      })
      toaster.success({ title: 'Perfil atualizado com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  return (
    <>
      <PageHeader
        title='Perfil'
        description='Atualize seus dados pessoais e, se quiser, altere sua senha.'
        action={
          <Button variant='outline' onClick={() => navigate(-1)}>
            Voltar
          </Button>
        }
      />

      <FormSection
        title='Seus dados'
        description='Nome, e-mail e telefone ficam sempre disponíveis para atualização.'
      >
        <Stack as='form' gap={6} onSubmit={handleSubmit(onSubmit)}>
          <ResponsiveFormGrid>
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
          </ResponsiveFormGrid>

          <FormSection
            title='Senha'
            description='Preencha os três campos apenas se quiser trocar sua senha atual.'
            p={0}
            bg='transparent'
            boxShadow='none'
          >
            <ResponsiveFormGrid>
              <AppField
                label='Senha atual'
                error={errors.currentPassword?.message}
              >
                <Input type='password' {...register('currentPassword')} />
              </AppField>

              <AppField label='Nova senha' error={errors.newPassword?.message}>
                <Input type='password' {...register('newPassword')} />
              </AppField>

              <AppField
                label='Confirmar nova senha'
                error={errors.newPasswordConfirmation?.message}
              >
                <Input type='password' {...register('newPasswordConfirmation')} />
              </AppField>
            </ResponsiveFormGrid>
          </FormSection>

          <Button type='submit' alignSelf='flex-start' loading={updateProfileMutation.isPending}>
            Salvar perfil
          </Button>
        </Stack>
      </FormSection>
    </>
  )
}
