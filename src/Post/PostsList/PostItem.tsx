import type { Post } from '../Post.ts'

export function PostItem({ post }: { post: Post }) {
  return (
    <article>
      {post.title && <strong>{post.title}<br /></strong>}
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
