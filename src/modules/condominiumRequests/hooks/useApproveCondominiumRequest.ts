import { useMutation, useQueryClient } from '@tanstack/react-query'
import { approveCondominiumRequest } from '@/modules/condominiumRequests/services/condominium-request.service'

export function useApproveCondominiumRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: approveCondominiumRequest,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['condominium-requests', 'admin'] }),
        queryClient.invalidateQueries({ queryKey: ['condominiums'] }),
        queryClient.invalidateQueries({ queryKey: ['users'] }),
      ])
    },
  })
}
