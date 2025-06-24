import { describe, expect, it } from 'vitest'
import { mockPostsListHook } from '../../../utils/MockPostsListHook.ts'
import { render, screen } from '@testing-library/react'
import { PostsList } from '../../../../src/Post/PostsList/PostsList.tsx'

describe('PostsList', () => {
  it('empty posts', async () => {
    mockPostsListHook({ posts: [], isLoading: false })

    render(<PostsList />)

    expect(screen.getByText('No posts present.')).toBeInTheDocument()
  })

  it('should show the loader while while loading', async () => {
    mockPostsListHook({ posts: [], isLoading: true })

    render(<PostsList />)

    expect(screen.queryByText('No posts present.')).not.toBeInTheDocument()
    expect(screen.queryByTestId('posts-list-loading')).toBeInTheDocument()
  })

  it('should show the older posts while loading', async () => {
    const anOldPost = { id: '1', author: 'user1', text: 'an older post', dateTime: '2021-01-01' }
    mockPostsListHook({ posts: [anOldPost], isLoading: true })

    render(<PostsList />)

    screen.logTestingPlaygroundURL()
    expect(screen.getByText('an older post')).toBeInTheDocument()
    expect(screen.getByText('user1 - 2021-01-01')).toBeInTheDocument()
  })

  it('should show the post list', async () => {
    const secondPost = { id: '2', author: 'user2', text: 'another post', tags: ['tag1'], dateTime: '2021-01-02' }
    const firstPost = { id: '1', author: 'user1', text: 'an old post', tags: ['tag2'], dateTime: '2021-01-01' }
    mockPostsListHook({ posts: [secondPost, firstPost], isLoading: false })

    render(<PostsList />)

    expect(screen.getByText('an old post')).toBeInTheDocument()
    expect(screen.getByText('user1 - 2021-01-01')).toBeInTheDocument()
    expect(screen.getByText('tag1')).toBeInTheDocument()
    expect(screen.getByText('another post')).toBeInTheDocument()
    expect(screen.getByText('user2 - 2021-01-02')).toBeInTheDocument()
    expect(screen.getByText('tag2')).toBeInTheDocument()
  })
})
