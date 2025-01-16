import { NextRequest, NextResponse } from 'next/server'

import { SettingModel } from '@/models'
import { settingService } from '@/services'

export async function DELETE() {
    try {
        const setting = await settingService.deleteSetting()
        return NextResponse.json(setting, { status: 200 })
    } catch (error) {
        console.log('🚀 -> DELETE -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const setting = await settingService.getSetting()
        return NextResponse.json(setting, { status: 200 })
    } catch (error) {
        console.log('🚀 -> GET -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const data = (await req.json()) as SettingModel
    console.log('PATCH  data:', data)

    try {
        const setting = await settingService.createOrUpdateSetting(data)

        return NextResponse.json(setting, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PATCH -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
