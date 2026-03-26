import { Badge, Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
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

type AdminCondominiumRequestCardProps = {
  request: CondominiumRequest
  isApproving?: boolean
  isRejecting?: boolean
  onApprove: (request: CondominiumRequest) => void
  onReject: (request: CondominiumRequest) => void
}

export function AdminCondominiumRequestCard({
  request,
  isApproving,
  isRejecting,
  onApprove,
  onReject,
}: AdminCondominiumRequestCardProps) {
  const isPending = request.status === 'pending'

  return (
    <Box
      bg='rgba(248,250,248,0.9)'
      borderRadius='xl'
      boxShadow='sm'
      border='1px solid'
      borderColor='whiteAlpha.500'
      p={5}
    >
      <Stack gap={4} h='full'>
        <HStack justify='space-between' align='flex-start' gap={3}>
          <Stack gap={1}>
            <Text fontSize='sm' color='gray.700'>
              Condomínio
            </Text>
            <Text fontSize='lg' fontWeight='semibold'>
              {request.condominium.name}
            </Text>
          </Stack>
          <Badge colorPalette={requestStatusColorMap[request.status]}>
            {requestStatusLabelMap[request.status]}
          </Badge>
        </HStack>

        <Stack gap={1}>
          <Text fontSize='sm' color='gray.700'>
            Usuário
          </Text>
          <Text fontWeight='medium'>{request.user.name}</Text>
          <Text color='gray.700'>{request.user.email}</Text>
        </Stack>

        <Stack gap={1}>
          <Text fontSize='sm' color='gray.700'>
            Data da solicitação
          </Text>
          <Text>{new Date(request.created_at).toLocaleDateString('pt-BR')}</Text>
        </Stack>

        {request.rejectionReason ? (
          <Stack gap={1}>
            <Text fontSize='sm' color='gray.700'>
              Justificativa
            </Text>
            <Text>{request.rejectionReason}</Text>
          </Stack>
        ) : null}

        <HStack mt='auto' gap={3} flexWrap='wrap'>
          <Button
            flex='1'
            minW='140px'
            colorPalette='green'
            disabled={!isPending}
            loading={isApproving}
            onClick={() => onApprove(request)}
          >
            Aprovar
          </Button>
          <Button
            flex='1'
            minW='140px'
            colorPalette='red'
            variant='outline'
            disabled={!isPending}
            loading={isRejecting}
            onClick={() => onReject(request)}
          >
            Rejeitar
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}
