import { FiChevronDown } from 'react-icons/fi'
import {
  Accordion,
  Box,
  Button,
  Dialog,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { useCategories } from '@/modules/categories/hooks/useCategories'
import { ItemCard } from '@/modules/items/components/ItemCard'
import { useMyItems } from '@/modules/items/hooks/useMyItems'
import { useUpdateItemStatus } from '@/modules/items/hooks/useUpdateItemStatus'
import type { Item, ItemStatus } from '@/modules/items/types/item.types'
import { AppPagination } from '@/shared/components/AppPagination'
import { AppSelect } from '@/shared/components/AppSelect'
import { EmptyState } from '@/shared/components/EmptyState'
import { ItemGridSkeleton } from '@/modules/items/components/ItemGridSkeleton'
import { PageHeader } from '@/shared/components/PageHeader'
import { ResponsiveCardGrid } from '@/shared/components/ResponsiveCardGrid'
import { toaster } from '@/shared/components/ui/toaster'
import { getErrorMessage } from '@/shared/lib/http/http-error'

const itemStatusOptions: Array<{ value: ItemStatus; label: string }> = [
  { value: 'available', label: 'Disponível' },
  { value: 'donated', label: 'Doado' },
  { value: 'expired', label: 'Expirado' },
]

const defaultFilters = {
  categoryId: '',
  status: '',
  sortBy: 'createdAt' as const,
  sortOrder: 'desc' as const,
  perPage: 10,
}

export function MyItemsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(defaultFilters)
  const [itemToDonate, setItemToDonate] = useState<Item | null>(null)
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories()
  const itemsQuery = useMyItems({
    page,
    perPage: filters.perPage,
    categoryId: filters.categoryId || undefined,
    status: (filters.status || undefined) as ItemStatus | undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  })
  const updateItemStatusMutation = useUpdateItemStatus()

  const categories = categoriesData ?? []
  const response = itemsQuery.data
  const isDonateDialogOpen = Boolean(itemToDonate)
  const hasCondominiumAssigned = Boolean(user?.condominium_id)
  const isInitialLoading =
    (itemsQuery.isLoading && !response) ||
    (isLoadingCategories && !categoriesData)
  const isRefreshing = itemsQuery.isFetching && Boolean(response)
  const donateButtonLabel = useMemo(
    () => (itemToDonate?.status === 'donated' ? 'Item já doado' : 'Marcar como doado'),
    [itemToDonate],
  )

  async function handleDonateItem() {
    if (!itemToDonate || itemToDonate.status === 'donated') {
      setItemToDonate(null)
      return
    }

    try {
      await updateItemStatusMutation.mutateAsync({
        itemId: itemToDonate.id,
        status: 'donated',
      })
      toaster.success({ title: 'Status do item atualizado para doado.' })
      setItemToDonate(null)
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  return (
    <>
      <Stack gap={6}>
        <PageHeader
          title='Meus itens'
          description='Acompanhe os itens cadastrados por você e filtre por categoria e status.'
          action={
            <Button
              disabled={!hasCondominiumAssigned}
              onClick={() => navigate('/app/items/mine/new')}
            >
              Novo item
            </Button>
          }
        />

        <Box bg='rgba(248,250,248,0.9)' borderRadius='xl' boxShadow='sm' overflow='hidden'>
          <Accordion.Root multiple>
            <Accordion.Item value='filters' border='none'>
              <Accordion.ItemTrigger px={{ base: 5, md: 7 }} py={{ base: 5, md: 6 }}>
                <Box flex='1' textAlign='left'>
                  <Heading size='md'>Filtros</Heading>
                  <Text mt={2} color='gray.700'>
                    Refine a listagem dos seus itens por categoria e status atual.
                  </Text>
                </Box>
                <Accordion.ItemIndicator>
                  <FiChevronDown />
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody px={{ base: 5, md: 7 }} pb={{ base: 5, md: 7 }}>
                  <HStack gap={4} flexWrap='wrap' align='flex-end'>
                    <Box minW={{ base: 'full', md: '260px' }} flex='1'>
                      <Text mb={2} fontWeight='medium'>
                        Categoria
                      </Text>
                      <Box opacity={isLoadingCategories && !categoriesData ? 0.72 : 1}>
                        <AppSelect
                          options={categories.map((category) => ({
                            value: category.id,
                            label: category.name,
                          }))}
                          value={filters.categoryId}
                          placeholder='Todas as categorias'
                          clearable
                          disabled={isLoadingCategories && !categoriesData}
                          onChange={(value) => {
                            setPage(1)
                            setFilters((current) => ({
                              ...current,
                              categoryId: value,
                            }))
                          }}
                        />
                      </Box>
                    </Box>

                    <Box minW={{ base: 'full', md: '220px' }}>
                      <Text mb={2} fontWeight='medium'>
                        Status
                      </Text>
                      <AppSelect
                        options={itemStatusOptions}
                        value={filters.status}
                        placeholder='Todos os status'
                        clearable
                        onChange={(value) => {
                          setPage(1)
                          setFilters((current) => ({
                            ...current,
                            status: value,
                          }))
                        }}
                      />
                    </Box>
                  </HStack>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Box>

        {isInitialLoading ? (
          <ItemGridSkeleton label='Carregando seus itens...' />
        ) : !response?.data.length ? (
          <EmptyState message='Nenhum item seu foi encontrado com os filtros atuais.' />
        ) : (
          <>
            {isRefreshing ? (
              <Text color='whiteAlpha.900' fontSize='sm' fontWeight='medium'>
                Atualizando resultados...
              </Text>
            ) : null}

            <ResponsiveCardGrid>
              {response.data.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  showDefaultAccessAction={false}
                  showOwnerName={false}
                  actions={
                    <>
                      <Button
                        flex='1'
                        variant='outline'
                        size='sm'
                        borderRadius='full'
                        onClick={() => navigate(`/app/items/mine/${item.id}/edit`)}
                      >
                        Editar
                      </Button>
                      <Button
                        flex='1'
                        size='sm'
                        borderRadius='full'
                        colorPalette={item.status === 'donated' ? 'gray' : 'yellow'}
                        disabled={item.status === 'donated'}
                        onClick={() => setItemToDonate(item)}
                      >
                        {item.status === 'donated' ? 'Doado' : 'Marcar como doado'}
                      </Button>
                    </>
                  }
                />
              ))}
            </ResponsiveCardGrid>

            <AppPagination
              page={response.meta.page}
              total={response.meta.total}
              perPage={filters.perPage}
              onPerPageChange={(perPage) => {
                setPage(1)
                setFilters((current) => ({
                  ...current,
                  perPage,
                }))
              }}
              onPageChange={setPage}
            />
          </>
        )}
      </Stack>

      <Dialog.Root
        open={isDonateDialogOpen}
        onOpenChange={(details) => {
          if (!details.open) {
            setItemToDonate(null)
          }
        }}
        role='alertdialog'
        placement='center'
      >
        <Dialog.Backdrop bg='blackAlpha.500' backdropFilter='blur(4px)' />
        <Dialog.Positioner px={4}>
          <Dialog.Content borderRadius='xl'>
            <Dialog.Header>
              <Dialog.Title>Confirmar doação</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb={6}>
              <Stack gap={5}>
                <Text color='gray.700'>
                  {itemToDonate
                    ? `Deseja marcar o item "${itemToDonate.name}" como doado?`
                    : 'Deseja marcar este item como doado?'}
                </Text>
                <HStack justify='flex-end' gap={3} flexWrap='wrap'>
                  <Button variant='outline' onClick={() => setItemToDonate(null)}>
                    Cancelar
                  </Button>
                  <Button
                    colorPalette='yellow'
                    loading={updateItemStatusMutation.isPending}
                    disabled={itemToDonate?.status === 'donated'}
                    onClick={() => void handleDonateItem()}
                  >
                    {donateButtonLabel}
                  </Button>
                </HStack>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}



