import { NextRequest, NextResponse } from 'next/server'

import { contactService } from '@/services'

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)

    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
    const pageIndex = parseInt(searchParams.get('pageIndex') || '0', 10) // Default to first page
    const searchText = searchParams.get('searchText') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'

    try {
        const { contacts, total } = await contactService.searchContacts({
            pageIndex,
            pageSize,
            searchText,
            sortBy,
        })

        return NextResponse.json(
            {
                data: contacts,
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
