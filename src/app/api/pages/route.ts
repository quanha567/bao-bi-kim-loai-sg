import { NextRequest, NextResponse } from 'next/server'
import { URL } from 'url'

import { PageModel } from '@/models'
import { pageService } from '@/services'

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.getAll('ids')

    try {
        if (ids.length === 0) {
            return NextResponse.json({ error: 'Missing ids' }, { status: 400 })
        }

        const page = await pageService.deletePages(ids)
        return NextResponse.json(page, { status: 200 })
    } catch (error) {
        console.log('🚀 -> DELETE -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const pages = await pageService.getAll()
        return NextResponse.json(pages, { status: 200 })
    } catch (error) {
        console.log('🚀 -> GET -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const data = (await req.json()) as PageModel

    try {
        const page = await pageService.updatePage(data)
        return NextResponse.json(page, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PATCH -> error:', error)

        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const data = (await req.json()) as PageModel

    try {
        const page = await pageService.createPage(data)
        return NextResponse.json(page, { status: 201 })
    } catch (error) {
        console.log('🚀 -> POST -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
