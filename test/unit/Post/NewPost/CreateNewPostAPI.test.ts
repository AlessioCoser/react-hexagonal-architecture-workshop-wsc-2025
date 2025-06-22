import { describe, expect, it } from 'vitest'
import { createNewPostsAPI } from '../../../../src/Post/NewPost/CreateNewPostAPI.ts'
import nock from 'nock'
import type { PostDraft } from '../../../../src/Post/NewPost/PostDraft.ts'

describe('CreateNewPostsAPI', () => {
  const BASE_URL = 'http://backend.local'
  const API = createNewPostsAPI(BASE_URL)

  it('returns the created post on success', async () => {
    nock(BASE_URL)
      .post('/api/posts', { title: 'title', tags: 'created, tags', text: 'text' })
      .matchHeader('x-username', 'author')
      .reply(200, {
        id: '1',
        text: 'text',
        tags: ['created', 'tags'],
        title: 'title',
        author: 'author',
        dateTime: '2021-09-01T00:00:00Z',
      })

    const createdPost = await API.createNewPost(
      {
        title: 'title',
        tags: 'created, tags',
        text: 'text',
      },
      { name: 'author' }
    )

    expect(createdPost).toStrictEqual({
      id: '1',
      text: 'text',
      tags: ['created', 'tags'],
      title: 'title',
      author: 'author',
      dateTime: '2021-09-01T00:00:00Z',
    })
  })

  it('throws UNAUTHORIZED error when status code is 404', async () => {
    nock(BASE_URL).post('/api/posts').reply(401)

    await expect(() => API.createNewPost({} as PostDraft)).rejects.toThrow('UNAUTHORIZED')
  })

  it('throws NETWORK_ERROR when Server is not reachable', async () => {
    nock(BASE_URL).post('/api/posts').replyWithError('some kind of network error')

    await expect(async () => {
      await API.createNewPost({} as PostDraft)
    }).rejects.toThrow('NETWORK_ERROR')
  })
})
