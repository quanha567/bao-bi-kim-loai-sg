import { NextRequest, NextResponse } from 'next/server'

import { articleService } from '@/services'

export async function GET(_req: NextRequest, context: any) {
    const id = (await context.params).id!

    try {
        const articles = id.match(/^[0-9a-fA-F]{24}$/)
            ? await articleService.getArticle(id)
            : await articleService.getBySlug(id)

        if (!articles) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 })
        }

        return NextResponse.json(articles, { status: 200 })
    } catch (error) {
        console.log('🚀 -> GET -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
