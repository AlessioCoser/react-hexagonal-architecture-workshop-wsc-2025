import { PostItem } from './PostItem.tsx'
import './PostsList.css'
import type { Post } from '../Post.ts'

type PostsListProps = {
  posts: Post[]
  isLoading: boolean
}

export function PostsList({ posts, isLoading }: PostsListProps) {
  if (posts.length === 0 && !isLoading) {
    return <div className="posts-list empty-list">No posts present.</div>
  }

  return (
    <div className="posts-list">
      <div data-testid="posts-list-loading" className="loading" aria-busy={isLoading}></div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}
