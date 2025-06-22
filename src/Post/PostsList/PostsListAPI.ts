import type { User } from '../../User/User.ts'
import type { Post } from '../Post.ts'
import { getRequest } from '../../helpers/http.ts'
import { Env } from '../../Env.ts'

export type PostsListAPI = {
  retrieveAllPosts(user?: User): Promise<Post[]>
}

export function createPostsListAPI(baseUrl: string = Env.backendUrl): PostsListAPI {
  return {
    async retrieveAllPosts(user?: User): Promise<Post[]> {
      const response = await getRequest(`${baseUrl}/api/posts`, user)
      if (response.status === 401) throw 'UNAUTHORIZED'
      const responseBody = await response.json()

      return responseBody.map((post: Post) => ({
        id: post.id,
        author: post.author,
        title: post.title,
        text: post.text,
        tags: post.tags,
        dateTime: post.dateTime,
      }))
    },
  }
}
