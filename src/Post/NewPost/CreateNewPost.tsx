import { useRef, useState } from 'react'
import { useCreateNewPost } from './CreateNewPostHook.ts'
import { useModal } from '../../helpers/Modal/ModalProvider.tsx'

export function CreateNewPost() {
  const { close } = useModal()
  const { draft, updateDraft, publishDraft, isCreating } = useCreateNewPost()
  const postTitle = useRef<HTMLInputElement>(null)
  const [errorToShow, setErrorToShow] = useState<string | undefined>(undefined) // TODO error types

  return (
    <form>
      <fieldset>
        <label>
          Title
          <input
            type="text"
            name="title"
            ref={postTitle}
            value={draft.title}
            onChange={onTitleChange}
            placeholder="Title"
          />
        </label>
        <label>
          Tags
          <input
            type="text"
            name="tags"
            value={draft.tags}
            onChange={onTagsChange}
            placeholder="Tags comma separated"
          />
        </label>
        <label>
          Text
          <textarea name="text" value={draft.text} onChange={onTextChange} placeholder="Your text..."></textarea>
        </label>
      </fieldset>
      <button type="submit" onClick={createPost} disabled={cannotCreatePost()} aria-busy={isCreating}>
        Create
      </button>
      {errorToShow && (
        <article data-testid="create-new-post-error" className="error-message">
          {errorToShow}
        </article>
      )}
    </form>
  )

  function cannotCreatePost() {
    return isCreating || !draft.text.trim() || !draft.title.trim() || !draft.tags.trim()
  }

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateDraft({ ...draft, title: e.target.value })
    setErrorToShow(undefined)
  }

  function onTagsChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateDraft({ ...draft, tags: e.target.value })
    setErrorToShow(undefined)
  }

  function onTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    updateDraft({ ...draft, text: e.target.value })
    setErrorToShow(undefined)
  }

  async function createPost(e: React.MouseEvent) {
    e.preventDefault()
    try {
      await publishDraft()
      close()
    } catch (err) {
      updateErrorToShow(err as string)
    }
  }

  function updateErrorToShow(error: string) {
    setErrorToShow(error)
    postTitle.current?.focus()
  }
}
