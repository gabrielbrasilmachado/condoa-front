import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '@/modules/categories/hooks/useCategories'
import { ItemForm } from '@/modules/items/components/ItemForm'
import { useCreateItem } from '@/modules/items/hooks/useCreateItem'
import { PageHeader } from '@/shared/components/PageHeader'
import { toaster } from '@/shared/components/ui/toaster'
import { LoadingState } from '@/shared/components/LoadingState'
import { getErrorMessage } from '@/shared/lib/http/http-error'

export function CreateItemPage() {
  const navigate = useNavigate()
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories()
  const createItemMutation = useCreateItem()

  if (isLoadingCategories) {
    return <LoadingState />
  }

  return (
    <>
      <PageHeader
        title='Novo item'
        description='Cadastre um novo item e já envie até 3 imagens com preview antes da publicação.'
        action={
          <Button variant='outline' onClick={() => navigate('/app/items/mine')}>
            Voltar para meus itens
          </Button>
        }
      />

      <ItemForm
        categories={categoriesData ?? []}
        submitLabel='Criar item'
        isLoading={createItemMutation.isPending}
        onCancel={() => navigate('/app/items/mine')}
        onSubmit={async (payload) => {
          try {
            await createItemMutation.mutateAsync(payload)
            toaster.success({ title: 'Item criado com sucesso.' })
            navigate('/app/items/mine')
          } catch (error) {
            toaster.error({ title: getErrorMessage(error) })
          }
        }}
      />
    </>
  )
}
