import { NextRequest, NextResponse } from 'next/server'

const githubOAuthUrl = 'https://github.com/login/oauth/authorize?client_id='

const url = `${githubOAuthUrl}${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(url, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=60;`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
