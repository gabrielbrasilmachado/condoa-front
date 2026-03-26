import { Box, Text } from '@chakra-ui/react'

type EmptyStateProps = {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <Box
      p={8}
      borderRadius='xl'
      border='1px dashed'
      borderColor='whiteAlpha.500'
      bg='rgba(248,250,248,0.9)'
      boxShadow='sm'
    >
      <Text color='gray.700'>{message}</Text>
    </Box>
  )
}

