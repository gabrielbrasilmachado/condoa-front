import { Button, Stack, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { CondominiumSearchField } from '@/modules/users/components/CondominiumSearchField'
import { AppField } from '@/shared/components/AppField'
import { AppModal } from '@/shared/components/AppModal'
import { AppPagination } from '@/shared/components/AppPagination'
import { AppSelect } from '@/shared/components/AppSelect'
import { EmptyState } from '@/shared/components/EmptyState'
import { FormSection } from '@/shared/components/FormSection'
import { LoadingState } from '@/shared/components/LoadingState'
import { PageHeader } from '@/shared/components/PageHeader'
import { ResponsiveCardGrid } from '@/shared/components/ResponsiveCardGrid'
import { ResponsiveFormGrid } from '@/shared/components/ResponsiveFormGrid'
import { toaster } from '@/shared/components/ui/toaster'
import { getErrorMessage } from '@/shared/lib/http/http-error'
import { useAdminCondominiumRequests } from '@/modules/condominiumRequests/hooks/useAdminCondominiumRequests'
import { useApproveCondominiumRequest } from '@/modules/condominiumRequests/hooks/useApproveCondominiumRequest'
import { useRejectCondominiumRequest } from '@/modules/condominiumRequests/hooks/useRejectCondominiumRequest'
import type {
  CondominiumRequest,
  CondominiumRequestStatus,
} from '@/modules/condominiumRequests/types/condominium-request.types'
import { AdminCondominiumRequestCard } from '@/modules/condominiums/components/AdminCondominiumRequestCard'
import { CondominiumForm } from '@/modules/condominiums/components/CondominiumForm'
import { CondominiumsTable } from '@/modules/condominiums/components/CondominiumsTable'
import { useCondominiums } from '@/modules/condominiums/hooks/useCondominiums'
import { useCreateCondominium } from '@/modules/condominiums/hooks/useCreateCondominium'
import { useDeleteCondominium } from '@/modules/condominiums/hooks/useDeleteCondominium'
import { useUpdateCondominium } from '@/modules/condominiums/hooks/useUpdateCondominium'
import type { CondominiumFormData } from '@/modules/condominiums/schemas/condominium-form.schema'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'

const requestStatusOptions: Array<{ value: CondominiumRequestStatus; label: string }> = [
  { value: 'pending', label: 'Pendente' },
  { value: 'approved', label: 'Aprovada' },
  { value: 'rejected', label: 'Rejeitada' },
]

export function AdminCondominiumsPage() {
  const formModal = useDisclosure()
  const rejectModal = useDisclosure()
  const { data, isLoading } = useCondominiums()
  const [requestsPage, setRequestsPage] = useState(1)
  const [requestsPerPage, setRequestsPerPage] = useState(10)
  const [requestStatusFilter, setRequestStatusFilter] = useState<CondominiumRequestStatus | ''>('')
  const [requestCondominiumIdFilter, setRequestCondominiumIdFilter] = useState('')
  const requestsQuery = useAdminCondominiumRequests({
    page: requestsPage,
    perPage: requestsPerPage,
    status: requestStatusFilter || undefined,
    condominiumId: requestCondominiumIdFilter || undefined,
  })
  const createMutation = useCreateCondominium()
  const updateMutation = useUpdateCondominium()
  const deleteMutation = useDeleteCondominium()
  const approveRequestMutation = useApproveCondominiumRequest()
  const rejectRequestMutation = useRejectCondominiumRequest()
  const [selectedCondominium, setSelectedCondominium] = useState<Condominium | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<CondominiumRequest | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')

  const condominiums = data ?? []
  const requestsResponse = requestsQuery.data
  const condominiumRequests = requestsResponse?.data ?? []

  function closeFormModal() {
    setSelectedCondominium(null)
    formModal.onClose()
  }

  function openCreateModal() {
    setSelectedCondominium(null)
    formModal.onOpen()
  }

  function openEditModal(condominium: Condominium) {
    setSelectedCondominium(condominium)
    formModal.onOpen()
  }

  function openRejectModal(request: CondominiumRequest) {
    setSelectedRequest(request)
    setRejectionReason('')
    rejectModal.onOpen()
  }

  function closeRejectModal() {
    setSelectedRequest(null)
    setRejectionReason('')
    rejectModal.onClose()
  }

  async function handleCreate(values: CondominiumFormData) {
    try {
      await createMutation.mutateAsync(values)
      closeFormModal()
      toaster.success({ title: 'Condomínio criado com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  async function handleUpdate(values: CondominiumFormData) {
    if (!selectedCondominium) {
      return
    }

    try {
      await updateMutation.mutateAsync({
        id: selectedCondominium.id,
        payload: values,
      })
      closeFormModal()
      toaster.success({ title: 'Condomínio atualizado com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  async function handleDelete(condominium: Condominium) {
    try {
      await deleteMutation.mutateAsync(condominium.id)
      toaster.success({ title: 'Condomínio removido com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  async function handleApproveRequest(request: CondominiumRequest) {
    try {
      await approveRequestMutation.mutateAsync(request.id)
      toaster.success({ title: 'Solicitação aprovada com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  async function handleRejectRequest() {
    if (!selectedRequest) {
      return
    }

    try {
      await rejectRequestMutation.mutateAsync({
        requestId: selectedRequest.id,
        rejectionReason,
      })
      closeRejectModal()
      toaster.success({ title: 'Solicitação rejeitada com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  if (isLoading || requestsQuery.isLoading) {
    return <LoadingState />
  }

  return (
    <>
      <Stack gap={6}>
        <PageHeader
          title='Condomínios'
          description='Gerencie condomínios cadastrados e acompanhe as solicitações de vínculo dos usuários.'
          action={<Button onClick={openCreateModal}>Novo condomínio</Button>}
        />

        {!condominiums.length ? (
          <EmptyState message='Nenhum condomínio cadastrado até o momento.' />
        ) : (
          <CondominiumsTable
            condominiums={condominiums}
            deletingCondominiumId={deleteMutation.isPending ? deleteMutation.variables : null}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}

        <FormSection
          title='Solicitações de vínculo'
          description='Analise as solicitações dos usuários e aprove ou rejeite cada pedido.'
        >
          <ResponsiveFormGrid>
            <AppField label='Status'>
              <AppSelect
                options={requestStatusOptions}
                value={requestStatusFilter}
                placeholder='Todos os status'
                clearable
                onChange={(value) => {
                  setRequestsPage(1)
                  setRequestStatusFilter((value || '') as CondominiumRequestStatus | '')
                }}
              />
            </AppField>

            <AppField label='Condomínio'>
              <CondominiumSearchField
                condominiums={condominiums}
                value={requestCondominiumIdFilter}
                placeholder='Todos os condomínios'
                onChange={(value) => {
                  setRequestsPage(1)
                  setRequestCondominiumIdFilter(value ?? '')
                }}
              />
            </AppField>
          </ResponsiveFormGrid>

          {!condominiumRequests.length ? (
            <EmptyState message='Nenhuma solicitação de vínculo encontrada.' />
          ) : (
            <>
              <ResponsiveCardGrid columns={{ base: 1, md: 2, xl: 3 }}>
                {condominiumRequests.map((request) => (
                  <AdminCondominiumRequestCard
                    key={request.id}
                    request={request}
                    isApproving={
                      approveRequestMutation.isPending && approveRequestMutation.variables === request.id
                    }
                    isRejecting={
                      rejectRequestMutation.isPending && rejectRequestMutation.variables?.requestId === request.id
                    }
                    onApprove={(selectedRequest) => {
                      void handleApproveRequest(selectedRequest)
                    }}
                    onReject={openRejectModal}
                  />
                ))}
              </ResponsiveCardGrid>

              <AppPagination
                page={requestsResponse?.meta.page ?? 1}
                total={requestsResponse?.meta.total ?? 0}
                perPage={requestsPerPage}
                onPerPageChange={(perPage) => {
                  setRequestsPage(1)
                  setRequestsPerPage(perPage)
                }}
                onPageChange={setRequestsPage}
              />
            </>
          )}
        </FormSection>
      </Stack>

      <AppModal
        isOpen={formModal.open}
        onClose={closeFormModal}
        title={selectedCondominium ? 'Editar condomínio' : 'Novo condomínio'}
      >
        <Text mb={5} color='gray.700'>
          O formulário segue o schema do backend e usa apenas o nome do condomínio.
        </Text>
        <CondominiumForm
          condominium={selectedCondominium}
          isLoading={createMutation.isPending || updateMutation.isPending}
          onCancel={closeFormModal}
          onSubmit={selectedCondominium ? handleUpdate : handleCreate}
        />
      </AppModal>

      <AppModal
        isOpen={rejectModal.open}
        onClose={closeRejectModal}
        title='Rejeitar solicitação'
        size='md'
      >
        <Stack gap={5}>
          <Text color='gray.700'>
            {selectedRequest
              ? `Você está rejeitando a solicitação de ${selectedRequest.user.name} para o condomínio ${selectedRequest.condominium.name}.`
              : 'Informe uma justificativa, se desejar.'}
          </Text>

          <AppField label='Justificativa da rejeição'>
            <Textarea
              minH='120px'
              placeholder='Opcional'
              value={rejectionReason}
              onChange={(event) => setRejectionReason(event.target.value)}
            />
          </AppField>

          <Stack direction={{ base: 'column', sm: 'row' }} justify='flex-end' gap={3}>
            <Button variant='outline' onClick={closeRejectModal}>
              Cancelar
            </Button>
            <Button
              colorPalette='red'
              loading={rejectRequestMutation.isPending}
              onClick={() => {
                void handleRejectRequest()
              }}
            >
              Confirmar rejeição
            </Button>
          </Stack>
        </Stack>
      </AppModal>
    </>
  )
}


