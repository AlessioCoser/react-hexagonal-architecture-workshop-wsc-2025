import { PostItem } from './PostItem.tsx'
import './PostsList.css'
import { usePostsList } from './PostsListHook.ts'

export function PostsList() {
  const { isLoading, posts } = usePostsList()

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
