import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCondominium } from '@/modules/condominiums/services/condominium.service'

export function useDeleteCondominium() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCondominium,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['condominiums'] })
    },
  })
}
