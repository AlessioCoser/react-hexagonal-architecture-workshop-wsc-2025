import { type User } from './User.ts'
import { useQuery } from '@tanstack/react-query'
import { loadOrGenerateUser } from './UserLoader.ts'

export type UserSession = { user: undefined; loading: true } | { user: User; loading: false }

export const useUserSession = (): UserSession => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => loadOrGenerateUser(),
  })

  return isLoading ? { user: undefined, loading: true } : { user: user!, loading: false }
}
