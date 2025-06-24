import { useUserSession } from '../User/UserSessionHook.ts'
import { PostsList } from './PostsList/PostsList.tsx'
import { useModal } from '../helpers/Modal/ModalProvider.tsx'
import { CreateNewPost } from './NewPost/CreateNewPost.tsx'

export function PostsPage() {
  const { open, isClosed } = useModal()
  const { loading: isUserLoading } = useUserSession()

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
        <PostsList key={isClosed ? 'load' : 'reload'} />
      </div>
    </article>
  )

  function openCreateNewPostModal() {
    open({
      title: `Create New Post`,
      content: <CreateNewPost />,
    })
  }
}
