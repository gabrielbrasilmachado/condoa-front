import { Button, Box, Table, Text } from '@chakra-ui/react'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'

type UserCondominiumsTableProps = {
  condominiums: Condominium[]
  isRequestBlocked: boolean
  requestingCondominiumId?: string | null
  onRequest: (condominium: Condominium) => void
}

export function UserCondominiumsTable({
  condominiums,
  isRequestBlocked,
  requestingCondominiumId,
  onRequest,
}: UserCondominiumsTableProps) {
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
              <Table.ColumnHeader>Condomínio</Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', md: 'table-cell' }}>
                Endereço
              </Table.ColumnHeader>
              <Table.ColumnHeader>CEP</Table.ColumnHeader>
              <Table.ColumnHeader w='180px'>Ação</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {condominiums.map((condominium) => {
              const address = condominium.address

              return (
                <Table.Row key={condominium.id}>
                  <Table.Cell>
                    <Text fontWeight='semibold'>{condominium.name}</Text>
                    <Text display={{ base: 'block', md: 'none' }} fontSize='sm' color='gray.700'>
                      {address ? `${address.name}, ${address.city} - ${address.state}` : 'Endereço não cadastrado'}
                    </Text>
                  </Table.Cell>
                  <Table.Cell display={{ base: 'none', md: 'table-cell' }}>
                    {address ? (
                      <>
                        <Text>{address.name}</Text>
                        <Text fontSize='sm' color='gray.700'>
                          {address.city} - {address.state}
                        </Text>
                      </>
                    ) : (
                      <Text color='gray.700'>Endereço não cadastrado</Text>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{address?.zipCode ?? 'Não cadastrado'}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size='sm'
                      colorPalette='green'
                      disabled={isRequestBlocked}
                      loading={requestingCondominiumId === condominium.id}
                      onClick={() => onRequest(condominium)}
                    >
                      Solicitar vínculo
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  )
}
