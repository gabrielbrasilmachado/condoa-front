import { LuHandshake, LuPackage, LuRecycle, LuUsers } from 'react-icons/lu'
import {
  Box,
  Container,
  GridItem,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { LandingHeader } from '@/modules/landing/components/LandingHeader'

const steps = [
  {
    icon: LuUsers,
    title: 'Cadastro de moradores',
    description:
      'Os moradores realizam seu cadastro na plataforma, vinculando seu perfil ao condomínio em que residem. Dessa forma, o sistema garante que as interações e visualizações de itens aconteçam dentro da própria comunidade.',
    color: '#1A833B',
  },
  {
    icon: LuPackage,
    title: 'Cadastro de itens para doação',
    description:
      'Após o cadastro, os moradores podem anunciar itens que desejam doar, informando detalhes como nome, descrição, categoria e adicionando imagens do item. Assim, outros moradores conseguem visualizar facilmente o que está disponível para doação.',
    color: '#025F9D',
  },
  {
    icon: LuHandshake,
    title: 'Solicitação de doação',
    description:
      'Quando um item desperta interesse, outro morador pode solicitar a doação por meio de um link de contato direto via WhatsApp, disponível dentro da própria plataforma. Dessa forma, o contato entre as partes se torna simples e rápido, facilitando a combinação para retirada do item.',
    color: '#1A833B',
  },
  {
    icon: LuRecycle,
    title: 'Destinação para instituição de caridade',
    description:
      'Caso um item não seja solicitado dentro do prazo definido, ele poderá ser recolhido por um responsável e direcionado a uma instituição de caridade parceira. Dessa forma, o projeto amplia seu impacto social e reduz ainda mais o descarte desnecessário.',
    color: '#025F9D',
  },
] as const

export function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

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

        <Container maxW='1280px' px={{ base: 4, md: 6, xl: 10 }} py={{ base: 8, md: 10, xl: 14 }}>
          <Stack gap={{ base: 6, md: 8, xl: 10 }}>
            <Box
              id='about-hero'
              scrollMarginTop='120px'
              bg='rgba(255,255,255,0.92)'
              borderRadius={{ base: '3xl', xl: '4xl' }}
              border='1px solid'
              borderColor='whiteAlpha.600'
              boxShadow='0 28px 60px rgba(0,0,0,0.14)'
              px={{ base: 6, md: 10, xl: 14 }}
              py={{ base: 8, md: 10, xl: 14 }}
            >
              <Stack gap={5}>
                <Heading fontSize={{ base: '3xl', md: '5xl' }} color='gray.900'>
                  Sobre o ConDoa
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  O ConDoa é uma plataforma criada para incentivar a doação de itens em bom estado dentro de condomínios residenciais, promovendo o reaproveitamento, a redução de desperdícios e a colaboração entre moradores.
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  A proposta do projeto é facilitar a conexão entre pessoas que desejam doar e pessoas que podem se beneficiar desses itens, tornando a doação mais simples, acessível e organizada dentro da própria comunidade.
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  Por meio da tecnologia, o ConDoa busca estimular práticas mais sustentáveis e fortalecer a cultura de solidariedade entre vizinhos, transformando itens que não são mais utilizados em oportunidades de ajudar outras pessoas.
                </Text>
                <Box borderTop='1px solid' borderColor='blackAlpha.200' pt={1} />
              </Stack>
            </Box>

            <Box
              bg='rgba(255,255,255,0.92)'
              borderRadius='3xl'
              borderLeft='6px solid'
              borderLeftColor='#1A833B'
              boxShadow='0 20px 40px rgba(0,0,0,0.12)'
              px={{ base: 6, md: 8, xl: 10 }}
              py={{ base: 8, md: 9, xl: 10 }}
            >
              <Stack gap={4}>
                <Heading fontSize={{ base: '2xl', md: '3xl' }} color='gray.900'>
                  Como surgiu a ideia
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  O ConDoa nasceu a partir da proposta de um projeto de extensão acadêmico, desenvolvido com o objetivo de unir tecnologia, impacto social e sustentabilidade em uma solução aplicável ao cotidiano.
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  A ideia surgiu da observação de que muitos itens em bom estado, como roupas, calçados, brinquedos, móveis e utensílios, acabam sendo descartados por falta de um meio prático de doação dentro do condomínio. Ao mesmo tempo, percebeu-se que a tecnologia poderia ser utilizada para aproximar moradores e criar uma cultura mais forte de reaproveitamento e solidariedade.
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  Dessa forma, o projeto foi idealizado como uma plataforma digital capaz de estimular a economia circular, fortalecer os laços comunitários e ampliar o impacto social das doações.
                </Text>
              </Stack>
            </Box>

            <Box
              bg='rgba(255,255,255,0.92)'
              borderRadius='3xl'
              border='1px solid'
              borderColor='whiteAlpha.600'
              boxShadow='0 28px 60px rgba(0,0,0,0.14)'
              px={{ base: 6, md: 10, xl: 14 }}
              py={{ base: 8, md: 10, xl: 12 }}
            >
              <Stack gap={6}>
                <Stack gap={3}>
                  <Heading fontSize={{ base: '2xl', md: '3xl' }} color='gray.900'>
                    Como o ConDoa funciona
                  </Heading>
                  <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                    O funcionamento do ConDoa foi pensado para ser simples, intuitivo e acessível para os moradores, organizando o processo de doação em etapas claras.
                  </Text>
                </Stack>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={5}>
                  {steps.map((step) => (
                    <GridItem key={step.title}>
                      <Stack
                        h='full'
                        gap={4}
                        bg='white'
                        borderRadius='lg'
                        boxShadow='md'
                        p={6}
                        border='1px solid'
                        borderColor='blackAlpha.100'
                      >
                        <Box
                          boxSize='56px'
                          borderRadius='2xl'
                          bg={`${step.color}14`}
                          display='grid'
                          placeItems='center'
                        >
                          <Icon as={step.icon} boxSize={7} color={step.color} />
                        </Box>
                        <Heading fontSize='xl' color='gray.900'>
                          {step.title}
                        </Heading>
                        <Text color='gray.700'>
                          {step.description}
                        </Text>
                      </Stack>
                    </GridItem>
                  ))}
                </SimpleGrid>
              </Stack>
            </Box>

            <Box
              bg='rgba(255,255,255,0.92)'
              borderRadius='3xl'
              border='1px solid'
              borderColor='whiteAlpha.600'
              boxShadow='0 28px 60px rgba(0,0,0,0.14)'
              px={{ base: 6, md: 10, xl: 14 }}
              py={{ base: 8, md: 10, xl: 12 }}
            >
              <Stack gap={4} textAlign='center' maxW='860px' mx='auto'>
                <Heading fontSize={{ base: '2xl', md: '4xl' }} color='gray.900'>
                  Tecnologia a serviço da comunidade
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  Mais do que uma plataforma digital, o ConDoa busca incentivar uma nova forma de convivência dentro dos condomínios, baseada em colaboração, consciência ambiental e responsabilidade social.
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.700'>
                  Ao conectar moradores por meio da doação, o projeto transforma pequenos gestos em benefícios reais para a comunidade e para a sociedade, mostrando que a tecnologia também pode ser uma ferramenta para promover solidariedade e sustentabilidade.
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
