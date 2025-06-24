import { beforeEach, describe, expect, it } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { mockCreateNewPostAPI } from '../../../utils/MockCreateNewPostAPI.ts'
import { useCreateNewPost } from '../../../../src/Post/NewPost/CreateNewPostHook.ts'
import { mockUseUserSession } from '../../../utils/MockUseUserSessionHook.ts'
import { wrapWithQuery } from '../../../utils/rendeHelpers.tsx'

describe('CreateNewPostHook', () => {
  const emptyDraft = { title: '', tags: '', text: '' }
  const aDraft = { title: 'upd', tags: 'upd', text: 'upd' }

  beforeEach(() => {
    mockUseUserSession()
  })

  it('empty draft at the beginning', async () => {
    const api = mockCreateNewPostAPI()
    const { result } = renderHook(() => useCreateNewPost(api), wrapWithQuery())

    expect(result.current.draft).toStrictEqual(emptyDraft)
  })

  it('should keep the draft state', async () => {
    const api = mockCreateNewPostAPI()
    const { result } = renderHook(() => useCreateNewPost(api), wrapWithQuery())

    act(() => result.current.updateDraft(aDraft))

    expect(result.current.draft).toStrictEqual(aDraft)
  })

  it('should call the create new post API correctly and reset the draft', async () => {
    mockUseUserSession({ user: { name: 'name' }, loading: false })
    const api = mockCreateNewPostAPI()
    const { result } = renderHook(() => useCreateNewPost(api), wrapWithQuery())
    act(() => result.current.updateDraft(aDraft))

    await act(() => result.current.publishDraft())

    await waitFor(() => expect(api.createNewPost).toHaveBeenCalledWith(aDraft, { name: 'name' }))
    await waitFor(() => expect(result.current.draft).toStrictEqual(emptyDraft))
  })

  it('should handle UNAUTHORIZED error', async () => {
    const api = mockCreateNewPostAPI({ createNewPost: () => Promise.reject('UNAUTHORIZED') })
    const { result } = renderHook(() => useCreateNewPost(api), wrapWithQuery())

    const response = result.current.publishDraft()

    await expect(() => response).rejects.toThrow('User not found')
  })

  it('should handle NETWORK_ERROR error', async () => {
    const api = mockCreateNewPostAPI({ createNewPost: () => Promise.reject('NETWORK_ERROR') })
    const { result } = renderHook(() => useCreateNewPost(api), wrapWithQuery())

    const response = result.current.publishDraft()

    await expect(() => response).rejects.toThrow('Network error')
  })

  it('should handle as generic error any other unhandled error', async () => {
    const api = mockCreateNewPostAPI({ createNewPost: () => Promise.reject('any other error') })
    const { result } = renderHook(() => useCreateNewPost(api), wrapWithQuery())

    const response = result.current.publishDraft()

    await expect(() => response).rejects.toThrow('An unexpected error occurred')
  })
})
