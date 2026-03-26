import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItemImage } from '@/modules/items/services/delete-item-image.service'

export function useDeleteItemImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, imageId }: { itemId: string; imageId: string }) =>
      deleteItemImage(itemId, imageId),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['items', 'detail', variables.itemId] }),
        queryClient.invalidateQueries({ queryKey: ['items', 'mine'] }),
        queryClient.invalidateQueries({ queryKey: ['items'] }),
      ])
    },
  })
}
