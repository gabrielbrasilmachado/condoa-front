import { Box, Heading, Stack, Text } from '@chakra-ui/react'

type LandingFeatureSectionProps = {
  title: string
  text: string
  imageSrc: string
  imageAlt: string
  accentColor: string
  imagePosition: 'left' | 'right'
  sectionId?: string
}

export function LandingFeatureSection({
  title,
  text,
  imageSrc,
  imageAlt,
  accentColor,
  imagePosition,
  sectionId,
}: LandingFeatureSectionProps) {
  const desktopImage = (
    <Box
      flex='1'
      minH={{ xl: '420px' }}
      bgImage={`url(${imageSrc})`}
      bgSize='cover'
      backgroundPosition='center'
      aria-label={imageAlt}
    />
  )

  const desktopContent = (
    <Stack
      flex='1'
      justify='center'
      gap={5}
      bg={accentColor}
      color='white'
      px={{ md: 10, xl: 12 }}
      py={{ md: 12, xl: 14 }}
    >
      <Heading fontSize={{ md: '3xl', xl: '4xl' }} lineHeight='1.1'>
        {title}
      </Heading>
      <Text fontSize={{ md: 'lg', xl: 'xl' }} color='whiteAlpha.900'>
        {text}
      </Text>
    </Stack>
  )

  return (
    <Box id={sectionId} px={{ base: 4, md: 6, xl: 10 }} scrollMarginTop='120px'>
      <Box maxW='1280px' mx='auto'>
        <Box
          display={{ base: 'block', md: 'none' }}
          minH='420px'
          borderRadius='3xl'
          overflow='hidden'
          position='relative'
          bgImage={`linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.68) 100%), url(${imageSrc})`}
          bgSize='cover'
          backgroundPosition='center'
        >
          <Stack justify='flex-end' h='full' px={6} py={8} color='white' gap={4}>
            <Text
              display='inline-flex'
              alignSelf='flex-start'
              px={3}
              py={1}
              borderRadius='full'
              bg='rgba(255,255,255,0.16)'
              fontSize='sm'
              fontWeight='semibold'
            >
              ConDoa
            </Text>
            <Heading fontSize='2xl' lineHeight='1.15'>
              {title}
            </Heading>
            <Text color='whiteAlpha.900'>{text}</Text>
          </Stack>
        </Box>

        <Box
          display={{ base: 'none', md: 'block' }}
          overflow='hidden'
          borderRadius='4xl'
          border='1px solid'
          borderColor='blackAlpha.100'
          boxShadow='sm'
        >
          <Stack direction={{ md: 'row' }} gap={0} minH='420px'>
            {imagePosition === 'left' ? desktopImage : desktopContent}
            {imagePosition === 'left' ? desktopContent : desktopImage}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
