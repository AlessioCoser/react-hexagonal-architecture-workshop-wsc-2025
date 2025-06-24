import { vi } from 'vitest'
import type { NewPostsAPI } from '../../src/Post/NewPost/CreateNewPostAPI.ts'

export function mockCreateNewPostAPI(obj: Partial<NewPostsAPI> = {}): NewPostsAPI {
  return {
    createNewPost: vi.fn(() =>
      Promise.resolve({
        id: 'p-id',
        author: 'a-id',
        title: 'title',
        text: 'text',
        tags: ['tag1', 'tag2'],
        dateTime: '2025-06-27',
      })
    ),
    ...obj,
  }
}
