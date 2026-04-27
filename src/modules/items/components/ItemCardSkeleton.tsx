import { Box, HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'

export function ItemCardSkeleton() {
  return (
    <Box
      bg='rgba(248,250,248,0.9)'
      borderRadius='xl'
      boxShadow='sm'
      border='1px solid'
      borderColor='whiteAlpha.500'
      p={3}
      mx='auto'
      w='full'
    >
      <Box
        bg='rgba(255,255,255,0.42)'
        borderRadius='lg'
        p={3}
        position='relative'
        border='1px solid'
        borderColor='whiteAlpha.400'
      >
        <Skeleton borderRadius='lg' aspectRatio={1.2} w='full' />

        <HStack justify='center' gap={2} mt={3} minH='8px'>
          <SkeletonCircle size='2' />
          <SkeletonCircle size='2' />
          <SkeletonCircle size='2' />
        </HStack>
      </Box>

      <Stack gap={3} pt={3} px={1}>
        <HStack justify='space-between' w='full'>
          <Skeleton h='28px' w='96px' borderRadius='md' />
          <Skeleton h='28px' w='88px' borderRadius='md' />
        </HStack>

        <Stack gap={2}>
          <Skeleton h='20px' w='85%' />
          <Skeleton h='20px' w='55%' />
          <Skeleton h='16px' w='60%' />
        </Stack>

        <Skeleton h='32px' w='full' borderRadius='full' />
      </Stack>
    </Box>
  )
}
