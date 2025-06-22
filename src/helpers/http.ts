import type { User } from '../User/User.ts'

export type NetworkError = 'NETWORK_ERROR'

export async function getRequest(url: string, user?: User) {
  try {
    return await fetch(url, {
      method: 'GET',
      headers: { ...authHeader(user) },
    })
  } catch (e) {
    throw 'NETWORK_ERROR'
  }
}

export async function postRequest(url: string, jsonBody: any, user?: User) {
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { ...authHeader(user) },
      body: JSON.stringify(jsonBody),
    })
  } catch (e) {
    throw 'NETWORK_ERROR'
  }
}

function authHeader(user?: User): Record<string, string> {
  return user?.name ? { 'x-username': user.name } : {}
}
