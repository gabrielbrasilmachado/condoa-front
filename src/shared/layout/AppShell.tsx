import { FiMenu } from 'react-icons/fi'
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import logoImage from '@/assets/brand/logo.png'
import { useAuth } from '@/modules/auth/hooks/useAuth'

type NavigationLink = {
  to: string
  label: string
  roles: Array<'admin' | 'user'>
  children?: NavigationLink[]
}

const navigationLinks: NavigationLink[] = [
  { to: '/app', label: 'Dashboard', roles: ['admin', 'user'] },
  { to: '/app/users', label: 'Usuários', roles: ['admin'] },
  { to: '/app/categories', label: 'Categorias', roles: ['admin'] },
  { to: '/app/condominiums', label: 'Condomínios', roles: ['admin', 'user'] },
  { to: '/app/addresses', label: 'Endereços', roles: ['admin'] },
  {
    to: '/app/items',
    label: 'Itens',
    roles: ['admin', 'user'],
    children: [
      { to: '/app/items/mine', label: 'Meus itens', roles: ['admin', 'user'] },
      { to: '/app/items/search', label: 'Buscar itens', roles: ['admin', 'user'] },
    ],
  },
]

type NavigationProps = {
  links: NavigationLink[]
  footer: ReactNode
  onNavigate?: () => void
}

function Navigation({ links, footer, onNavigate }: NavigationProps) {
  const location = useLocation()

  return (
    <Stack h='full' gap={8}>
      <Box>
        <Image src={logoImage} alt='ConDoa' h='52px' w='auto' objectFit='contain' />
        <Heading size='lg' mt={4}>
          Painel
        </Heading>
      </Box>

      <VStack align='stretch' gap={2} flex='1'>
        {links.map((link) => {
          const isActive =
            link.to === '/app'
              ? location.pathname === '/app'
              : location.pathname.startsWith(link.to)

          if (link.children?.length) {
            const childLinks = link.children.filter((child) =>
              child.roles.some((role) => role === 'admin' || role === 'user'),
            )

            return (
              <Box key={link.to}>
                <Text
                  px={3}
                  py={2}
                  fontSize='sm'
                  textTransform='uppercase'
                  color={isActive ? 'white' : 'whiteAlpha.700'}
                  fontWeight='semibold'
                >
                  {link.label}
                </Text>
                <VStack align='stretch' gap={1} ps={3}>
                  {childLinks.map((child) => {
                    const isChildActive = location.pathname.startsWith(child.to)

                    return (
                      <Button
                        asChild
                        key={child.to}
                        justifyContent='flex-start'
                        size='sm'
                        variant={isChildActive ? 'solid' : 'ghost'}
                        bg={isChildActive ? 'whiteAlpha.300' : 'transparent'}
                        color='white'
                        _hover={{ bg: 'whiteAlpha.200' }}
                      >
                        <NavLink to={child.to} onClick={onNavigate}>
                          {child.label}
                        </NavLink>
                      </Button>
                    )
                  })}
                </VStack>
              </Box>
            )
          }

          return (
            <Button
              asChild
              key={link.to}
              justifyContent='flex-start'
              variant={isActive ? 'solid' : 'ghost'}
              bg={isActive ? 'whiteAlpha.300' : 'transparent'}
              color='white'
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              <NavLink to={link.to} onClick={onNavigate}>
                {link.label}
              </NavLink>
            </Button>
          )
        })}
      </VStack>

      {footer}
    </Stack>
  )
}

export function AppShell() {
  const { user, signOut } = useAuth()
  const { open, onOpen, onClose } = useDisclosure()

  const links = navigationLinks
    .filter((link) => (user ? link.roles.includes(user.role) : false))
    .map((link) => ({
      ...link,
      children: link.children?.filter((child) =>
        user ? child.roles.includes(user.role) : false,
      ),
    }))

  const footer = (
    <Box pt={4} borderTop='1px solid' borderColor='whiteAlpha.300'>
      <Text fontWeight='bold'>{user?.name}</Text>
      <Text fontSize='sm' color='whiteAlpha.800'>
        {user?.email}
      </Text>
      <HStack mt={4} gap={3} align='stretch' flexWrap='wrap'>
        <Button asChild size='sm' variant='outline'>
          <NavLink to='/app/profile' onClick={onClose}>
            Perfil
          </NavLink>
        </Button>
        <Button
          size='sm'
          onClick={() => {
            void signOut()
          }}
        >
          Sair
        </Button>
      </HStack>
    </Box>
  )

  return (
    <Box
      minH='100vh'
      bg='linear-gradient(180deg, #1A833B 0%, #146A30 100%)'
      position='relative'
    >
      <Box
        position='absolute'
        inset='0'
        bg='radial-gradient(circle at top, rgba(255,255,255,0.16), transparent 30%), radial-gradient(circle at bottom, rgba(2,95,157,0.18), transparent 28%)'
        pointerEvents='none'
      />

      <Flex minH='100vh' position='relative' align='stretch'>
        <Box
          display={{ base: 'none', lg: 'block' }}
          w='280px'
          bg='brand.900'
          color='white'
          borderRight='1px solid'
          borderColor='whiteAlpha.100'
          flexShrink={0}
        >
          <Box position='sticky' top='0' minH='100vh' p={8}>
            <Navigation links={links} footer={footer} />
          </Box>
        </Box>

        <Drawer.Root
          open={open}
          placement='start'
          onOpenChange={(details) => {
            if (!details.open) {
              onClose()
            }
          }}
        >
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg='brand.900' color='white'>
              <Drawer.CloseTrigger asChild>
                <CloseButton mt={2} ms='auto' me={2} />
              </Drawer.CloseTrigger>
              <Drawer.Header borderBottomWidth='1px' borderColor='whiteAlpha.300'>
                <Drawer.Title>Navegação</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body p={6}>
                <Navigation links={links} footer={footer} onNavigate={onClose} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>

        <Box flex='1' minW='0'>
          <Flex
            display={{ base: 'flex', lg: 'none' }}
            align='center'
            justify='space-between'
            px={4}
            py={4}
            position='fixed'
            top='0'
            left='0'
            right='0'
            zIndex='banner'
            bg='rgba(16, 25, 35, 0.86)'
            backdropFilter='blur(14px)'
            borderBottom='1px solid'
            borderColor='whiteAlpha.100'
          >
            <HStack gap={3} minW='0'>
              <Image src={logoImage} alt='ConDoa' h='40px' w='auto' objectFit='contain' />
              <Heading size='md' color='white'>Painel</Heading>
            </HStack>

            <IconButton aria-label='Abrir menu' onClick={onOpen}>
              <FiMenu />
            </IconButton>
          </Flex>

          <Box
            pt={{ base: '92px', md: '100px', lg: 10 }}
            px={{ base: 4, md: 6, xl: 10 }}
            pb={{ base: 4, md: 6, xl: 10 }}
          >
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

