import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import {
  clearAccessToken,
  setAccessToken,
} from '@/modules/auth/lib/auth-session'
import { registerAuthInterceptors } from '@/modules/auth/lib/register-auth-interceptors'
import type { LoginFormData } from '@/modules/auth/schemas/loginSchema'
import {
  getMe,
  login,
  logout,
  refreshSession,
} from '@/modules/auth/services/auth.service'
import type { AuthUser } from '@/modules/auth/types/auth.types'
import { queryClient } from '@/shared/lib/react-query/query-client'

type AuthContextData = {
  user: AuthUser | null
  isAuthenticated: boolean
  isBootstrapping: boolean
  signIn: (payload: LoginFormData) => Promise<void>
  signOut: () => Promise<void>
  updateCurrentUser: (user: AuthUser) => void
}

export const AuthContext = createContext<AuthContextData | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
    const removeInterceptors = registerAuthInterceptors(() => {
      clearSession()
    })

    return removeInterceptors
  }, [])

  useEffect(() => {
    void refreshSession()
      .then(async (session) => {
        setAccessToken(session.accessToken)
        const currentUser = await getMe()
        setUser(currentUser)
      })
      .catch(() => {
        clearSession()
      })
      .finally(() => {
        setIsBootstrapping(false)
      })
  }, [])

  function clearSession() {
    clearAccessToken()
    setUser(null)
    queryClient.clear()
  }

  async function signIn(payload: LoginFormData) {
    const response = await login(payload)

    setAccessToken(response.accessToken)
    setUser(response.user)
  }

  async function signOut() {
    try {
      await logout()
    } finally {
      clearSession()
    }
  }

  function updateCurrentUser(nextUser: AuthUser) {
    setUser(nextUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isBootstrapping,
        signIn,
        signOut,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
