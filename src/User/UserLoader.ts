import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator'
import type { User } from './User.ts'

export async function loadOrGenerateUser(nameGenerator: () => Promise<string> = randomName): Promise<User> {
  const sessionKey = 'anonChatUserName'
  const sessionUsername = localStorage.getItem(sessionKey)

  if (sessionUsername) {
    return { name: sessionUsername }
  }

  const username = await nameGenerator()
  localStorage.setItem(sessionKey, username)
  return { name: username }
}

function randomName() {
  return Promise.resolve(
    uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      length: 3,
      separator: '-',
    })
  )
}
