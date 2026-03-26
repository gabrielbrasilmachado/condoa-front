import { useAuth } from '@/modules/auth/hooks/useAuth'
import { AdminCondominiumsPage } from '@/modules/condominiums/pages/AdminCondominiumsPage'
import { UserCondominiumsPage } from '@/modules/condominiums/pages/UserCondominiumsPage'

export function CondominiumsPage() {
  const { user } = useAuth()

  if (user?.role === 'admin') {
    return <AdminCondominiumsPage />
  }

  return <UserCondominiumsPage />
}
