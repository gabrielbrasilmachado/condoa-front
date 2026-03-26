import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom'
import logoImage from '@/assets/brand/logo.png'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { LandingHeader } from '@/modules/landing/components/LandingHeader'
import {
  type RegisterUserFormData,
  registerUserSchema,
} from '@/modules/users/schemas/register-user.schema'
import { registerUser } from '@/modules/users/services/register-user.service'
import { AppField } from '@/shared/components/AppField'
import { LoadingState } from '@/shared/components/LoadingState'
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

  if (isBootstrapping) {
    return <LoadingState />
  }

  if (isAuthenticated) {
    return <Navigate to='/app' replace />
  }

  return (
    <Box
      minH='100vh'
      bg='linear-gradient(180deg, #1A833B 0%, #146A30 100%)'
      position='relative'
      overflow='hidden'
    >
      <Box
        position='absolute'
        inset='0'
        bg='radial-gradient(circle at top, rgba(255,255,255,0.16), transparent 30%), radial-gradient(circle at bottom, rgba(2,95,157,0.18), transparent 28%)'
      />

      <Box position='relative'>
        <LandingHeader />

        <Box minH='calc(100vh - 88px)' display='grid' placeItems='center' px={4} py={{ base: 8, md: 10 }}>
          <Box
            position='relative'
            w='full'
            maxW='460px'
            bg='rgba(255,255,255,0.94)'
            backdropFilter='blur(18px)'
            p={{ base: 6, md: 10 }}
            borderRadius='3xl'
            border='1px solid'
            borderColor='whiteAlpha.700'
            boxShadow='0 28px 60px rgba(0,0,0,0.22)'
          >
            <Stack gap={6}>
              <Stack align='center' textAlign='center' gap={4}>
                <Image
                  src={logoImage}
                  alt='Logo do ConDoa'
                  w='full'
                  maxW='220px'
                  h='auto'
                  objectFit='contain'
                />
                <Box>
                  <Heading>Criar conta</Heading>
                  <Text mt={2} color='gray.600'>
                    Preencha os dados obrigatórios para solicitar seu acesso.
                  </Text>
                </Box>
              </Stack>

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
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
