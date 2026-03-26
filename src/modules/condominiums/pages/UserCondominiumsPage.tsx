import { Alert, Stack, Text } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { useCreateCondominiumRequest } from '@/modules/condominiumRequests/hooks/useCreateCondominiumRequest'
import { useOwnCondominiumRequests } from '@/modules/condominiumRequests/hooks/useOwnCondominiumRequests'
import { AvailableCondominiumCard } from '@/modules/condominiums/components/AvailableCondominiumCard'
import { CondominiumRequestCard } from '@/modules/condominiums/components/CondominiumRequestCard'
import { useCondominiums } from '@/modules/condominiums/hooks/useCondominiums'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'
import { AppPagination } from '@/shared/components/AppPagination'
import { EmptyState } from '@/shared/components/EmptyState'
import { FormSection } from '@/shared/components/FormSection'
import { LoadingState } from '@/shared/components/LoadingState'
import { PageHeader } from '@/shared/components/PageHeader'
import { ResponsiveCardGrid } from '@/shared/components/ResponsiveCardGrid'
import { toaster } from '@/shared/components/ui/toaster'
import { getErrorMessage } from '@/shared/lib/http/http-error'

export function UserCondominiumsPage() {
  const { user } = useAuth()
  const [requestingCondominiumId, setRequestingCondominiumId] = useState<string | null>(null)
  const [availablePage, setAvailablePage] = useState(1)
  const [availablePerPage, setAvailablePerPage] = useState(10)
  const condominiumsQuery = useCondominiums()
  const ownRequestsQuery = useOwnCondominiumRequests()
  const createRequestMutation = useCreateCondominiumRequest()

  const condominiums = condominiumsQuery.data ?? []
  const ownRequests = ownRequestsQuery.data?.data ?? []
  const pendingRequest = useMemo(
    () => ownRequests.find((request) => request.status === 'pending') ?? null,
    [ownRequests],
  )
  const hasCondominiumAssigned = Boolean(user?.condominium_id)
  const isRequestBlocked = hasCondominiumAssigned || Boolean(pendingRequest)
  const availableStartIndex = (availablePage - 1) * availablePerPage
  const paginatedCondominiums = useMemo(
    () => condominiums.slice(availableStartIndex, availableStartIndex + availablePerPage),
    [availablePerPage, availableStartIndex, condominiums],
  )

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(condominiums.length / availablePerPage))

    if (availablePage > totalPages) {
      setAvailablePage(totalPages)
    }
  }, [availablePage, availablePerPage, condominiums.length])

  async function handleRequest(condominium: Condominium) {
    if (isRequestBlocked) {
      return
    }

    setRequestingCondominiumId(condominium.id)

    try {
      await createRequestMutation.mutateAsync({ condominiumId: condominium.id })
      toaster.success({ title: 'Solicitação de vínculo enviada com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    } finally {
      setRequestingCondominiumId(null)
    }
  }

  if (condominiumsQuery.isLoading || ownRequestsQuery.isLoading) {
    return <LoadingState />
  }

  return (
    <Stack gap={6}>
      <PageHeader
        title='Condomínios'
        description='Solicite sua vinculação a um condomínio para liberar as interações da plataforma dentro da sua comunidade.'
      />

      {hasCondominiumAssigned ? (
        <Alert.Root status='info' bg='rgba(248,250,248,0.9)' borderRadius='xl' boxShadow='sm'>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Você já possui um condomínio vinculado.</Alert.Title>
            <Alert.Description>
              Não é possível criar uma nova solicitação enquanto houver um condomínio atribuído ao seu perfil.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ) : pendingRequest ? (
        <Alert.Root status='warning' bg='rgba(248,250,248,0.9)' borderRadius='xl' boxShadow='sm'>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Você já possui uma solicitação pendente.</Alert.Title>
            <Alert.Description>
              Sua solicitação para o condomínio {pendingRequest.condominium.name} ainda está aguardando análise.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ) : (
        <Text color='whiteAlpha.900'>
          Você pode selecionar um condomínio da lista e enviar sua solicitação de vínculo.
        </Text>
      )}

      <FormSection
        title='Condomínios disponíveis'
        description='Confira os condomínios cadastrados e solicite seu vínculo quando necessário.'
      >
        {!condominiums.length ? (
          <EmptyState message='Nenhum condomínio disponível para solicitação no momento.' />
        ) : (
          <>
            <ResponsiveCardGrid>
              {paginatedCondominiums.map((condominium) => (
                <AvailableCondominiumCard
                  key={condominium.id}
                  condominium={condominium}
                  isRequestBlocked={isRequestBlocked}
                  isLoading={requestingCondominiumId === condominium.id}
                  onRequest={(selectedCondominium) => {
                    void handleRequest(selectedCondominium)
                  }}
                />
              ))}
            </ResponsiveCardGrid>

            <AppPagination
              page={availablePage}
              total={condominiums.length}
              perPage={availablePerPage}
              onPerPageChange={(perPage) => {
                setAvailablePage(1)
                setAvailablePerPage(perPage)
              }}
              onPageChange={setAvailablePage}
            />
          </>
        )}
      </FormSection>

      <FormSection
        title='Minhas solicitações'
        description='Acompanhe o histórico das suas solicitações de vínculo com condomínio.'
      >
        {!ownRequests.length ? (
          <EmptyState message='Você ainda não possui solicitações cadastradas.' />
        ) : (
          <ResponsiveCardGrid columns={{ base: 1, md: 2, xl: 3 }}>
            {ownRequests.map((request) => (
              <CondominiumRequestCard key={request.id} request={request} />
            ))}
          </ResponsiveCardGrid>
        )}
      </FormSection>
    </Stack>
  )
}
