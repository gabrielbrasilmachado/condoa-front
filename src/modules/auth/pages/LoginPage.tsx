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
import { useForm } from 'react-hook-form'
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom'
import logoImage from '@/assets/brand/logo.png'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import {
  type LoginFormData,
  loginSchema,
} from '@/modules/auth/schemas/loginSchema'
import { LandingHeader } from '@/modules/landing/components/LandingHeader'
import { AppField } from '@/shared/components/AppField'
import { LoadingState } from '@/shared/components/LoadingState'
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
                  <Heading>Entrar no painel</Heading>
                  <Text mt={2} color='gray.600'>
                    Informe e-mail e senha para iniciar sua sessão.
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
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
