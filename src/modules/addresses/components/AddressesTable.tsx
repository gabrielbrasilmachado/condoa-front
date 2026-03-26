import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { Badge, Box, HStack, IconButton, Table, Text } from '@chakra-ui/react'
import type { Address } from '@/modules/addresses/types/address.types'

type AddressesTableProps = {
  addresses: Address[]
  deletingAddressId?: string | null
  onEdit: (address: Address) => void
  onDelete: (address: Address) => void
}

export function AddressesTable({
  addresses,
  deletingAddressId,
  onEdit,
  onDelete,
}: AddressesTableProps) {
  return (
    <Box bg='rgba(248,250,248,0.9)' borderRadius='xl' boxShadow='sm' overflow='hidden'>
      <Table.ScrollArea>
        <Table.Root
          size='sm'
          striped
          css={{
            '& th:first-of-type, & td:first-of-type': { paddingInlineStart: '1.25rem' },
            '& th:last-of-type, & td:last-of-type': { paddingInlineEnd: '1.25rem' },
          }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>CEP</Table.ColumnHeader>
              <Table.ColumnHeader>Logradouro</Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', md: 'table-cell' }}>
                Localização
              </Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', lg: 'table-cell' }}>
                Condomínio
              </Table.ColumnHeader>
              <Table.ColumnHeader w='140px'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {addresses.map((address) => (
              <Table.Row key={address.id}>
                <Table.Cell>
                  <Text fontWeight='medium'>{address.zipCode}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fontWeight='semibold'>
                    {address.name}, {address.number}
                  </Text>
                  <Text fontSize='sm' color='gray.700'>
                    {address.district}
                  </Text>
                  <Text display={{ base: 'block', lg: 'none' }} fontSize='sm' color='gray.700'>
                    {address.condominium.name}
                  </Text>
                </Table.Cell>
                <Table.Cell display={{ base: 'none', md: 'table-cell' }}>
                  <Text>
                    {address.city} - {address.state}
                  </Text>
                  {address.complement ? (
                    <Badge mt={2} colorPalette='gray'>
                      {address.complement}
                    </Badge>
                  ) : null}
                </Table.Cell>
                <Table.Cell display={{ base: 'none', lg: 'table-cell' }}>
                  {address.condominium.name}
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={2}>
                    <IconButton
                      aria-label={`Editar endereço ${address.name}`}
                      size='sm'
                      variant='outline'
                      onClick={() => onEdit(address)}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      aria-label={`Excluir endereço ${address.name}`}
                      size='sm'
                      bg='red.500'
                      color='white'
                      _hover={{ bg: 'red.600' }}
                      loading={deletingAddressId === address.id}
                      onClick={() => onDelete(address)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  )
}
