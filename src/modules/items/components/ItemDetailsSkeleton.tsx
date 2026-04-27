import { Box, HStack, Skeleton, Stack } from '@chakra-ui/react'

export function ItemDetailsSkeleton() {
  return (
    <Stack gap={6}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        align={{ base: 'flex-start', md: 'center' }}
        gap={4}
      >
        <Stack gap={2} w='full' maxW='420px'>
          <Skeleton h='32px' w='220px' />
          <Skeleton h='18px' w='100%' />
        </Stack>
        <Skeleton h='40px' w='88px' borderRadius='md' />
      </Stack>

      <Box
        bg='rgba(248,250,248,0.9)'
        borderRadius='xl'
        boxShadow='sm'
        p={{ base: 4, md: 6 }}
      >
        <Stack gap={5}>
          <Box
            bg='gray.50'
            borderRadius='xl'
            p={{ base: 3, md: 4 }}
            maxW={{ base: 'full', lg: '720px' }}
            mx='auto'
          >
            <Skeleton aspectRatio={{ base: 1, md: 1.15, lg: 1.2 }} w='full' borderRadius='xl' />
          </Box>

          <HStack justify='space-between' gap={3}>
            <Skeleton h='28px' w='96px' borderRadius='full' />
            <Skeleton h='28px' w='88px' borderRadius='full' />
          </HStack>

          <Stack gap={2}>
            <Skeleton h='18px' w='92px' />
            <Skeleton h='16px' w='100%' />
            <Skeleton h='16px' w='95%' />
            <Skeleton h='16px' w='72%' />
          </Stack>
        </Stack>
      </Box>

      <Box
        bg='rgba(248,250,248,0.9)'
        borderRadius='xl'
        boxShadow='sm'
        p={{ base: 4, md: 6 }}
      >
        <Stack gap={4}>
          <Skeleton h='24px' w='160px' />
          <HStack justify='space-between' align='flex-start' flexWrap='wrap' gap={4}>
            <Stack gap={3} flex='1' minW='260px'>
              <Skeleton h='16px' w='56px' />
              <Skeleton h='20px' w='180px' />
              <Skeleton h='16px' w='72px' mt={2} />
              <Skeleton h='20px' w='160px' />
            </Stack>
            <Skeleton h='36px' w='160px' borderRadius='full' />
          </HStack>
        </Stack>
      </Box>
    </Stack>
  )
}
