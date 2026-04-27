import { Box, HStack, Skeleton, Stack, Text } from '@chakra-ui/react'
import { ItemCardSkeleton } from '@/modules/items/components/ItemCardSkeleton'
import { ResponsiveCardGrid } from '@/shared/components/ResponsiveCardGrid'

type ItemGridSkeletonProps = {
  count?: number
  label?: string
}

export function ItemGridSkeleton({
  count = 6,
  label = 'Carregando itens...',
}: ItemGridSkeletonProps) {
  return (
    <Stack gap={4}>
      <HStack justify='space-between' align='center' flexWrap='wrap'>
        <Text color='whiteAlpha.900' fontSize='sm' fontWeight='medium'>
          {label}
        </Text>
        <Skeleton h='16px' w='120px' />
      </HStack>

      <ResponsiveCardGrid>
        {Array.from({ length: count }).map((_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </ResponsiveCardGrid>

      <Box
        bg='rgba(248,250,248,0.9)'
        borderRadius='xl'
        boxShadow='sm'
        p={{ base: 4, md: 5 }}
      >
        <HStack justify='space-between' gap={3} flexWrap='wrap'>
          <Skeleton h='36px' w='88px' borderRadius='md' />
          <HStack gap={2}>
            <Skeleton h='36px' w='36px' borderRadius='md' />
            <Skeleton h='36px' w='36px' borderRadius='md' />
            <Skeleton h='36px' w='36px' borderRadius='md' />
          </HStack>
          <Skeleton h='36px' w='136px' borderRadius='md' />
        </HStack>
      </Box>
    </Stack>
  )
}
