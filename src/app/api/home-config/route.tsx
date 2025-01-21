import { NextRequest, NextResponse } from 'next/server'

import { HomeConfigRequestModel } from '@/models'
import { imageService } from '@/services'
import { homeConfigService } from '@/services/home-config.service'

export async function DELETE() {
    try {
        const setting = await homeConfigService.deleteSetting()
        return NextResponse.json(setting, { status: 200 })
    } catch (error) {
        console.log('🚀 -> DELETE -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const setting = await homeConfigService.getHomeConfig()
        return NextResponse.json(setting, { status: 200 })
    } catch (error) {
        console.log('🚀 -> GET -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const formData = await req.formData()
    const dataString = formData.get('data')

    if (!dataString) {
        throw new Error('Data is missing')
    }

    const data = JSON.parse(dataString as string) as HomeConfigRequestModel
    const sliders = formData.getAll('sliders')

    const dataStore = {
        ...data,
    }

    if (Array.isArray(sliders) && sliders) {
        const sliderUploaded = await Promise.all(
            sliders.map((slider) => imageService.uploadImage(slider as File)),
        )

        dataStore.sliders = sliderUploaded.map((slider) => slider.url)
    }

    try {
        const homeConfig = await homeConfigService.createOrUpdateHomeConfig(dataStore)

        return NextResponse.json(homeConfig, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PATCH -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
