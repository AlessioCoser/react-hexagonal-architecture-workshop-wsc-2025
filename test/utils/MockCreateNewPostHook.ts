import { vi } from 'vitest'
import * as toMock from '../../src/Post/NewPost/CreateNewPostHook'

export function mockCreateNewPostHook(obj: Partial<toMock.NewPost> = {}): toMock.NewPost {
  const mocked = {
    draft: { title: '', tags: '', text: '' },
    updateDraft: vi.fn(),
    publishDraft: vi.fn(),
    isCreating: false,
    ...obj,
  }
  vi.spyOn(toMock, 'useCreateNewPost').mockImplementation(() => mocked)
  return mocked
}
