import { FiCalendar, FiTrash2, FiUpload, FiX } from 'react-icons/fi'
import {
  Badge,
  Box,
  Button,
  DatePicker,
  HStack,
  IconButton,
  Image,
  Input,
  Portal,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseDate } from '@internationalized/date'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { Category } from '@/modules/categories/types/category.types'
import {
  itemFormSchema,
  itemImageValidation,
  type ItemFormData,
  type ItemFormInput,
} from '@/modules/items/schemas/item-form.schema'
import type { ItemDetails, ItemDetailsImage } from '@/modules/items/types/item.types'
import { AppField } from '@/shared/components/AppField'
import { AppSelect } from '@/shared/components/AppSelect'
import { FormSection } from '@/shared/components/FormSection'
import { ResponsiveCardGrid } from '@/shared/components/ResponsiveCardGrid'
import { ResponsiveFormGrid } from '@/shared/components/ResponsiveFormGrid'

type ItemImagePreview = {
  file: File
  previewUrl: string
}

type ItemFormProps = {
  categories: Category[]
  item?: ItemDetails | null
  isLoading?: boolean
  isDeletingImage?: boolean
  submitLabel: string
  onCancel: () => void
  infoSectionAction?: ReactNode
  onDeleteExistingImage?: (image: ItemDetailsImage) => Promise<void>
  onSubmit: (payload: { values: ItemFormData; images: File[]; existingImagesCount: number }) => Promise<void>
}

const itemStatusOptions = [
  { value: 'available', label: 'Disponível' },
  { value: 'donated', label: 'Doado' },
] as const

function formatFileSize(sizeInBytes: number) {
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDateForInput(value: string | null | undefined) {
  if (!value) {
    return ''
  }

  return value.slice(0, 10)
}

export function ItemForm({
  categories,
  item,
  isLoading,
  isDeletingImage,
  submitLabel,
  onCancel,
  infoSectionAction,
  onDeleteExistingImage,
  onSubmit,
}: ItemFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [newImages, setNewImages] = useState<ItemImagePreview[]>([])
  const [existingImages, setExistingImages] = useState<ItemDetailsImage[]>(item?.images ?? [])
  const [imageError, setImageError] = useState<string | null>(null)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormInput, unknown, ItemFormData>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: item?.name ?? '',
      description: item?.description ?? '',
      categoryId: item?.categoryId ?? '',
      expiredAt: formatDateForInput(item?.expiredAt),
      status: item && item.status !== 'expired' ? item.status : 'available',
    },
  })

  useEffect(() => {
    reset({
      name: item?.name ?? '',
      description: item?.description ?? '',
      categoryId: item?.categoryId ?? '',
      expiredAt: formatDateForInput(item?.expiredAt),
      status: item && item.status !== 'expired' ? item.status : 'available',
    })
    setExistingImages(item?.images ?? [])
  }, [item, reset])

  useEffect(() => {
    return () => {
      newImages.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    }
  }, [newImages])

  const acceptedMimeTypes = useMemo(
    () => itemImageValidation.acceptedMimeTypes.join(','),
    [],
  )

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) {
      return
    }

    const nextFiles = Array.from(fileList)
    const totalFiles = existingImages.length + newImages.length + nextFiles.length

    if (totalFiles > itemImageValidation.maxFiles) {
      setImageError(`Você pode enviar no máximo ${itemImageValidation.maxFiles} imagens.`)
      return
    }

    for (const file of nextFiles) {
      if (
        !itemImageValidation.acceptedMimeTypes.includes(
          file.type as (typeof itemImageValidation.acceptedMimeTypes)[number],
        )
      ) {
        setImageError('Formato inválido. Envie imagens JPEG, PNG ou WEBP.')
        return
      }

      if (file.size > itemImageValidation.maxFileSizeInBytes) {
        setImageError(
          `Cada imagem deve ter no máximo ${formatFileSize(itemImageValidation.maxFileSizeInBytes)}.`,
        )
        return
      }
    }

    setImageError(null)
    setNewImages((current) => [
      ...current,
      ...nextFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ])

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function handleRemoveNewImage(index: number) {
    setNewImages((current) => {
      const removedImage = current[index]
      if (removedImage) {
        URL.revokeObjectURL(removedImage.previewUrl)
      }

      return current.filter((_, currentIndex) => currentIndex !== index)
    })
  }

  async function handleRemoveExistingImage(image: ItemDetailsImage) {
    if (!onDeleteExistingImage) {
      return
    }

    await onDeleteExistingImage(image)
    setExistingImages((current) => current.filter((currentImage) => currentImage.id !== image.id))
  }

  return (
    <Stack
      as='form'
      gap={6}
      onSubmit={handleSubmit((values) =>
        onSubmit({
          values,
          images: newImages.map((image) => image.file),
          existingImagesCount: existingImages.length,
        }),
      )}
    >
      <FormSection
        title='Informações do item'
        description='Preencha os dados principais do item conforme as regras do backend.'
        headerAction={infoSectionAction}
      >
        <ResponsiveFormGrid>
          <AppField label='Nome' error={errors.name?.message} required>
            <Input {...register('name')} />
          </AppField>

          <AppField label='Categoria' error={errors.categoryId?.message} required>
            <Controller
              control={control}
              name='categoryId'
              render={({ field }) => (
                <AppSelect
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  value={field.value}
                  placeholder='Selecione a categoria'
                  onChange={(value) => field.onChange(value || '')}
                />
              )}
            />
          </AppField>

          {item ? (
            <AppField label='Status' error={errors.status?.message}>
              <Controller
                control={control}
                name='status'
                render={({ field }) => (
                  <AppSelect
                    options={[...itemStatusOptions]}
                    value={field.value ?? 'available'}
                    placeholder='Selecione o status'
                    onChange={(value) => field.onChange(value || 'available')}
                  />
                )}
              />
            </AppField>
          ) : null}
        </ResponsiveFormGrid>

        <AppField label='Descrição' error={errors.description?.message} required>
          <Textarea minH='80px' resize='vertical' rows={2} {...register('description')} />
        </AppField>

        <AppField label='Data de expiração' error={errors.expiredAt?.message} required>
          <Controller
            control={control}
            name='expiredAt'
            render={({ field }) => (
              <DatePicker.Root
                selectionMode='single'
                locale='pt-BR'
                value={field.value ? [parseDate(field.value)] : []}
                onValueChange={(details) => {
                  field.onChange(details.value[0]?.toString() ?? '')
                }}
              >
                <DatePicker.Control>
                  <DatePicker.Input placeholder='Selecione a data' />
                  <DatePicker.ClearTrigger asChild>
                    <IconButton variant='ghost' aria-label='Limpar data' size='sm'>
                      <FiX />
                    </IconButton>
                  </DatePicker.ClearTrigger>
                  <DatePicker.Trigger asChild>
                    <IconButton variant='outline' aria-label='Abrir calendário'>
                      <FiCalendar />
                    </IconButton>
                  </DatePicker.Trigger>
                </DatePicker.Control>
                <Portal>
                  <DatePicker.Positioner>
                    <DatePicker.Content>
                      <DatePicker.View view='day'>
                        <DatePicker.Header />
                        <DatePicker.DayTable />
                      </DatePicker.View>
                    </DatePicker.Content>
                  </DatePicker.Positioner>
                </Portal>
              </DatePicker.Root>
            )}
          />
        </AppField>
      </FormSection>

      <FormSection
        title='Imagens do item'
        description='Gerencie até 3 imagens em JPEG, PNG ou WEBP, com no máximo 5 MB cada.'
      >
        <input
          ref={inputRef}
          type='file'
          accept={acceptedMimeTypes}
          multiple
          hidden
          onChange={(event) => handleFilesSelected(event.target.files)}
        />

        <HStack gap={3} flexWrap='wrap'>
          <Button type='button' variant='outline' onClick={() => inputRef.current?.click()}>
            <FiUpload />
            Adicionar imagens
          </Button>
          <Text color='gray.600' fontSize='sm'>
            {existingImages.length + newImages.length}/{itemImageValidation.maxFiles} imagens no item
          </Text>
        </HStack>

        {imageError ? (
          <Text color='red.500' fontSize='sm'>
            {imageError}
          </Text>
        ) : null}

        {existingImages.length ? (
          <Stack gap={3}>
            <Text fontWeight='semibold'>Imagens atuais</Text>
            <ResponsiveCardGrid columns={{ base: 1, sm: 2, xl: 3 }}>
              {existingImages.map((image) => (
                <Stack key={image.id} gap={3} bg='gray.50' p={3} borderRadius='xl'>
                  <Box overflow='hidden' borderRadius='lg' aspectRatio={1.2} bg='white'>
                    <Image src={image.url} alt={image.originalName} w='full' h='full' objectFit='cover' />
                  </Box>
                  <Stack gap={1}>
                    <HStack justify='space-between' align='center'>
                      <Text fontWeight='medium' lineClamp='1'>
                        {image.originalName}
                      </Text>
                      {image.isPrimary ? <Badge colorPalette='green'>Principal</Badge> : null}
                    </HStack>
                    <Text fontSize='sm' color='gray.600'>
                      {formatFileSize(image.size)}
                    </Text>
                  </Stack>
                  <Button
                    type='button'
                    size='sm'
                    variant='outline'
                    loading={isDeletingImage}
                    onClick={() => void handleRemoveExistingImage(image)}
                  >
                    <FiTrash2 />
                    Remover
                  </Button>
                </Stack>
              ))}
            </ResponsiveCardGrid>
          </Stack>
        ) : null}

        {newImages.length ? (
          <Stack gap={3}>
            <Text fontWeight='semibold'>Novas imagens</Text>
            <ResponsiveCardGrid columns={{ base: 1, sm: 2, xl: 3 }}>
              {newImages.map((image, index) => (
                <Stack key={`${image.file.name}-${index}`} gap={3} bg='gray.50' p={3} borderRadius='xl'>
                  <Box overflow='hidden' borderRadius='lg' aspectRatio={1.2} bg='white'>
                    <Image src={image.previewUrl} alt={image.file.name} w='full' h='full' objectFit='cover' />
                  </Box>
                  <Stack gap={1}>
                    <Text fontWeight='medium' lineClamp='1'>
                      {image.file.name}
                    </Text>
                    <Text fontSize='sm' color='gray.600'>
                      {formatFileSize(image.file.size)}
                    </Text>
                  </Stack>
                  <Button type='button' size='sm' variant='outline' onClick={() => handleRemoveNewImage(index)}>
                    Remover
                  </Button>
                </Stack>
              ))}
            </ResponsiveCardGrid>
          </Stack>
        ) : null}

        {!existingImages.length && !newImages.length ? (
          <Box border='1px dashed' borderColor='blackAlpha.200' borderRadius='xl' p={5}>
            <Text color='gray.600'>
              Nenhuma imagem selecionada ainda. O preview aparecerá aqui antes do envio.
            </Text>
          </Box>
        ) : null}
      </FormSection>

      <HStack gap={3} justify='flex-end' flexWrap='wrap'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancelar
        </Button>
        <Button type='submit' loading={isLoading} colorPalette='green'>
          {submitLabel}
        </Button>
      </HStack>
    </Stack>
  )
}
