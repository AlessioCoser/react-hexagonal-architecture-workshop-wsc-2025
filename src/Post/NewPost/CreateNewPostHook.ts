import { useMutation } from '@tanstack/react-query'
import type { PostDraft } from '../PostDraft.ts'
import { useState } from 'react'
import { useUserSession } from '../../User/UserSessionHook.ts'
import { createNewPost } from '../../server.ts'

export type NewPost = {
  readonly draft: PostDraft
  readonly updateDraft: (newDraft: PostDraft) => void
  readonly publishDraft: () => Promise<void>
  readonly isCreating?: boolean
}

export const useCreateNewPost = (): NewPost => {
  const { user } = useUserSession()
  const [draft, setDraft] = useState<PostDraft>({ title: '', tags: '', text: '' })
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['create-new-post'],
    mutationFn: (draft: PostDraft) => createNewPost(user, draft),
  })

  return {
    draft: draft,
    updateDraft: newDraft => setDraft(newDraft),
    publishDraft: () => mutateAsync(draft).then(() => setDraft({ title: '', tags: '', text: '' })),
    isCreating: isPending,
  }
}
