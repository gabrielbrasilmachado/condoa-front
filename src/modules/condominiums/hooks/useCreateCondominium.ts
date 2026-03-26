import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCondominium } from '@/modules/condominiums/services/condominium.service'

export function useCreateCondominium() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCondominium,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['condominiums'] })
    },
  })
}
