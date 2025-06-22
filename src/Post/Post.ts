export type Post = {
  readonly id: string
  readonly author: string
  readonly title?: string
  readonly text: string
  readonly tags?: string[]
  readonly dateTime: string
}
