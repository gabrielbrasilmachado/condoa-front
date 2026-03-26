import { useMutation } from '@tanstack/react-query'
import {
  updateOwnProfile,
  type UpdateOwnProfilePayload,
} from '@/modules/profile/services/profile.service'

type UpdateOwnProfileInput = {
  userId: string
  payload: UpdateOwnProfilePayload
}

export function useUpdateOwnProfile() {
  return useMutation({
    mutationFn: ({ userId, payload }: UpdateOwnProfileInput) =>
      updateOwnProfile(userId, payload),
  })
}
