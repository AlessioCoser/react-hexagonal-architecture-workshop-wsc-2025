import type { Post } from './Post/Post.ts'
import type { PostDraft } from './Post/NewPost/PostDraft.ts'
import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Username',
}

const posts: Post[] = []

function retrieveAllPosts(): Post[] {
  return posts
}

function createNewPost(userName: string, draft: PostDraft): Post {
  const newPost = {
    id: String(posts.length + 1),
    text: draft.text,
    tags: draft.tags ? draft.tags.split(',').map(tag => tag.trim()) : undefined,
    title: draft.title,
    author: userName,
    dateTime: new Date().toISOString(),
  }
  posts.push(newPost)
  return newPost
}

async function validateUsername(request: FastifyRequest, reply: FastifyReply) {
  const username = request.headers['x-username'] as string

  if (!username) {
    return reply.code(401).send({ error: 'Unauthorized - Username header is required' })
  }
}

function checkInappropriateFields(draft: PostDraft): string[] {
  const fields: (keyof PostDraft)[] = ['title', 'text', 'tags']
  return fields.filter(field => INAPPROPRIATE_LANGUAGE.some(word => draft[field].toLowerCase().includes(word)))
}

function routes(fastify: FastifyInstance) {
  fastify.get('/health', () => ({ status: 'ok' }))
  fastify.get('/api/posts', { preHandler: validateUsername }, retrieveAllPosts)
  fastify.post('/api/posts', { preHandler: validateUsername }, (request, reply) => {
    const username = request.headers['x-username'] as string
    const draft = JSON.parse(request.body as string) as PostDraft
    const inappropriateFields = checkInappropriateFields(draft)

    if (inappropriateFields.length > 0) {
      return reply.code(400).send({ error: 'Inappropriate language detected', fields: inappropriateFields })
    }

    reply.code(201).send(createNewPost(username, draft))
  })
  fastify.addHook('onRequest', (request, reply, done) => {
    reply.headers(corsHeaders)
    if (request.method === 'OPTIONS') return reply.code(204).send()
    done()
  })
}

const startServer = async () => {
  const fastify = Fastify({ logger: true })
  try {
    routes(fastify)
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

startServer().then(() => console.log('Server started'))

const INAPPROPRIATE_LANGUAGE = [
  'spaghetti',
  'code-smell',
  'smell',
  'hack',
  'quick and dirty',
  'workaround',
  'kludge',
  'hardcoded',
  'magic number',
  'copy-paste',
  'anti-pattern',
  'legacy',
  'fragile',
  'unmaintainable',
  'messy',
  'monolithic',
  'god object',
  'tightly coupled',
  'dirty fix',
  'technical debt',
]
