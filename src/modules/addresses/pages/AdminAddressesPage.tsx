import { EmptyState } from '@/shared/components/EmptyState'
import { PageHeader } from '@/shared/components/PageHeader'

export function AdminAddressesPage() {
  return (
    <>
      <PageHeader
        title="Enderecos"
        description="Modulo administrativo associado aos condominios."
      />
      <EmptyState message="Proximo passo: integrar listagem e formularios de endereco." />
    </>
  )
}
