import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@/modules/users/services/admin-users.service'
import type { UpdateUserPayload } from '@/modules/users/types/user-admin.types'

type UpdateAdminUserInput = {
  id: string
  payload: UpdateUserPayload
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: UpdateAdminUserInput) => updateUser(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}
