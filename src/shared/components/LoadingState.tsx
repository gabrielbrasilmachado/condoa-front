import { Center, Spinner } from '@chakra-ui/react'

export function LoadingState() {
  return (
    <Center minH="240px">
      <Spinner size="xl" color="brand.500" />
    </Center>
  )
}
