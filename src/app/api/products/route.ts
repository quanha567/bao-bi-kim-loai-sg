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

        const product = await productService.deleteProducts(ids)
        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        console.log('🚀 -> DELETE -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const formData = await req.formData()
    const data = formData.get('data')
    const image = formData.get('image')
    const imageHover = formData.get('imageHover')

    if (!data) {
        return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const productData = JSON.parse(data as string) as ProductModel
    const { name, slug } = productData

    let validateSlug = slug

    try {
        if (!validateSlug) {
            validateSlug = await categoryService.generateSlug(name)
        }

        productData.slug = validateSlug

        // Start image uploads in parallel
        const imageUploadPromises: Promise<any>[] = []
        if (image) {
            imageUploadPromises.push(imageService.uploadImage(image as File))
        }
        if (imageHover) {
            imageUploadPromises.push(imageService.uploadImage(imageHover as File))
        }

        // Wait for all uploads
        const [imageResponse, imageHoverResponse] = await Promise.all(imageUploadPromises)

        // Update productData with uploaded image URLs
        if (imageResponse) productData.image = imageResponse.url
        if (imageHoverResponse) productData.imageHover = imageHoverResponse.url

        const product = await productService.updateProduct(productData)
        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        console.error('🚀 -> POST -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const data = formData.get('data')
    const image = formData.get('image')
    const imageHover = formData.get('imageHover')

    if (!data) {
        return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const productData = JSON.parse(data as string) as ProductModel
    const { name, slug } = productData

    let validateSlug = slug

    try {
        if (!validateSlug) {
            validateSlug = await categoryService.generateSlug(name)
        }

        productData.slug = validateSlug

        // Start image uploads in parallel
        const imageUploadPromises: Promise<any>[] = []
        if (image) {
            imageUploadPromises.push(imageService.uploadImage(image as File))
        }
        if (imageHover) {
            imageUploadPromises.push(imageService.uploadImage(imageHover as File))
        }

        // Wait for all uploads
        const [imageResponse, imageHoverResponse] = await Promise.all(imageUploadPromises)

        // Update productData with uploaded image URLs
        if (imageResponse) productData.image = imageResponse.url
        if (imageHoverResponse) productData.imageHover = imageHoverResponse.url

        const product = await productService.createProduct(productData)
        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.error('🚀 -> POST -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
