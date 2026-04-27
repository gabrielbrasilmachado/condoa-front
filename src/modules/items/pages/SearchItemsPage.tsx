import { FiChevronDown } from 'react-icons/fi'
import {
  Accordion,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { useCategories } from '@/modules/categories/hooks/useCategories'
import { ItemCard } from '@/modules/items/components/ItemCard'
import { useItems } from '@/modules/items/hooks/useItems'
import type { ItemStatus } from '@/modules/items/types/item.types'
import { AppPagination } from '@/shared/components/AppPagination'
import { AppSelect } from '@/shared/components/AppSelect'
import { EmptyState } from '@/shared/components/EmptyState'
import { ItemGridSkeleton } from '@/modules/items/components/ItemGridSkeleton'
import { PageHeader } from '@/shared/components/PageHeader'
import { ResponsiveCardGrid } from '@/shared/components/ResponsiveCardGrid'

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

export function SearchItemsPage() {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(defaultFilters)
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories()
  const itemsQuery = useItems({
    page,
    perPage: filters.perPage,
    categoryId: filters.categoryId || undefined,
    status: (filters.status || undefined) as ItemStatus | undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  })

  const categories = categoriesData ?? []
  const response = itemsQuery.data
  const hasCondominium = Boolean(user?.condominium_id)
  const isInitialLoading =
    (itemsQuery.isLoading && !response) ||
    (isLoadingCategories && !categoriesData)
  const isRefreshing = itemsQuery.isFetching && Boolean(response)

  return (
    <Stack gap={6}>
      <PageHeader
        title='Buscar itens'
        description='Encontre itens do seu condomínio filtrando por categoria e status.'
      />

      <Box bg='rgba(248,250,248,0.9)' borderRadius='xl' boxShadow='sm' overflow='hidden'>
        <Accordion.Root defaultValue={['filters']} multiple>
          <Accordion.Item value='filters' border='none'>
            <Accordion.ItemTrigger px={{ base: 5, md: 7 }} py={{ base: 5, md: 6 }}>
              <Box flex='1' textAlign='left'>
                <Heading size='md'>Filtros</Heading>
                <Text mt={2} color='gray.700'>
                  Use os filtros para refinar a busca de itens disponíveis no seu condomínio.
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
        <ItemGridSkeleton />
      ) : !response?.data.length ? (
        <EmptyState
          message={
            hasCondominium
              ? 'Nenhum item encontrado com os filtros atuais.'
              : 'Você não tem um condomínio atribuído, por favor contate seu síndico/administrador'
          }
        />
      ) : (
        <>
          {isRefreshing ? (
            <Text color='whiteAlpha.900' fontSize='sm' fontWeight='medium'>
              Atualizando resultados...
            </Text>
          ) : null}

          <ResponsiveCardGrid>
            {response.data.map((item) => (
              <ItemCard key={item.id} item={item} />
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
  )
}

