import { NextResponse } from 'next/server'

import { adminAccountService } from '@/services'

export async function GET() {
    try {
        const adminAccounts = await adminAccountService.search()
        return NextResponse.json(adminAccounts, { status: 200 })
    } catch (err) {
        console.log('GET  err:', err)
    }
}
