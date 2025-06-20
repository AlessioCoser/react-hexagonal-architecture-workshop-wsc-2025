import { useUserSession } from '../User/UserSessionHook.ts'
import { PostsList } from './PostsList/PostsList.tsx'
import { usePostsList } from './PostsList/PostsListHook.tsx'

export function Posts() {
  const { loading } = useUserSession()
  const { posts, isLoading } = usePostsList()

  if (loading) {
    return <></>
  }

  return (
    <article>
      <header>
        <h3>Hexagonal Architecture</h3>
      </header>
      <div>
        <PostsList posts={posts} isLoading={isLoading} />
      </div>
    </article>
  )
}
