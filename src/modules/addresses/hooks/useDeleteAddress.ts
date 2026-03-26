import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAddress } from '@/modules/addresses/services/address.service'

export function useDeleteAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['addresses'] })
      await queryClient.invalidateQueries({ queryKey: ['condominiums'] })
    },
  })
}
