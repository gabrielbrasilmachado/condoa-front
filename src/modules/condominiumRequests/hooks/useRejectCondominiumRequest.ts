import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rejectCondominiumRequest } from '@/modules/condominiumRequests/services/condominium-request.service'

type RejectCondominiumRequestInput = {
  requestId: string
  rejectionReason?: string
}

export function useRejectCondominiumRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ requestId, rejectionReason }: RejectCondominiumRequestInput) =>
      rejectCondominiumRequest(requestId, rejectionReason),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['condominium-requests', 'admin'] }),
        queryClient.invalidateQueries({ queryKey: ['condominiums'] }),
        queryClient.invalidateQueries({ queryKey: ['users'] }),
      ])
    },
  })
}
