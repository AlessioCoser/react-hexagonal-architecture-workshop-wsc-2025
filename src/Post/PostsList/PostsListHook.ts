import { useQuery } from '@tanstack/react-query'
import type { Post } from '../Post.ts'

export const usePostsList = () => {
  const {
    refetch: update,
    data: posts,
    isLoading,
  } = useQuery<Post[]>({
    queryKey: ['posts-list'],
    queryFn: () => retrieveAllPosts(),
  })

  return {
    posts: posts ?? [],
    update,
    isLoading,
  }
}

async function retrieveAllPosts(): Promise<Post[]> {
  return [{ id: '1', text: 'Post 1 - Hello World', author: 'user1', dateTime: '2025-01-01' }] // TODO: Mocked data, replace with actual API call
}
