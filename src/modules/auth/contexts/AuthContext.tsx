import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import type { LoginFormData } from '@/modules/auth/schemas/loginSchema'
import { getMe, login } from '@/modules/auth/services/auth.service'
import type { AuthUser } from '@/modules/auth/types/auth.types'

type AuthContextData = {
  user: AuthUser | null
  isAuthenticated: boolean
  isBootstrapping: boolean
  signIn: (payload: LoginFormData) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData | null>(null)

const TOKEN_KEY = 'condoa:token'
const USER_KEY = 'condoa:user'

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY)

    if (!stored) {
      return null
    }

    return JSON.parse(stored) as AuthUser
  })
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      setIsBootstrapping(false)
      return
    }

    void getMe()
      .then((currentUser) => {
        setUser(currentUser)
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setUser(null)
      })
      .finally(() => {
        setIsBootstrapping(false)
      })
  }, [])

  async function signIn(payload: LoginFormData) {
    const response = await login(payload)

    localStorage.setItem(TOKEN_KEY, response.accessToken)
    localStorage.setItem(USER_KEY, JSON.stringify(response.user))
    setUser(response.user)
  }

  function signOut() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isBootstrapping,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
