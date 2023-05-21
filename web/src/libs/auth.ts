import { cookies } from 'next/headers'

import decode from 'jwt-decode'
interface User {
  sub: string
  name: string
  avatar_url: string
}

export const getUser = () => {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('unathorized')
  }

  const user: User = decode(token)

  return user
}
