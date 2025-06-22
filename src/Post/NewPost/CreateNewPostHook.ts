import { useMutation } from '@tanstack/react-query'
import type { Post } from '../Post.ts'
import type { PostDraft } from '../PostDraft.ts'
import { useState } from 'react'
import type { User } from '../../User/User.ts'
import { useUserSession } from '../../User/UserSessionHook.ts'

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

async function createNewPost(user: User | undefined, draft: PostDraft): Promise<Post> {
  if (user === undefined) {
    return Promise.reject('Unauthorized')
  }

  if(draft.text.includes('waterfall')) {
    return Promise.reject('Inappropriate language detected')
  }
  // TODO: Mocked data, replace with actual API call
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: '1', text: 'Post 1 - Hello World', author: 'user1', dateTime: '2025-01-01' }), 500)
  })
}
