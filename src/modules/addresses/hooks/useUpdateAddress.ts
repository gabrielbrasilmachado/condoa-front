import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAddress } from '@/modules/addresses/services/address.service'
import type { AddressPayload } from '@/modules/addresses/types/address.types'

type UpdateAddressInput = {
  id: string
  payload: AddressPayload
}

export function useUpdateAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateAddressInput) => updateAddress(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['addresses'] })
      await queryClient.invalidateQueries({ queryKey: ['condominiums'] })
    },
  })
}
