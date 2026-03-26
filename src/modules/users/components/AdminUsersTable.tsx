import { FiCheck, FiEdit2, FiX } from 'react-icons/fi'
import { Badge, Box, HStack, IconButton, Table, Text } from '@chakra-ui/react'
import type { AdminUser } from '@/modules/users/types/user-admin.types'
import {
  userRoleLabelMap,
  userStatusLabelMap,
} from '@/modules/users/types/user-labels'

type AdminUsersTableProps = {
  users: AdminUser[]
  onEdit: (user: AdminUser) => void
  onToggleStatus: (user: AdminUser) => void
  changingStatusUserId?: string | null
}

export function AdminUsersTable({
  users,
  onEdit,
  onToggleStatus,
  changingStatusUserId,
}: AdminUsersTableProps) {
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
                E-mail
              </Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', lg: 'table-cell' }}>
                Condomínio
              </Table.ColumnHeader>
              <Table.ColumnHeader display={{ base: 'none', lg: 'table-cell' }}>
                Perfil
              </Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader w='160px'>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => {
              const isActive = user.status === 'active'

              return (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <Text fontWeight='semibold'>{user.name}</Text>
                    <Text display={{ base: 'block', md: 'none' }} fontSize='sm' color='gray.700'>
                      {user.email}
                    </Text>
                    <Text display={{ base: 'block', lg: 'none' }} fontSize='sm' color='gray.700'>
                      {user.condominium?.name ?? 'Não registrado'}
                    </Text>
                  </Table.Cell>
                  <Table.Cell display={{ base: 'none', md: 'table-cell' }}>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell display={{ base: 'none', lg: 'table-cell' }}>
                    {user.condominium?.name ?? 'Não registrado'}
                  </Table.Cell>
                  <Table.Cell display={{ base: 'none', lg: 'table-cell' }}>
                    <Badge>{userRoleLabelMap[user.role]}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={isActive ? 'green' : 'red'}>
                      {userStatusLabelMap[user.status]}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={2}>
                      <IconButton
                        aria-label={`Editar usuário ${user.name}`}
                        size='sm'
                        variant='outline'
                        onClick={() => onEdit(user)}
                      >
                        <FiEdit2 />
                      </IconButton>
                      <IconButton
                        aria-label={
                          isActive
                            ? `Desativar usuário ${user.name}`
                            : `Ativar usuário ${user.name}`
                        }
                        size='sm'
                        bg={isActive ? 'red.500' : 'green.500'}
                        color='white'
                        _hover={{ bg: isActive ? 'red.600' : 'green.600' }}
                        loading={changingStatusUserId === user.id}
                        onClick={() => onToggleStatus(user)}
                      >
                        {isActive ? <FiX /> : <FiCheck />}
                      </IconButton>
                    </HStack>
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
