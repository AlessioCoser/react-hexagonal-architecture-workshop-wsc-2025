import { vi } from 'vitest'
import * as toMock from '../../src/Post/PostsList/PostsListHook'

export function mockPostsListHook(obj: Partial<toMock.PostsList> = {}): toMock.PostsList {
  const mocked = {
    posts: [],
    isLoading: false,
    ...obj,
  }
  vi.spyOn(toMock, 'usePostsList').mockImplementation(() => mocked)
  return mocked
}
