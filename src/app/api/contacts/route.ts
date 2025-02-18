import { NextRequest, NextResponse } from 'next/server'

import { ContactModel } from '@/models'
import { contactService } from '@/services'

export async function POST(req: NextRequest) {
    const data = (await req.json()) as ContactModel

    try {
        const setting = await contactService.createContact(data)

        return NextResponse.json(setting, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PATCH -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

