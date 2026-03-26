import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { listUsers } from '@/modules/users/services/admin-users.service'
import type { ListUsersParams } from '@/modules/users/types/user-admin.types'

export function useAdminUsers(params: ListUsersParams) {
  return useQuery({
    queryKey: ['admin-users', params],
    queryFn: () => listUsers(params),
    placeholderData: keepPreviousData,
  })
}
