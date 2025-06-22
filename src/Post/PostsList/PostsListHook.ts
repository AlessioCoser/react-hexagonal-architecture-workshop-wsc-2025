import { useQuery } from '@tanstack/react-query'
import type { Post } from '../Post.ts'
import { createPostsListAPI, type PostsListAPI } from './PostsListAPI.ts'
import { useUserSession } from '../../User/UserSessionHook.ts'

const postListAPI: PostsListAPI = createPostsListAPI()

export const usePostsList = (API: PostsListAPI = postListAPI) => {
  const { user } = useUserSession()
  const { refetch, data, isLoading } = useQuery<Post[]>({
    queryKey: ['posts-list'],
    queryFn: () => API.retrieveAllPosts(user),
  })

  return {
    posts: data ?? [],
    update: () => refetch(),
    isLoading,
  }
}
