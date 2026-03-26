import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCondominiumRequest } from '@/modules/condominiumRequests/services/condominium-request.service'

export function useCreateCondominiumRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCondominiumRequest,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['condominium-requests', 'me'] }),
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }),
      ])
    },
  })
}
