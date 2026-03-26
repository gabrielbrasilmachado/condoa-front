import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory } from '@/modules/categories/services/category.service'
export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
