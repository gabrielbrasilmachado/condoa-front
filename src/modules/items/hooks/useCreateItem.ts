import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createItem } from '@/modules/items/services/create-item.service'
import { uploadItemImage } from '@/modules/items/services/upload-item-image.service'
import type { ItemFormData } from '@/modules/items/schemas/item-form.schema'

type CreateItemWithImagesPayload = {
  values: ItemFormData
  images: File[]
}

export function useCreateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ values, images }: CreateItemWithImagesPayload) => {
      const createdItem = await createItem({
        name: values.name,
        description: values.description,
        categoryId: values.categoryId,
        expiredAt: new Date(`${values.expiredAt}T12:00:00`).toISOString(),
      })

      for (const [index, file] of images.entries()) {
        await uploadItemImage({
          itemId: createdItem.id,
          file,
          isPrimary: index === 0,
        })
      }

      return createdItem
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['items', 'mine'] }),
        queryClient.invalidateQueries({ queryKey: ['items'] }),
        queryClient.invalidateQueries({ queryKey: ['items', 'analytics'] }),
      ])
    },
  })
}
