import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/db'
import { categoryService } from '@/services'

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.getAll('ids')
    try {
        if (ids.length === 0) {
            return NextResponse.json({ error: 'Missing ids' }, { status: 400 })
        }

        const category = await categoryService.deleteCategories(ids)
        return NextResponse.json(category, { status: 200 })
    } catch (error) {
        console.log('🚀 -> DELETE -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const categories = await categoryService.getAll()
        return NextResponse.json(categories, { status: 200 })
    } catch (error) {
        console.log('🚀 -> GET -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const { id, name, slug } = await req.json()

    try {
        const category = await prisma.category.update({
            data: {
                name,
                slug,
            },
            where: {
                id,
            },
        })
        return NextResponse.json(category, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PUT -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const { name, slug } = await req.json()
    let validateSlug = slug
    try {
        if (!validateSlug) {
            // Generate slug if not provided
            validateSlug = await categoryService.generateSlug(name)
        }

        // check if slug is already exist
        // while (await categoryService.checkIsExistSlug(validateSlug)) {
        //     validateSlug = `${validateSlug}-${Math.floor(Math.random() * 1000)}`
        // }

        const category = await categoryService.createCategory(name, validateSlug)

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.log('🚀 -> POST -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
