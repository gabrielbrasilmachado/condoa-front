import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import heartImage from '@/assets/landing/imagem-coração.jpg'
import handsImage from '@/assets/landing/imagem-mãos.avif'
import clothesImage from '@/assets/landing/imagem-roupas.jpg'
import { LandingCoverImage } from '@/modules/landing/components/LandingCoverImage'
import { LandingFeatureSection } from '@/modules/landing/components/LandingFeatureSection'
import { LandingHeader } from '@/modules/landing/components/LandingHeader'

export function LandingPage() {
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

        <Stack gap={{ base: 6, md: 10, xl: 14 }} pb={{ base: 10, md: 16, xl: 20 }} pt={{ base: 6, md: 8, xl: 10 }}>
          <Box px={{ base: 4, md: 6, xl: 10 }}>
            <Box
              maxW='1280px'
              mx='auto'
              bg='linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(244,247,245,0.82) 100%)'
              borderRadius={{ base: '3xl', xl: '4xl' }}
              overflow='hidden'
              border='1px solid'
              borderColor='whiteAlpha.600'
              boxShadow='0 28px 60px rgba(0,0,0,0.14)'
            >
              <Stack gap={0} direction={{ base: 'column', xl: 'row' }}>
                <Stack
                  flex='1.1'
                  gap={6}
                  justify='center'
                  px={{ base: 6, md: 10, xl: 14 }}
                  py={{ base: 10, md: 14, xl: 20 }}
                >
                  <Stack gap={4} maxW='640px'>
                    <Heading
                      fontSize={{ base: '3xl', md: '5xl', xl: '6xl' }}
                      lineHeight={{ base: '1.1', md: '1.05' }}
                      color='gray.900'
                    >
                      Compartilhe mais. Desperdice menos.
                    </Heading>
                    <Text fontSize={{ base: 'md', md: 'lg', xl: 'xl' }} color='gray.700'>
                      O ConDoa conecta moradores para transformar itens sem uso em novas oportunidades de cuidado,
                      colaboração e impacto positivo dentro do condomínio.
                    </Text>
                  </Stack>

                  <Stack direction={{ base: 'column', sm: 'row' }} gap={3} align='flex-start'>
                    <Button asChild bg='#1A833B' color='white' size='lg' borderRadius='full' _hover={{ bg: '#166f32' }}>
                      <RouterLink to='/login'>Entrar no painel</RouterLink>
                    </Button>
                    <Button asChild bg='#025F9D' color='white' size='lg' borderRadius='full' _hover={{ bg: '#024f84' }}>
                      <RouterLink to='/register'>Criar conta</RouterLink>
                    </Button>
                  </Stack>
                </Stack>

                <Box flex='0.9' minH={{ base: '280px', md: '360px', xl: 'auto' }}>
                  <LandingCoverImage
                    src={heartImage}
                    alt='Coração representando solidariedade'
                    loading='eager'
                    overlay='linear-gradient(180deg, rgba(2,95,157,0.12), rgba(26,131,59,0.16))'
                  />
                </Box>
              </Stack>
            </Box>
          </Box>

          <LandingFeatureSection
            title='Dê uma nova utilidade ao que você não usa mais'
            text='O ConDoa permite que moradores disponibilizem roupas, calçados, brinquedos, móveis e outros itens em bom estado para doação dentro do próprio condomínio, reduzindo o desperdício e incentivando o consumo consciente.'
            imageSrc={clothesImage}
            imageAlt='Roupas dobradas'
            accentColor='#1A833B'
            imagePosition='left'
          />

          <LandingFeatureSection
            sectionId='sobre'
            title='Vizinhos que ajudam vizinhos'
            text='Mais do que uma plataforma de doação, o ConDoa busca fortalecer os laços entre moradores, facilitando o compartilhamento de itens e promovendo uma cultura de colaboração, solidariedade e impacto positivo na comunidade.'
            imageSrc={handsImage}
            imageAlt='Mãos se encontrando em gesto de ajuda'
            accentColor='#025F9D'
            imagePosition='right'
          />

          <Box px={{ base: 4, md: 6, xl: 10 }}>
            <Box
              maxW='1280px'
              mx='auto'
              bg='rgba(255,255,255,0.92)'
              borderRadius={{ base: '3xl', xl: '4xl' }}
              px={{ base: 6, md: 10, xl: 14 }}
              py={{ base: 10, md: 14, xl: 16 }}
              border='1px solid'
              borderColor='whiteAlpha.600'
              boxShadow='0 28px 60px rgba(0,0,0,0.14)'
            >
              <Stack gap={5} textAlign='center' maxW='820px' mx='auto' align='center'>
                <Heading fontSize={{ base: '2xl', md: '4xl' }} color='gray.900'>
                  Pequenas doações podem gerar grandes transformações
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  Com o ConDoa, itens sem uso ganham um novo destino, o desperdício diminui e a convivência no condomínio se torna mais colaborativa.
                </Text>
                <Button asChild bg='#025F9D' color='white' size='lg' borderRadius='full' _hover={{ bg: '#024f84' }}>
                  <RouterLink to='/about'>Saiba mais</RouterLink>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
