import { EmptyState } from '@/shared/components/EmptyState'
import { PageHeader } from '@/shared/components/PageHeader'

export function AdminCondominiumsPage() {
  return (
    <>
      <PageHeader
        title="Condominios"
        description="Modulo administrativo para gerenciamento dos condominios."
      />
      <EmptyState message="Proximo passo: CRUD completo com formularios validados por schema." />
    </>
  )
}
