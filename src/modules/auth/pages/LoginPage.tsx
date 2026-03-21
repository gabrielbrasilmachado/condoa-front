import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import {
  type LoginFormData,
  loginSchema,
} from '@/modules/auth/schemas/loginSchema'
import { getErrorMessage } from '@/shared/lib/http/http-error'

export function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
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
      navigate('/', { replace: true })
    } catch (error) {
      setServerError(getErrorMessage(error))
    }
  }

  return (
    <Box minH="100vh" display="grid" placeItems="center" px={4}>
      <Box
        w="full"
        maxW="460px"
        bg="whiteAlpha.900"
        backdropFilter="blur(16px)"
        p={{ base: 6, md: 10 }}
        borderRadius="3xl"
        boxShadow="xl"
      >
        <Stack spacing={6}>
          <Box>
            <Text textTransform="uppercase" color="brand.500" fontWeight="bold">
              Condoa
            </Text>
            <Heading mt={2}>Entrar no painel</Heading>
            <Text mt={2} color="gray.600">
              Acesse com as credenciais fornecidas pela administracao.
            </Text>
          </Box>

          {serverError ? (
            <Alert status="error" borderRadius="xl">
              <AlertIcon />
              {serverError}
            </Alert>
          ) : null}

          <Stack as="form" spacing={5} onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel>E-mail</FormLabel>
              <Input type="email" placeholder="voce@condoa.com" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="******" {...register('password')} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" size="lg" isLoading={isSubmitting}>
              Entrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
