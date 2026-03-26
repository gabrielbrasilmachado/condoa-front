import { FiTrash2, FiEdit2 } from 'react-icons/fi'
import { Badge, Box, HStack, IconButton, Table, Text } from '@chakra-ui/react'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'

type CondominiumsTableProps = {
  condominiums: Condominium[]
  onEdit: (condominium: Condominium) => void
  onDelete: (condominium: Condominium) => void
  deletingCondominiumId?: string | null
}

export function CondominiumsTable({
  condominiums,
  onEdit,
  onDelete,
  deletingCondominiumId,
}: CondominiumsTableProps) {
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
              <Table.ColumnHeader>Nome</Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', md: 'table-cell' }}>
                Usuários
              </Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', md: 'table-cell' }}>
                Endereço
              </Table.ColumnHeader>
              <Table.ColumnHeader w='140px'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {condominiums.map((condominium) => (
              <Table.Row key={condominium.id}>
                <Table.Cell>
                  <Text fontWeight='semibold'>{condominium.name}</Text>
                </Table.Cell>
                <Table.Cell display={{ base: 'none', md: 'table-cell' }}>
                  {condominium.usersCount ?? condominium.users?.length ?? 0}
                </Table.Cell>
                <Table.Cell display={{ base: 'none', md: 'table-cell' }}>
                  <Badge colorPalette={condominium.address ? 'green' : 'gray'}>
                    {condominium.address ? 'Vinculado' : 'Sem endereço'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={2}>
                    <IconButton
                      aria-label={`Editar condomínio ${condominium.name}`}
                      size='sm'
                      variant='outline'
                      onClick={() => onEdit(condominium)}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      aria-label={`Excluir condomínio ${condominium.name}`}
                      size='sm'
                      bg='red.500'
                      color='white'
                      _hover={{ bg: 'red.600' }}
                      loading={deletingCondominiumId === condominium.id}
                      onClick={() => onDelete(condominium)}
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
