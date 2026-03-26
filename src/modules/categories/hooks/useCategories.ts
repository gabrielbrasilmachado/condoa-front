import { useQuery } from '@tanstack/react-query'
import { listCategories } from '@/modules/categories/services/category.service'
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: listCategories,
  })
}
