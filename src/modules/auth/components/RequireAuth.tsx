import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { LoadingState } from '@/shared/components/LoadingState'

export function RequireAuth({ children }: PropsWithChildren) {
  const { isAuthenticated, isBootstrapping } = useAuth()
  const location = useLocation()

  if (isBootstrapping) {
    return <LoadingState />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
