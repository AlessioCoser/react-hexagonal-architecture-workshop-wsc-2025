import { useQuery } from '@tanstack/react-query'
import type { Post } from '../Post.ts'
import { retrieveAllPosts } from '../../server.ts'

export const usePostsList = () => {
  const { refetch, data, isLoading } = useQuery<Post[]>({
    queryKey: ['posts-list'],
    queryFn: () => retrieveAllPosts(),
  })

  return {
    posts: data ?? [],
    update: () => refetch(),
    isLoading,
  }
}
