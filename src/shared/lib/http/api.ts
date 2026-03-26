import axios from 'axios'
import { env } from '@/shared/config/env'

const defaultConfig = {
  baseURL: env.apiUrl,
  withCredentials: true,
}

export const api = axios.create(defaultConfig)

export const authApi = axios.create(defaultConfig)
