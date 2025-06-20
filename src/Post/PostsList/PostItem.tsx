import type { Post } from '../Post.ts'

export function PostItem({ post }: { post: Post }) {
  return (
    <article>
      {post.text}
      <footer>
        <small>{footer()}</small>
      </footer>
    </article>
  )

  function footer() {
    return `${post.author} - ${post.dateTime}`
  }
}
