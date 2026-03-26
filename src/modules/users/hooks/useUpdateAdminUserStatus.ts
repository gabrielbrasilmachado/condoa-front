import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserStatus } from '@/modules/users/services/admin-users.service'

type UpdateAdminUserStatusInput = {
  id: string
  status: 'active' | 'inactive'
}

export function useUpdateAdminUserStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: UpdateAdminUserStatusInput) =>
      updateUserStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}
