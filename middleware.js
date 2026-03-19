import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')

  // CORS headers
  const origin = request.headers.get('origin')
  const allowedOrigins = [
    'https://emonmahmud.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ]

  const response = NextResponse.next()

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: response.headers })
  }

  // Protected routes: everything under /dashboard except /dashboard/login
  if (pathname.startsWith('/dashboard') && !pathname.includes('/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }
  }

  // If already logged in, redirect away from login page
  if (pathname.startsWith('/dashboard/login') && token) {
     return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
