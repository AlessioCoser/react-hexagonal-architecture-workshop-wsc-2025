import type { UserSession } from '../../src/User/UserSessionHook.ts'
import { randomUUID } from 'crypto'
import { vi } from 'vitest'
import * as toMock from '../../src/User/UserSessionHook.ts'

export function mockUseUserSession(value?: UserSession): UserSession {
  const mocked = value ?? {
    user: { name: `user-${randomUUID()}` },
    loading: false
  }
  vi.spyOn(toMock, 'useUserSession').mockImplementation(() => mocked)
  return mocked
}
