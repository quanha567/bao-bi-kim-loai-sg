import { NextRequest, NextResponse } from 'next/server'

import { productService } from '@/services'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
    const pageIndex = parseInt(searchParams.get('pageIndex') || '0', 10) // Default to first page
    const searchText = searchParams.get('searchText') || ''
    const sortBy = searchParams.get('sortBy') || 'id'
    const slug = searchParams.get('slug') || ''

    try {
        const { products, total } = await productService.getProducts(
            pageIndex,
            pageSize,
            searchText,
            sortBy,
            slug,
        )

        return NextResponse.json(
            {
                data: products,
                pageIndex,
                pageSize,
                totalElements: total,
                totalPages: Math.ceil(total / pageSize),
            },
            {
                status: 200,
            },
        )
    } catch (error) {
        console.log('🚀 -> GET -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
