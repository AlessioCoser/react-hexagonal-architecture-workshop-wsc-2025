import { useUserSession } from '../User/UserSessionHook.ts'
import { PostsList } from './PostsList/PostsList.tsx'
import { usePostsList } from './PostsList/PostsListHook.ts'
import { useModal } from '../helpers/Modal/ModalProvider.tsx'
import { CreateNewPost } from './NewPost/CreateNewPost.tsx'
import { useCreateNewPost } from './NewPost/CreateNewPostHook.ts'

export function PostsPage() {
  const { open } = useModal()
  const { loading: isUserLoading } = useUserSession()
  const { isLoading: arePostsLoading, posts } = usePostsList()

  if (isUserLoading) {
    return <></>
  }

  return (
    <article>
      <header>
        <h3>Hexagonal Architecture</h3>
        <button onClick={openCreateNewPostModal}>New Post</button>
      </header>
      <div>
        <PostsList posts={posts} isLoading={arePostsLoading} />
      </div>
    </article>
  )

  function openCreateNewPostModal() {
    open({
      title: `Create New Post`,
      content: <CreateNewPost />
    })
  }
}
