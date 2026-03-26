import { api } from '@/shared/lib/http/api'

type UploadItemImagePayload = {
  itemId: string
  file: File
  isPrimary?: boolean
}

export async function uploadItemImage({ itemId, file, isPrimary }: UploadItemImagePayload) {
  const formData = new FormData()
  formData.append('file', file)

  if (typeof isPrimary === 'boolean') {
    formData.append('isPrimary', String(isPrimary))
  }

  const { data } = await api.post(`/items/${itemId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}
