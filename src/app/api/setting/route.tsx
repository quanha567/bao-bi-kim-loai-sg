import { NextRequest, NextResponse } from 'next/server'

import { SettingRequestModel } from '@/models'
import { articleService, categoryService, settingService } from '@/services'

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
        const [setting, categories, articles] = await Promise.all([
            settingService.getSetting(),
            categoryService.getAll(),
            articleService.getArticles(0, 10, '', 'createdAt'),
        ])
        return NextResponse.json(
            { setting, categories, articles: articles.articles },
            { status: 200 },
        )
    } catch (error) {
        console.log('🚀 -> GET -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const data = (await req.json()) as SettingRequestModel

    console.log('PATCH  setting:', data)
    try {
        const setting = await settingService.createOrUpdateSetting(data)

        return NextResponse.json(setting, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PATCH -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
