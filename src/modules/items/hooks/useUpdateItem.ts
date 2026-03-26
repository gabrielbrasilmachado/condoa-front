import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateItem } from '@/modules/items/services/update-item.service'
import { uploadItemImage } from '@/modules/items/services/upload-item-image.service'
import type { ItemFormData } from '@/modules/items/schemas/item-form.schema'

type UpdateItemWithImagesPayload = {
  itemId: string
  values: ItemFormData
  images: File[]
  existingImagesCount: number
}

export function useUpdateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ itemId, values, images, existingImagesCount }: UpdateItemWithImagesPayload) => {
      const updatedItem = await updateItem(itemId, {
        name: values.name,
        description: values.description,
        categoryId: values.categoryId,
        expiredAt: new Date(`${values.expiredAt}T12:00:00`).toISOString(),
        status: values.status,
      })

      for (const [index, file] of images.entries()) {
        await uploadItemImage({
          itemId,
          file,
          isPrimary: existingImagesCount === 0 && index === 0,
        })
      }

      return updatedItem
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['items', 'detail', variables.itemId] }),
        queryClient.invalidateQueries({ queryKey: ['items', 'mine'] }),
        queryClient.invalidateQueries({ queryKey: ['items'] }),
        queryClient.invalidateQueries({ queryKey: ['items', 'analytics'] }),
      ])
    },
  })
}
