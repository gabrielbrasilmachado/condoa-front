import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCondominium } from '@/modules/condominiums/services/condominium.service'
import type { CondominiumPayload } from '@/modules/condominiums/types/condominium.types'

type UpdateCondominiumInput = {
  id: string
  payload: CondominiumPayload
}

export function useUpdateCondominium() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateCondominiumInput) =>
      updateCondominium(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['condominiums'] })
    },
  })
}
