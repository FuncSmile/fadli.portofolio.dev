import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const session = request.cookies.get('admin_session')
    const { pathname } = request.nextUrl

    // Proteksi Route Admin
    if (pathname.startsWith('/admin') && !session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Cegah user yang sudah login masuk ke halaman login lagi
    if (pathname === '/login' && session) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}

// Konfigurasi matcher tetap sama
export const config = {
    matcher: ['/admin/:path*', '/login'],
}