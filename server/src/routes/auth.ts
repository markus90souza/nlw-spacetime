import { FastifyInstance } from 'fastify'

import { z } from 'zod'

import axios from 'axios'
import { prisma } from '../lib/prisma'

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/authorize', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SICRET,
          code,
        },

        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    console.log(access_token)

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const responseSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userData = responseSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        github_id: userData.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: userData.name,
          github_id: userData.id,
          login: userData.login,
          avatar_url: userData.avatar_url,
        },
      })
    }

    return {
      user,
    }
  })
}
