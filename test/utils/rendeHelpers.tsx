import type { ReactNode } from 'react'
import { ModalProvider } from '../../src/helpers/Modal/ModalProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function wrapWithModal() {
  return {
    wrapper: ({ children }: WrapperProps): ReactNode => (
      <>
        <ModalProvider>{children}</ModalProvider>
      </>
    ),
  }
}

export function wrapWithQuery() {
  const queryClient = new QueryClient()

  return {
    wrapper: ({ children }: WrapperProps): ReactNode => (
      <>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </>
    ),
  }
}

type WrapperProps = { children: ReactNode }
