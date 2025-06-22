import { Env } from '../../Env'
import { type User } from '../../User/User'
import { type Post } from '../Post'
import { type NetworkError, postRequest } from '../../helpers/http'
import type { PostDraft } from '../PostDraft.ts'

export type CreateNewPostAPIException = 'UNAUTHORIZED' | NetworkError
export type NewPostsAPI = {
  createNewPost(draft: PostDraft, user?: User): Promise<Post>
}

export function createNewPostsAPI(baseUrl: string = Env.backendUrl): NewPostsAPI {
  return {
    async createNewPost(draft: PostDraft, user?: User): Promise<Post> {
      const response = await postRequest(`${baseUrl}/api/posts`, draft, user)
      const body = await response.text()
      if (response.status === 401) throw 'UNAUTHORIZED'
      return JSON.parse(body)
    },
  }
}
