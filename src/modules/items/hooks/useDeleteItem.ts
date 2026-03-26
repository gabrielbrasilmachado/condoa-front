import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem } from '@/modules/items/services/delete-item.service'

export function useDeleteItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: string) => deleteItem(itemId),
    onSuccess: async (_, itemId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['items', 'detail', itemId] }),
        queryClient.invalidateQueries({ queryKey: ['items', 'mine'] }),
        queryClient.invalidateQueries({ queryKey: ['items'] }),
        queryClient.invalidateQueries({ queryKey: ['items', 'analytics'] }),
      ])
    },
  })
}
