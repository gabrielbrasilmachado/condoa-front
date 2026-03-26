import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateItemStatus } from '@/modules/items/services/update-item-status.service'

type UpdateItemStatusPayload = {
  itemId: string
  status: 'available' | 'donated'
}

export function useUpdateItemStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, status }: UpdateItemStatusPayload) => updateItemStatus(itemId, { status }),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['items', 'detail', variables.itemId] }),
        queryClient.invalidateQueries({ queryKey: ['items', 'mine'] }),
        queryClient.invalidateQueries({ queryKey: ['items'] }),
        queryClient.invalidateQueries({ queryKey: ['items', 'analytics'] }),
      ])
    },
  })
}
