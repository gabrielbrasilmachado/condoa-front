import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCategory } from '@/modules/categories/services/category.service'
import type { CategoryPayload } from '@/modules/categories/types/category.types'
type UpdateCategoryInput = {
  id: string
  payload: CategoryPayload
}
export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: UpdateCategoryInput) =>
      updateCategory(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
