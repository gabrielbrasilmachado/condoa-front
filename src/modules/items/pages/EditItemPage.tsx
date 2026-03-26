import { FiTrash2 } from 'react-icons/fi'
import { Button, Dialog, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCategories } from '@/modules/categories/hooks/useCategories'
import { ItemForm } from '@/modules/items/components/ItemForm'
import { useDeleteItem } from '@/modules/items/hooks/useDeleteItem'
import { useDeleteItemImage } from '@/modules/items/hooks/useDeleteItemImage'
import { useItemById } from '@/modules/items/hooks/useItemById'
import { useUpdateItem } from '@/modules/items/hooks/useUpdateItem'
import type { ItemDetailsImage } from '@/modules/items/types/item.types'
import { LoadingState } from '@/shared/components/LoadingState'
import { PageHeader } from '@/shared/components/PageHeader'
import { toaster } from '@/shared/components/ui/toaster'
import { getErrorMessage } from '@/shared/lib/http/http-error'

export function EditItemPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories()
  const itemQuery = useItemById(id)
  const updateItemMutation = useUpdateItem()
  const deleteItemMutation = useDeleteItem()
  const deleteItemImageMutation = useDeleteItemImage()

  async function handleDeleteItem() {
    try {
      await deleteItemMutation.mutateAsync(id)
      toaster.success({ title: 'Item excluído com sucesso.' })
      navigate('/app/items/mine')
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  if (isLoadingCategories || itemQuery.isLoading || !itemQuery.data) {
    return <LoadingState />
  }

  return (
    <>
      <PageHeader
        title={`Editar ${itemQuery.data.name}`}
        description='Atualize os dados do item e gerencie as imagens vinculadas.'
        action={
          <Button variant='outline' onClick={() => navigate('/app/items/mine')}>
            Voltar para meus itens
          </Button>
        }
      />

      <ItemForm
        item={itemQuery.data}
        categories={categoriesData ?? []}
        isLoading={updateItemMutation.isPending}
        isDeletingImage={deleteItemImageMutation.isPending}
        submitLabel='Salvar alterações'
        onCancel={() => navigate('/app/items/mine')}
        infoSectionAction={
          <Button colorPalette='red' onClick={() => setIsDeleteDialogOpen(true)}>
            <FiTrash2 color='white' />
            Excluir
          </Button>
        }
        onDeleteExistingImage={async (image: ItemDetailsImage) => {
          try {
            await deleteItemImageMutation.mutateAsync({ itemId: id, imageId: image.id })
            toaster.success({ title: 'Imagem removida com sucesso.' })
          } catch (error) {
            toaster.error({ title: getErrorMessage(error) })
            throw error
          }
        }}
        onSubmit={async (payload) => {
          try {
            await updateItemMutation.mutateAsync({ itemId: id, ...payload })
            toaster.success({ title: 'Item atualizado com sucesso.' })
            navigate('/app/items/mine')
          } catch (error) {
            toaster.error({ title: getErrorMessage(error) })
          }
        }}
      />

      <Dialog.Root
        open={isDeleteDialogOpen}
        onOpenChange={(details) => {
          setIsDeleteDialogOpen(details.open)
        }}
        placement='center'
        role='alertdialog'
      >
        <Dialog.Backdrop bg='blackAlpha.500' backdropFilter='blur(4px)' />
        <Dialog.Positioner px={4}>
          <Dialog.Content borderRadius='2xl'>
            <Dialog.Header>
              <Dialog.Title>Excluir item</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb={6}>
              <Stack gap={5}>
                <Text color='gray.700'>
                  Tem certeza que deseja excluir o item "{itemQuery.data.name}"? Esta ação não poderá ser desfeita.
                </Text>
                <Stack direction={{ base: 'column', sm: 'row' }} justify='flex-end' gap={3}>
                  <Button variant='outline' onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button colorPalette='red' loading={deleteItemMutation.isPending} onClick={() => void handleDeleteItem()}>
                    <FiTrash2 color='white' />
                    Excluir
                  </Button>
                </Stack>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}
