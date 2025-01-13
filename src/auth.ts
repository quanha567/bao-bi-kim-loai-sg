import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { prisma } from '@/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    providers: [Google],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.isAdmin = token.isAdmin
            }

            return session
        },
        async jwt({ token }) {
            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email!,
                },
            })

            token.isAdmin = Boolean(dbUser?.isAdmin)

            return token
        },
    },
    pages: {
        signIn: '/login',
    },
})
