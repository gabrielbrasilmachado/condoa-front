import { FiTrash2, FiEdit2 } from 'react-icons/fi'
import { Box, HStack, IconButton, Table, Text } from '@chakra-ui/react'
import type { Category } from '@/modules/categories/types/category.types'

type CategoriesTableProps = {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  deletingCategoryId?: string | null
}

export function CategoriesTable({
  categories,
  onEdit,
  onDelete,
  deletingCategoryId,
}: CategoriesTableProps) {
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
              <Table.ColumnHeader w='140px'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {categories.map((category) => (
              <Table.Row key={category.id}>
                <Table.Cell>
                  <Text fontWeight='semibold'>{category.name}</Text>
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={2}>
                    <IconButton
                      aria-label={`Editar categoria ${category.name}`}
                      size='sm'
                      variant='outline'
                      onClick={() => onEdit(category)}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      aria-label={`Excluir categoria ${category.name}`}
                      size='sm'
                      bg='red.500'
                      color='white'
                      _hover={{ bg: 'red.600' }}
                      loading={deletingCategoryId === category.id}
                      onClick={() => onDelete(category)}
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
