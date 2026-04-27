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
import { useForm } from 'react-hook-form'
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom'
import { AuthPageFrame } from '@/modules/auth/components/AuthPageFrame'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import {
  type LoginFormData,
  loginSchema,
} from '@/modules/auth/schemas/loginSchema'
import { AppField } from '@/shared/components/AppField'
import { getErrorMessage } from '@/shared/lib/http/http-error'

export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isBootstrapping, signIn } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: LoginFormData) {
    try {
      setServerError(null)
      await signIn(values)
      navigate('/app', { replace: true })
    } catch (error) {
      setServerError(getErrorMessage(error))
    }
  }

  if (isAuthenticated) {
    return <Navigate to='/app' replace />
  }

  return (
    <AuthPageFrame
      title='Entrar no painel'
      description='Informe e-mail e senha para iniciar sua sessão.'
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
            <AppField label='E-mail' error={errors.email?.message} required>
              <Input
                type='email'
                placeholder='usuario@condoa.local'
                autoComplete='email'
                {...register('email')}
              />
            </AppField>

            <AppField label='Senha' error={errors.password?.message} required>
              <Input
                type='password'
                placeholder='Digite sua senha'
                autoComplete='current-password'
                {...register('password')}
              />
            </AppField>

            <Button type='submit' size='lg' loading={isSubmitting}>
              Entrar
            </Button>
          </Stack>

          <Text color='gray.600' fontSize='sm' textAlign='center'>
            Ainda não tem uma conta?{' '}
            <Link asChild color='brand.600' fontWeight='semibold'>
              <RouterLink to='/register'>crie sua conta</RouterLink>
            </Link>
          </Text>
        </>
      )}
    </AuthPageFrame>
  )
}
