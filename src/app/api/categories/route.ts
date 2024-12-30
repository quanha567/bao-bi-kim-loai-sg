// pages/api/products/index.ts

import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/db'

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
                OR: [
                    {
                        name: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        })
        const total = await prisma.category.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                ],
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
        console.error('Error fetching categories:', error)
        return NextResponse.json(
            { error: 'Error fetching categories' },
            {
                status: 500,
            },
        )
    }
}
