import { useUserSession } from '../User/UserSessionHook.ts'
import { PostsList } from './PostsList/PostsList.tsx'
import { usePostsList } from './PostsList/PostsListHook.ts'

export function Posts() {
  const { loading: isUserLoading } = useUserSession()
  const { isLoading: arePostsLoading, posts } = usePostsList()

  if (isUserLoading) {
    return <></>
  }

  return (
    <article>
      <header>
        <h3>Hexagonal Architecture</h3>
      </header>
      <div>
        <PostsList posts={posts} isLoading={arePostsLoading} />
      </div>
    </article>
  )
}
