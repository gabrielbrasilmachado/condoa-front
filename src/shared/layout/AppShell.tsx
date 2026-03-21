import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'

export function AppShell() {
  const { user, signOut } = useAuth()
  const links = [
    { to: '/', label: 'Dashboard', roles: ['admin', 'user'] },
    { to: '/items', label: 'Itens', roles: ['admin', 'user'] },
    { to: '/categories', label: 'Categorias', roles: ['admin'] },
    { to: '/users', label: 'Usuarios', roles: ['admin'] },
    { to: '/condominiums', label: 'Condominios', roles: ['admin'] },
    { to: '/addresses', label: 'Enderecos', roles: ['admin'] },
  ].filter((link) => (user ? link.roles.includes(user.role) : false))

  return (
    <Flex minH="100vh" bg="brand.50">
      <Box
        w={{ base: '100%', md: '280px' }}
        bg="brand.900"
        color="white"
        p={8}
        position={{ base: 'static', md: 'sticky' }}
        top="0"
        alignSelf="flex-start"
        minH={{ md: '100vh' }}
      >
        <Stack spacing={8}>
          <Box>
            <Text fontSize="sm" textTransform="uppercase" color="brand.200">
              Condoa
            </Text>
            <Heading size="lg" mt={2}>
              Painel
            </Heading>
          </Box>

          <VStack align="stretch" spacing={2}>
            {links.map((link) => (
              <Button
                as={NavLink}
                key={link.to}
                to={link.to}
                justifyContent="flex-start"
                variant="ghost"
                colorScheme="whiteAlpha"
              >
                {link.label}
              </Button>
            ))}
          </VStack>

          <Box pt={4} borderTop="1px solid" borderColor="whiteAlpha.300">
            <Text fontWeight="bold">{user?.name}</Text>
            <Text fontSize="sm" color="whiteAlpha.800">
              {user?.email}
            </Text>
            <Button mt={4} size="sm" onClick={signOut}>
              Sair
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box flex="1" p={{ base: 4, md: 10 }}>
        <Outlet />
      </Box>
    </Flex>
  )
}
