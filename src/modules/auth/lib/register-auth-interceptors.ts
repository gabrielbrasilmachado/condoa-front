import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'
import { clearAccessToken, getAccessToken, setAccessToken } from './auth-session'
import { refreshSession } from '@/modules/auth/services/auth.service'
import { api } from '@/shared/lib/http/api'

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

let refreshRequest: Promise<string> | null = null

export function registerAuthInterceptors(onUnauthorized: () => void) {
  const requestInterceptor = api.interceptors.request.use((config) => {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  const responseInterceptor = api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (!axios.isAxiosError(error) || !error.config) {
        return Promise.reject(error)
      }

      const originalRequest = error.config as RetryableRequestConfig

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        if (!refreshRequest) {
          refreshRequest = refreshSession()
            .then((response) => {
              setAccessToken(response.accessToken)
              return response.accessToken
            })
            .finally(() => {
              refreshRequest = null
            })
        }

        const newAccessToken = await refreshRequest
        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        clearAccessToken()
        onUnauthorized()
        return Promise.reject(refreshError)
      }
    }
  )

  return () => {
    api.interceptors.request.eject(requestInterceptor)
    api.interceptors.response.eject(responseInterceptor)
  }
}
