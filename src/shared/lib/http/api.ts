import axios from 'axios'
import { env } from '@/shared/config/env'

export const api = axios.create({
  baseURL: env.apiUrl,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('condoa:token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
