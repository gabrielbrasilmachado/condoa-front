import { Badge, Box, Stack, Text } from '@chakra-ui/react'
import type {
  CondominiumRequest,
  CondominiumRequestStatus,
} from '@/modules/condominiumRequests/types/condominium-request.types'

const requestStatusLabelMap: Record<CondominiumRequestStatus, string> = {
  pending: 'Pendente',
  approved: 'Aprovada',
  rejected: 'Rejeitada',
}

const requestStatusColorMap: Record<CondominiumRequestStatus, 'yellow' | 'green' | 'red'> = {
  pending: 'yellow',
  approved: 'green',
  rejected: 'red',
}

type CondominiumRequestCardProps = {
  request: CondominiumRequest
}

export function CondominiumRequestCard({ request }: CondominiumRequestCardProps) {
  return (
    <Box
      bg='rgba(248,250,248,0.9)'
      borderRadius='xl'
      boxShadow='sm'
      border='1px solid'
      borderColor='whiteAlpha.500'
      p={5}
    >
      <Stack gap={3}>
        <Stack gap={1}>
          <Text fontSize='sm' color='gray.700'>
            Condomínio solicitado
          </Text>
          <Text fontWeight='semibold' fontSize='lg'>
            {request.condominium.name}
          </Text>
        </Stack>

        <Stack gap={1}>
          <Text fontSize='sm' color='gray.700'>
            Status
          </Text>
          <Badge alignSelf='flex-start' colorPalette={requestStatusColorMap[request.status]}>
            {requestStatusLabelMap[request.status]}
          </Badge>
        </Stack>

        <Stack gap={1}>
          <Text fontSize='sm' color='gray.700'>
            Data da solicitação
          </Text>
          <Text>{new Date(request.created_at).toLocaleDateString('pt-BR')}</Text>
        </Stack>

        {request.status === 'rejected' && request.rejectionReason ? (
          <Stack gap={1}>
            <Text fontSize='sm' color='gray.700'>
              Motivo da rejeição
            </Text>
            <Text>{request.rejectionReason}</Text>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  )
}
