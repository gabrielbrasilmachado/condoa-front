import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/modules/auth/contexts/AuthContext'
import { AppToaster } from '@/shared/components/ui/toaster'
import { queryClient } from '@/shared/lib/react-query/query-client'
import { system } from '@/shared/theme'

export function AppProviders({ children }: Readonly<PropsWithChildren>) {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
        <AppToaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
