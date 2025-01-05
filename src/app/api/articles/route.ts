import { NextRequest, NextResponse } from 'next/server'

import { ArticleModel } from '@/models'
import { articleService, imageService } from '@/services'

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.getAll('ids')

    try {
        if (ids.length === 0) {
            return NextResponse.json({ error: 'Missing ids' }, { status: 400 })
        }

        const articles = await articleService.deleteArticles(ids)
        return NextResponse.json(articles, { status: 200 })
    } catch (error) {
        console.log('🚀 -> DELETE -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const data = (await req.json()) as ArticleModel

    try {
        const article = await articleService.updateArticle(data)

        return NextResponse.json(article, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PUT -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const data = formData.get('data')
    const thumbnail = formData.get('thumbnail')

    if (!data) {
        return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const articleData = JSON.parse(data as string) as ArticleModel

    const { title, slug } = articleData

    let validateSlug = slug

    try {
        if (!validateSlug) {
            // Generate slug if not provided
            validateSlug = await articleService.generateSlug(title)
        }

        if (thumbnail) {
            const imageResponse = await imageService.uploadImage(thumbnail as File)
            articleData.thumbnail = imageResponse.url
        }

        articleData.slug = validateSlug
        const article = await articleService.createArticle(articleData)

        return NextResponse.json(article, { status: 201 })
    } catch (error) {
        console.log('🚀 -> POST -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
