import { vi } from 'vitest'
import type { NewPostsAPI } from '../../src/Post/NewPost/CreateNewPostAPI.ts'
import type { PostsListAPI } from '../../src/Post/PostsList/PostsListAPI.ts'

export function mockPostsListAPI(obj: Partial<PostsListAPI> = {}): PostsListAPI {
  return {
    retrieveAllPosts: vi.fn(() => Promise.resolve([])),
    ...obj,
  }
}
