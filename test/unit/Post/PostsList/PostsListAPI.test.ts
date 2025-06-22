import { describe, expect, it } from 'vitest'
import { createNewPostsAPI } from '../../../../src/Post/NewPost/CreateNewPostAPI.ts'
import nock from 'nock'
import type { PostDraft } from '../../../../src/Post/NewPost/PostDraft.ts'
import { createPostsListAPI } from '../../../../src/Post/PostsList/PostsListAPI.ts'
import type { Post } from '../../../../src/Post/Post.ts'

describe('PostListsAPI', () => {
  const BASE_URL = 'http://backend.local'
  const API = createPostsListAPI(BASE_URL)

  it('returns the list of posts on success', async () => {
    const post1 = post({ id: 'uuid-2', author: 'followee-id' })
    const post2 = post({ id: 'uuid-1', author: 'user-id' })
    nock(BASE_URL)
      .get('/api/posts')
      .matchHeader('x-username', 'author')
      .reply(200, [post1, post2])

    const timeline = await API.retrieveAllPosts({ name: 'author' })

    expect(timeline).toStrictEqual([post1, post2])
  })

  it('throws UNAUTHORIZED error when status code is 404', async () => {
    nock(BASE_URL).get('/api/posts').reply(401)

    await expect(() => API.retrieveAllPosts()).rejects.toThrow('UNAUTHORIZED')
  })

  it('throws NETWORK_ERROR when Server is not reachable', async () => {
    nock(BASE_URL).get('/api/posts').replyWithError('some kind of network error')

    await expect(async () => {
      await API.retrieveAllPosts()
    }).rejects.toThrow('NETWORK_ERROR')
  })
})

function post(post: Partial<Post>): Post {
  return {
    id: '199dd5eb-fdea-4472-8baf-81ef7c18a2f2',
    author: 'any-user-id',
    text: 'any text',
    title: 'any title',
    tags: ['any', 'tags'],
    dateTime: 'any-date-time',
    ...post,
  }
}
