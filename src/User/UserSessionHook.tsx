import { useEffect, useState } from 'react'
import { type User } from './User'
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator'

type UserSession = { user: undefined; loading: true } | { user: User; loading: false }

export const useUserSession = (): UserSession => {
  const [session, setUserSession] = useState<UserSession>({ user: undefined, loading: true })
  const sessionKey = 'anonChatUserName'

  useEffect(loadOrCreateUserName, [])

  return session

  // --- PRIVATE FUNCTION --- //

  function loadOrCreateUserName() {
    const sessionUsername = localStorage.getItem(sessionKey)

    if (sessionUsername) {
      return setUserSession({ user: { name: sessionUsername }, loading: false })
    }

    const username = randomName()
    localStorage.setItem(sessionKey, username)
    return setUserSession({ user: { name: username }, loading: false })
  }

  function randomName() {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      length: 3,
      separator: '-',
    })
  }
}
