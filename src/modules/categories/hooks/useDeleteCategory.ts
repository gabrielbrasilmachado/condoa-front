import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategory } from '@/modules/categories/services/category.service'

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
