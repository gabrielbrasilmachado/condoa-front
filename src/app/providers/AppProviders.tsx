import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/modules/auth/contexts/AuthContext'
import { queryClient } from '@/shared/lib/react-query/query-client'
import { theme } from '@/shared/theme'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
