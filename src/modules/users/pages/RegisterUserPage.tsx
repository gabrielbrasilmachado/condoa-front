import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom'
import { AuthPageFrame } from '@/modules/auth/components/AuthPageFrame'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import {
  type RegisterUserFormData,
  registerUserSchema,
} from '@/modules/users/schemas/register-user.schema'
import { registerUser } from '@/modules/users/services/register-user.service'
import { AppField } from '@/shared/components/AppField'
import { toaster } from '@/shared/components/ui/toaster'
import { getErrorMessage } from '@/shared/lib/http/http-error'

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length === 0) {
    return ''
  }

  if (digits.length <= 2) {
    return `(${digits}`
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function RegisterUserPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isBootstrapping } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  async function onSubmit(values: RegisterUserFormData) {
    try {
      setServerError(null)
      await registerUser({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })
      toaster.success({
        title: 'Conta criada com sucesso.',
        description: 'Você já pode entrar com seu e-mail e senha.',
      })
      navigate('/login', { replace: true })
    } catch (error) {
      const message = getErrorMessage(error)
      setServerError(message)
      toaster.error({
        title: message,
      })
    }
  }

  if (isAuthenticated) {
    return <Navigate to='/app' replace />
  }

  return (
    <AuthPageFrame
      title='Criar conta'
      description='Preencha os dados obrigatórios para solicitar seu acesso.'
    >
      {isBootstrapping ? (
        <Stack align='center' textAlign='center' py={6} gap={3}>
          <Spinner size='lg' color='brand.500' />
          <Text color='gray.600'>Verificando sua sessão...</Text>
        </Stack>
      ) : (
        <>
          {serverError ? (
            <Box
              borderWidth='1px'
              borderColor='red.200'
              bg='red.50'
              color='red.700'
              borderRadius='xl'
              px={4}
              py={3}
            >
              {serverError}
            </Box>
          ) : null}

          <Stack as='form' gap={5} onSubmit={handleSubmit(onSubmit)}>
            <AppField label='Nome' error={errors.name?.message} required>
              <Input placeholder='Seu nome completo' {...register('name')} />
            </AppField>

            <AppField label='E-mail' error={errors.email?.message} required>
              <Input
                type='email'
                placeholder='usuario@condoa.local'
                autoComplete='email'
                {...register('email')}
              />
            </AppField>

            <AppField label='Telefone' error={errors.phone?.message} required>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <Input
                    type='tel'
                    placeholder='(11) 99999-9999'
                    autoComplete='tel'
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(formatPhone(event.target.value))
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
            </AppField>

            <AppField label='Senha' error={errors.password?.message} required>
              <Input
                type='password'
                placeholder='Mínimo de 8 caracteres'
                autoComplete='new-password'
                {...register('password')}
              />
            </AppField>

            <AppField
              label='Confirmar senha'
              error={errors.passwordConfirmation?.message}
              required
            >
              <Input
                type='password'
                placeholder='Repita a senha'
                autoComplete='new-password'
                {...register('passwordConfirmation')}
              />
            </AppField>

            <Button type='submit' size='lg' loading={isSubmitting}>
              Criar conta
            </Button>
          </Stack>

          <Text color='gray.600' fontSize='sm' textAlign='center'>
            Já tem uma conta?{' '}
            <Link asChild color='brand.600' fontWeight='semibold'>
              <RouterLink to='/login'>Entrar</RouterLink>
            </Link>
          </Text>
        </>
      )}
    </AuthPageFrame>
  )
}
