import type { Post } from './Post/Post.ts'
import type { User } from './User/User.ts'
import type { PostDraft } from './Post/PostDraft.ts'

const posts: Post[] = []

export async function retrieveAllPosts(): Promise<Post[]> {
  return posts
}

export async function createNewPost(user: User | undefined, draft: PostDraft): Promise<Post> {
  if (user === undefined) {
    return Promise.reject('Unauthorized')
  }

  if(draft.text.includes('waterfall')) {
    return Promise.reject('Inappropriate language detected')
  }

  const newPost = {
    id: String(posts.length + 1),
    text: draft.text,
    tags: draft.tags.split(',').map(tag => tag.trim()),
    title: draft.title,
    author: user.name,
    dateTime: new Date().toISOString(),
  }

  posts.push(newPost)

  return new Promise(resolve => setTimeout(() => resolve(newPost), 500))
}
