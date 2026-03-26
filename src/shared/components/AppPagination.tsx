import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import {
  ButtonGroup,
  HStack,
  IconButton,
  Pagination,
  useBreakpointValue,
} from '@chakra-ui/react'
import { AppSelect } from '@/shared/components/AppSelect'

type AppPaginationProps = {
  page: number
  total: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

export function AppPagination({
  page,
  total,
  perPage,
  onPageChange,
  onPerPageChange,
}: AppPaginationProps) {
  const controlSize =
    useBreakpointValue<{ size: 'sm' | 'md' }>({
      base: { size: 'sm' },
      md: { size: 'md' },
    })?.size ?? 'sm'

  return (
    <HStack justify='space-between' gap={4} mt={6} flexWrap='wrap'>
      <AppSelect
        options={[
          { value: '10', label: '10 / pag' },
          { value: '20', label: '20 / pag' },
          { value: '50', label: '50 / pag' },
        ]}
        value={String(perPage)}
        onChange={(value) => onPerPageChange(Number(value || '10'))}
        positioning={{ placement: 'top-start' }}
        width='110px'
        size={controlSize}
      />

      <Pagination.Root
        count={total}
        pageSize={perPage}
        page={page}
        onPageChange={(details) => onPageChange(details.page)}
      >
        <ButtonGroup variant='outline' size={controlSize}>
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label='Página anterior' size={controlSize}>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(paginationPage) => (
              <IconButton
                aria-label={`Página ${paginationPage.value}`}
                size={controlSize}
                variant={{ base: 'outline', _selected: 'solid' }}
              >
                {paginationPage.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton aria-label='Próxima página' size={controlSize}>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </HStack>
  )
}
