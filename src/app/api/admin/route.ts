import { NextRequest, NextResponse } from 'next/server'

import { generateSalt, hashPassword } from '@/lib'
import { AdminAccountCreateRequestModel } from '@/models'
import { adminAccountService } from '@/services'

export async function GET() {
    try {
        const adminAccounts = await adminAccountService.search()
        return NextResponse.json(adminAccounts, { status: 200 })
    } catch (err) {
        console.log('GET  err:', err)
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as AdminAccountCreateRequestModel

        if (!data.email || !data.password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
        }

        const isExistingAccount = await adminAccountService.findByEmail(data.email)

        if (isExistingAccount) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
        }

        const passwordSalt = generateSalt()
        const passwordHash = hashPassword(data.password, passwordSalt)

        const account = await adminAccountService.create({
            ...data,
            passwordHash,
            salt: passwordSalt,
        })

        return NextResponse.json(account, { status: 201 })
    } catch (error) {
        console.log('POST  error:', error)
    }
}
