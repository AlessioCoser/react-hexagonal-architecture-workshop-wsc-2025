import type { Post } from '../Post.ts'
import { Badge } from '../../helpers/Badge/Badge.tsx'

export function PostItem({ post }: { post: Post }) {
  return (
    <article>
      {post.title && (
        <strong>
          {post.title}
          <br />
        </strong>
      )}
      <div>{post.text}</div>
      {post.tags?.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
      <footer>
        <small>{footer()}</small>
      </footer>
    </article>
  )

  function footer() {
    return `${post.author} - ${post.dateTime}`
  }
}
