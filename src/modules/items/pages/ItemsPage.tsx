import {
  Badge,
  Box,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useItems } from '@/modules/items/hooks/useItems'
import { EmptyState } from '@/shared/components/EmptyState'
import { LoadingState } from '@/shared/components/LoadingState'
import { PageHeader } from '@/shared/components/PageHeader'

export function ItemsPage() {
  const { data, isLoading } = useItems()

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <>
      <PageHeader
        title="Itens"
        description="Modulo de itens compartilhado entre usuario comum e admin."
      />

      {!data?.length ? (
        <EmptyState message="Nenhum item cadastrado ate o momento." />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {data.map((item) => (
            <Box key={item.id} bg="white" borderRadius="2xl" p={6} boxShadow="sm">
              <Stack spacing={3}>
                <Text fontWeight="bold" fontSize="lg">
                  {item.name}
                </Text>
                <Text color="gray.600">{item.description}</Text>
                <Badge alignSelf="flex-start">{item.status}</Badge>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  )
}
