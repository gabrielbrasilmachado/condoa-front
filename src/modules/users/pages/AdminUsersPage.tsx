import { EmptyState } from '@/shared/components/EmptyState'
import { PageHeader } from '@/shared/components/PageHeader'

export function AdminUsersPage() {
  return (
    <>
      <PageHeader
        title="Usuarios"
        description="Modulo administrativo conectado aos endpoints protegidos de usuarios."
      />
      <EmptyState message="Proximo passo: listagem, criacao e alteracao de status dos usuarios." />
    </>
  )
}
