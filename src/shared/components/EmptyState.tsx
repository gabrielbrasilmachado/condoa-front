import { Box, Text } from '@chakra-ui/react'

type EmptyStateProps = {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <Box
      p={8}
      borderRadius="2xl"
      border="1px dashed"
      borderColor="gray.300"
      bg="white"
    >
      <Text color="gray.600">{message}</Text>
    </Box>
  )
}
