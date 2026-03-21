import { EmptyState } from '@/shared/components/EmptyState'
import { PageHeader } from '@/shared/components/PageHeader'

export function AdminCategoriesPage() {
  return (
    <>
      <PageHeader
        title="Categorias"
        description="Modulo administrativo para listar, criar, editar e excluir categorias."
      />
      <EmptyState message="Proximo passo: criar tabela, filtros e formularios com React Hook Form + Zod." />
    </>
  )
}
