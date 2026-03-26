import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  categoryFormSchema,
  type CategoryFormData,
} from '@/modules/categories/schemas/category-form.schema'
import type { Category } from '@/modules/categories/types/category.types'
import { AppField } from '@/shared/components/AppField'

type CategoryFormProps = {
  category?: Category | null
  isLoading?: boolean
  onCancel?: () => void
  onSubmit: (values: CategoryFormData) => Promise<void>
}

export function CategoryForm({
  category,
  isLoading,
  onCancel,
  onSubmit,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name ?? '',
    },
  })

  useEffect(() => {
    reset({
      name: category?.name ?? '',
    })
  }, [category, reset])

  return (
    <Stack as='form' gap={5} onSubmit={handleSubmit(onSubmit)}>
      <AppField label='Nome' error={errors.name?.message} required>
        <Input placeholder='Ex.: HIGIENE' {...register('name')} />
      </AppField>

      <Stack direction={{ base: 'column', sm: 'row' }} gap={3}>
        <Button type='submit' loading={isLoading}>
          {category ? 'Salvar alterações' : 'Cadastrar categoria'}
        </Button>
        {onCancel ? (
          <Button variant='outline' onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </Stack>
    </Stack>
  )
}
