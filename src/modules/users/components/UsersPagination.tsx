import { AppPagination } from '@/shared/components/AppPagination'

type UsersPaginationProps = {
  page: number
  total: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
}

export function UsersPagination(props: UsersPaginationProps) {
  return <AppPagination {...props} />
}
