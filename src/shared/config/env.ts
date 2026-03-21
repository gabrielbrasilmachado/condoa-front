const apiUrl = import.meta.env.VITE_API_URL

if (!apiUrl) {
  throw new Error('VITE_API_URL nao foi configurada.')
}

export const env = {
  apiUrl,
}
