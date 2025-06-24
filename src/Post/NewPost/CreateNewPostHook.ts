import { useMutation } from '@tanstack/react-query'
import type { PostDraft } from './PostDraft.ts'
import { useState } from 'react'
import { useUserSession } from '../../User/UserSessionHook.ts'
import { type CreateNewPostAPIException, createNewPostsAPI, type NewPostsAPI } from './CreateNewPostAPI.ts'

export type NewPost = {
  readonly draft: PostDraft
  readonly updateDraft: (newDraft: PostDraft) => void
  readonly publishDraft: () => Promise<void>
  readonly isCreating: boolean
}

const newPostsAPI = createNewPostsAPI()

export const useCreateNewPost = (API: NewPostsAPI = newPostsAPI): NewPost => {
  const { user } = useUserSession()
  const [draft, setDraft] = useState<PostDraft>({ title: '', tags: '', text: '' })
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['create-new-post'],
    mutationFn: (draft: PostDraft) => API.createNewPost(draft, user),
  })

  return {
    draft: draft,
    updateDraft: newDraft => setDraft(newDraft),
    publishDraft: () =>
      mutateAsync(draft)
        .then(() => setDraft({ title: '', tags: '', text: '' }))
        .catch((error) => Promise.reject(mapToErrorMessage(error))),
    isCreating: isPending,
  }

  function mapToErrorMessage(error: CreateNewPostAPIException): string {
    switch (error) {
      case 'UNAUTHORIZED':
        return 'User not found'
      case 'NETWORK_ERROR':
        return 'Network error'
      default:
        return 'An unexpected error occurred'
    }
  }
}
