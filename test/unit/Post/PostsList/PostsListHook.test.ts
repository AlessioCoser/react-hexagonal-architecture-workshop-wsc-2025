import { describe, expect, it } from 'vitest'
import { wrapWithQuery } from '../../../utils/rendeHelpers.tsx'
import { renderHook, waitFor } from '@testing-library/react'
import { usePostsList } from '../../../../src/Post/PostsList/PostsListHook.ts'
import type { Post } from '../../../../src/Post/Post.ts'
import { mockPostsListAPI } from '../../../utils/MockPostsListAPI.ts'

describe('PostsListHook', () => {
  const firstPost: Post = { id: '1', author: 'a1', text: 't1', dateTime: 'd1' }
  const secondPost = { id: '2', author: 'a2', text: 't2', dateTime: 'd2' }

  it('should load the posts list', async () => {
    const api = mockPostsListAPI({ retrieveAllPosts: () => Promise.resolve([firstPost, secondPost]) })
    const { result } = renderHook(() => usePostsList(api), wrapWithQuery())

    expect(result.current.posts).toStrictEqual([])
    expect(result.current.isLoading).toBeTruthy()

    await waitFor(() => expect(result.current.posts).toStrictEqual([firstPost, secondPost]))
    await waitFor(() => expect(result.current.isLoading).toBeFalsy())
  })
})
