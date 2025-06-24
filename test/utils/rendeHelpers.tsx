import type { ReactNode } from 'react'
import { ModalProvider } from '../../src/helpers/Modal/ModalProvider.tsx'

export function wrapWithModal() {
  return {
    wrapper: ({ children }: WrapperProps): ReactNode => (
      <>
        <ModalProvider>{children}</ModalProvider>
      </>
    ),
  }
}

type WrapperProps = { children: ReactNode }
