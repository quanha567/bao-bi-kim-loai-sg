export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|images|icons|scripts).*)'],
}

export { auth as middleware } from '@/auth'
