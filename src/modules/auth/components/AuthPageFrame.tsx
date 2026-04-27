import { Box, Heading, Image, Stack, Text, type ReactNode } from '@chakra-ui/react'
import logoImage from '@/assets/brand/logo.png'
import { LandingHeader } from '@/modules/landing/components/LandingHeader'

type AuthPageFrameProps = {
  title: string
  description: string
  children: ReactNode
}

export function AuthPageFrame({
  title,
  description,
  children,
}: AuthPageFrameProps) {
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
                  <Heading>{title}</Heading>
                  <Text mt={2} color='gray.600'>
                    {description}
                  </Text>
                </Box>
              </Stack>

              {children}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
