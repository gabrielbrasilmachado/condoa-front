import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import type { UserRole } from '@/modules/auth/types/auth.types'
import { LoadingState } from '@/shared/components/LoadingState'

type RequireRoleProps = PropsWithChildren<{
  allowedRoles: UserRole[]
}>

export function RequireRole({ allowedRoles, children }: RequireRoleProps) {
  const { user, isAuthenticated, isBootstrapping } = useAuth()
  const location = useLocation()

  if (isBootstrapping) {
    return <LoadingState />
  }

  if (!isAuthenticated || !user) {
    return <Navigate to='/login' replace state={{ from: location }} />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/app' replace />
  }

  return children
}
