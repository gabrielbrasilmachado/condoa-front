import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAddress } from '@/modules/addresses/services/address.service'

export function useCreateAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['addresses'] })
      await queryClient.invalidateQueries({ queryKey: ['condominiums'] })
    },
  })
}
