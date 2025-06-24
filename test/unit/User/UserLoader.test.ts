import { beforeEach, describe, expect, it } from 'vitest'
import { loadOrGenerateUser } from '../../../src/User/UserLoader.ts'

describe('UserLoader', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('read from the localstorage when already logged', async () => {
    localStorage.setItem('anonChatUserName', 'old-name')
    const user = await loadOrGenerateUser()

    expect(user?.name).toStrictEqual('old-name')
    expect(localStorage.getItem('anonChatUserName')).toStrictEqual('old-name')
  })

  it('generate and save to the localstorage when not already logged', async () => {
    const fakeGenerator = () => Promise.resolve('random-name')
    const user = await loadOrGenerateUser(fakeGenerator)

    expect(user?.name).toStrictEqual('random-name')
    expect(localStorage.getItem('anonChatUserName')).toStrictEqual('random-name')
  })
})
