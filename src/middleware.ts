import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/cart', '/wishlist']

const authRoutes = ['/signin', '/signup', '/register']

export default async function proxy(req: NextRequest) {
    const token = await getToken({ req })
    const { pathname, origin } = req.nextUrl

  
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.next()
        } else {
            const redirectURL = new URL("/signin", origin)
            redirectURL.searchParams.set('url', pathname)
            return NextResponse.redirect(redirectURL)
        }
    }

  
    if (authRoutes.some(route => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL("/", origin))
        } else {
            return NextResponse.next()
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/cart/:path*', '/wishlist/:path*', '/signin', '/signup', '/register']
}