// pages/api/products/index.ts

import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/db'

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.getAll('ids')
    try {
        const category = await prisma.category.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        })
        return NextResponse.json(category, { status: 200 })
    } catch (error) {
        console.log('🚀 -> DELETE -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
    const pageIndex = parseInt(searchParams.get('pageIndex') || '0', 10) // Default to first page
    const searchText = searchParams.get('searchText') || ''
    const sortBy = searchParams.get('sortBy') || 'id'

    try {
        const skip = pageIndex * pageSize
        const take = pageSize

        const categories = await prisma.category.findMany({
            orderBy: {
                [sortBy]: 'asc', // Default to ascending order
            },
            skip,
            take,
            where: {
                name: {
                    contains: searchText,
                    mode: 'insensitive',
                },
            },
        })
        const total = await prisma.category.count({
            where: {
                name: {
                    contains: searchText,
                    mode: 'insensitive',
                },
            },
        })

        return NextResponse.json(
            {
                data: categories,
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

export async function POST(req: NextRequest) {
    const { name, slug } = await req.json()
    try {
        const category = await prisma.category.create({
            data: {
                name,
                slug,
            },
        })
        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.log('🚀 -> POST -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
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
