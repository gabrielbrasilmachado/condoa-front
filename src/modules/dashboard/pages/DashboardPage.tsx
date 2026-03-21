import { SimpleGrid } from '@chakra-ui/react'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { InfoCard } from '@/shared/components/InfoCard'
import { PageHeader } from '@/shared/components/PageHeader'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visao geral inicial para acompanhar o ecossistema do Condoa."
      />

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <InfoCard
          label="Perfil atual"
          value={user?.role === 'admin' ? 'Administrador' : 'Usuario'}
          helper="O backend já separa rotas comuns e administrativas."
        />
        <InfoCard
          label="Autenticacao"
          value="JWT"
          helper="Context API guarda a sessao e o cliente HTTP injeta o token."
        />
        <InfoCard
          label="Estrutura"
          value="Modular"
          helper="Cada dominio possui pages, services, hooks, schemas e components."
        />
      </SimpleGrid>
    </>
  )
}
