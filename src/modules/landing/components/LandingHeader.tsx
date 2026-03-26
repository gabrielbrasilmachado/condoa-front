import { FiMenu } from 'react-icons/fi'
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import logoImage from '@/assets/brand/logo.png'

export function LandingHeader() {
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box h={{ base: '68px', md: '80px' }} />

      <Box position='fixed' top='0' left='0' right='0' zIndex='overlay'>
        <Box
          mx='auto'
          bg='linear-gradient(90deg, #132033 0%, #101923 100%)'
          color='white'
          px={{ base: 4, md: 6, xl: 8 }}
          py={{ base: 3, md: 4 }}
          boxShadow='0 20px 40px rgba(2,95,157,0.16)'
          border='1px solid'
          borderColor='whiteAlpha.100'
        >
          <HStack justify='space-between' align='center'>
            <RouterLink to='/' aria-label='Página inicial do ConDoa'>
              <Image
                src={logoImage}
                alt='Logo do ConDoa'
                h={{ base: '40px', md: '48px' }}
                w='auto'
                objectFit='contain'
              />
            </RouterLink>

            <HStack display={{ base: 'none', lg: 'flex' }} gap={{ lg: 3, xl: 4 }}>
              <Button asChild variant='ghost' color='white' borderRadius='full' _hover={{ bg: 'whiteAlpha.100' }}>
                <RouterLink to='/'>Home</RouterLink>
              </Button>
              <Button asChild variant='ghost' color='white' borderRadius='full' _hover={{ bg: 'whiteAlpha.100' }}>
                <RouterLink to='/about'>Sobre</RouterLink>
              </Button>
              <Button asChild bg='#1A833B' color='white' borderRadius='full' _hover={{ bg: '#166f32' }}>
                <RouterLink to='/login'>Entrar</RouterLink>
              </Button>
              <Button asChild bg='#025F9D' color='white' borderRadius='full' _hover={{ bg: '#024f84' }}>
                <RouterLink to='/register'>Criar conta</RouterLink>
              </Button>
            </HStack>

            <IconButton
              display={{ base: 'inline-flex', lg: 'none' }}
              aria-label='Abrir navegação'
              variant='ghost'
              color='white'
              onClick={onOpen}
            >
              <FiMenu />
            </IconButton>
          </HStack>
        </Box>

        <Drawer.Root
          open={open}
          placement='end'
          onOpenChange={(details) => {
            if (!details.open) {
              onClose()
            }
          }}
        >
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg='#101923' color='white'>
              <Drawer.CloseTrigger asChild>
                <CloseButton mt={2} ms='auto' me={2} />
              </Drawer.CloseTrigger>
              <Drawer.Header borderBottomWidth='1px' borderColor='whiteAlpha.200'>
                <Drawer.Title>Navegação</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body p={6}>
                <Stack gap={4}>
                  <Button asChild variant='ghost' justifyContent='flex-start' color='white' onClick={onClose}>
                    <RouterLink to='/'>Home</RouterLink>
                  </Button>
                  <Button asChild variant='ghost' justifyContent='flex-start' color='white' onClick={onClose}>
                    <RouterLink to='/about'>Sobre</RouterLink>
                  </Button>
                  <Button asChild bg='#1A833B' color='white' borderRadius='full' _hover={{ bg: '#166f32' }} onClick={onClose}>
                    <RouterLink to='/login'>Entrar</RouterLink>
                  </Button>
                  <Button asChild bg='#025F9D' color='white' borderRadius='full' _hover={{ bg: '#024f84' }} onClick={onClose}>
                    <RouterLink to='/register'>Criar conta</RouterLink>
                  </Button>
                </Stack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </Box>
    </>
  )
}
