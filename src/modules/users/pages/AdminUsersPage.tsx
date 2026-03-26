import { Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useCondominiums } from '@/modules/condominiums/hooks/useCondominiums'
import { AdminUserFilters } from '@/modules/users/components/AdminUserFilters'
import { AdminUsersTable } from '@/modules/users/components/AdminUsersTable'
import { UserEditForm } from '@/modules/users/components/UserEditForm'
import { UsersPagination } from '@/modules/users/components/UsersPagination'
import { useAdminUsers } from '@/modules/users/hooks/useAdminUsers'
import { useUpdateAdminUser } from '@/modules/users/hooks/useUpdateAdminUser'
import { useUpdateAdminUserStatus } from '@/modules/users/hooks/useUpdateAdminUserStatus'
import type { AdminUserEditFormData } from '@/modules/users/schemas/admin-user-edit.schema'
import type { UserFiltersFormData } from '@/modules/users/schemas/user-filters.schema'
import type { AdminUser } from '@/modules/users/types/user-admin.types'
import { AppModal } from '@/shared/components/AppModal'
import { EmptyState } from '@/shared/components/EmptyState'
import { LoadingState } from '@/shared/components/LoadingState'
import { PageHeader } from '@/shared/components/PageHeader'
import { toaster } from '@/shared/components/ui/toaster'
import { getErrorMessage } from '@/shared/lib/http/http-error'

const defaultFilters: UserFiltersFormData = {
  name: '',
  email: '',
  condominiumId: '',
  sortOrder: 'desc',
  perPage: 10,
}

export function AdminUsersPage() {
  const editModal = useDisclosure()
  const { data: condominiumsData, isLoading: isLoadingCondominiums } =
    useCondominiums()
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [filters, setFilters] = useState<UserFiltersFormData>(defaultFilters)
  const [page, setPage] = useState(1)

  const usersQuery = useAdminUsers({
    page,
    perPage: filters.perPage,
    name: filters.name || undefined,
    email: filters.email || undefined,
    condominiumId: filters.condominiumId || undefined,
    sortBy: 'createdAt',
    sortOrder: filters.sortOrder,
  })
  const updateUserMutation = useUpdateAdminUser()
  const updateStatusMutation = useUpdateAdminUserStatus()

  const condominiums = condominiumsData ?? []
  const usersResponse = usersQuery.data

  function openEditModal(user: AdminUser) {
    setSelectedUser(user)
    editModal.onOpen()
  }

  function closeEditModal() {
    setSelectedUser(null)
    editModal.onClose()
  }

  async function handleUpdateUser(values: AdminUserEditFormData) {
    if (!selectedUser) {
      return
    }

    try {
      await updateUserMutation.mutateAsync({
        id: selectedUser.id,
        payload: values,
      })
      closeEditModal()
      toaster.success({ title: 'Usuário atualizado com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  async function handleToggleStatus(user: AdminUser) {
    const nextStatus = user.status === 'active' ? 'inactive' : 'active'

    try {
      await updateStatusMutation.mutateAsync({
        id: user.id,
        status: nextStatus,
      })
      toaster.success({
        title:
          nextStatus === 'active'
            ? 'Usuário ativado com sucesso.'
            : 'Usuário desativado com sucesso.',
      })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  if (usersQuery.isLoading && !usersResponse) {
    return <LoadingState />
  }

  return (
    <>
      <PageHeader
        title='Usuários'
        description='Gerencie listagem, status e dados administrativos dos usuários.'
      />

      <Stack gap={6}>
        <AdminUserFilters
          initialValues={filters}
          condominiums={condominiums}
          onSubmit={(values) => {
            setPage(1)
            setFilters((current) => ({
              ...current,
              name: values.name,
              email: values.email,
              condominiumId: values.condominiumId,
              sortOrder: values.sortOrder,
            }))
          }}
          onReset={() => {
            setPage(1)
            setFilters((current) => ({
              ...current,
              name: '',
              email: '',
              condominiumId: '',
              sortOrder: 'desc',
            }))
          }}
        />

        {!usersResponse?.data.length ? (
          <EmptyState message='Nenhum usuário encontrado com os filtros atuais.' />
        ) : (
          <Stack gap={6}>
            <AdminUsersTable
              users={usersResponse.data}
              changingStatusUserId={
                updateStatusMutation.isPending
                  ? updateStatusMutation.variables?.id ?? null
                  : null
              }
              onEdit={openEditModal}
              onToggleStatus={handleToggleStatus}
            />

            <UsersPagination
              page={usersResponse.meta.page}
              total={usersResponse.meta.total}
              perPage={filters.perPage}
              onPerPageChange={(perPage) => {
                setPage(1)
                setFilters((current) => ({
                  ...current,
                  perPage,
                }))
              }}
              onPageChange={setPage}
            />
          </Stack>
        )}
      </Stack>

      <AppModal
        isOpen={editModal.open}
        onClose={closeEditModal}
        title={selectedUser ? `Editar ${selectedUser.name}` : 'Editar usuário'}
        size='xl'
      >
        <Text mb={5} color='gray.600'>
          Edite os dados administrativos do usuário e, se quiser, altere também
          o condomínio vinculado.
        </Text>
        <UserEditForm
          condominiums={condominiums}
          isLoading={updateUserMutation.isPending || isLoadingCondominiums}
          user={selectedUser}
          onCancel={closeEditModal}
          onSubmit={handleUpdateUser}
        />
      </AppModal>
    </>
  )
}
