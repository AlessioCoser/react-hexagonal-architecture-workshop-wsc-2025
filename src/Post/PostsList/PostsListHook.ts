import { useQuery } from '@tanstack/react-query'
import type { Post } from '../Post.ts'
import { createPostsListAPI, type PostsListAPI } from './PostsListAPI.ts'
import { useUserSession } from '../../User/UserSessionHook.ts'

const postListAPI: PostsListAPI = createPostsListAPI()

export type PostsList = {
  posts: Post[],
  isLoading: boolean,
}

export const usePostsList = (API: PostsListAPI = postListAPI): PostsList => {
  const { user } = useUserSession()
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ['posts-list', user?.name],
    queryFn: () => API.retrieveAllPosts(user),
  })

  return {
    posts: data ?? [],
    isLoading,
  }
}
