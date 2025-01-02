import { NextRequest, NextResponse } from 'next/server'

import { ProductModel } from '@/models'
import { categoryService, imageService, productService } from '@/services'

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.getAll('ids')

    try {
        if (ids.length === 0) {
            return NextResponse.json({ error: 'Missing ids' }, { status: 400 })
        }

        const category = await productService.deleteProducts(ids)
        return NextResponse.json(category, { status: 200 })
    } catch (error) {
        console.log('🚀 -> DELETE -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const data = (await req.json()) as ProductModel

    try {
        const category = await productService.updateProduct(data)

        return NextResponse.json(category, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PUT -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const data = formData.get('data')
    const file = formData.get('file')

    if (!data) {
        return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const productData = JSON.parse(data as string) as ProductModel

    const { name, slug } = productData

    let validateSlug = slug

    try {
        if (!validateSlug) {
            // Generate slug if not provided
            validateSlug = await categoryService.generateSlug(name)
        }

        if (file) {
            const imageResponse = await imageService.uploadImage(file as File)
            productData.image = imageResponse.url
        }

        productData.slug = validateSlug
        const category = await productService.createProduct(productData)

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.log('🚀 -> POST -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
