import axios from 'axios'

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? 'Erro ao comunicar com o servidor.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Ocorreu um erro inesperado.'
}
