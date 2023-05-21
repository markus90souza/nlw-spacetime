import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export const memoriesRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      cover_url: z.string(),
      is_public: z.coerce.boolean().default(false),
    })

    const { content, cover_url, is_public } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        cover_url,
        is_public,
        user_id: request.user.sub,
      },
    })

    return memory
  })

  app.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        user_id: request.user.sub,
      },
      orderBy: {
        created_at: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        cover_url: memory.cover_url,
        excerpt: memory.content.substring(0, 120).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.is_public && memory.user_id !== request.user.sub) {
      return reply.status(401).send()
    }

    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const bodySchema = z.object({
      content: z.string(),
      cover_url: z.string(),
      is_public: z.coerce.boolean().default(false),
    })

    const { id } = paramsSchema.parse(request.params)

    const { content, cover_url, is_public } = bodySchema.parse(request.body)

    let memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    })

    if (memory.user_id !== request.user.sub) {
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },

      data: {
        content,
        cover_url,
        is_public,
      },
    })

    return memory
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    })

    if (memory.user_id !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
