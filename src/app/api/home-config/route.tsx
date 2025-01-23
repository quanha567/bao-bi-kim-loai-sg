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
    console.log('PATCH  dataString:', dataString)

    if (!dataString) {
        throw new Error('Data is missing')
    }

    const data = JSON.parse(dataString as string) as HomeConfigRequestModel
    const sliders = formData.getAll('sliders')
    const doYouKnowImages = formData.getAll('doYouKnowImages')
    const extraImages = formData.getAll('extraImages')
    const successStoryImages = formData.getAll('successStoryImages')
    console.log('PATCH  successStoryImages:', successStoryImages)
    const customerLogos = formData.getAll('customerLogos')

    const dataStore = {
        ...data,
    }

    if (Array.isArray(sliders) && sliders.length > 0) {
        const sliderUploaded = await Promise.all(
            sliders.map((slider) => imageService.uploadImage(slider as File)),
        )

        dataStore.sliders = sliderUploaded.map((slider) => slider.url)
    }

    if (Array.isArray(customerLogos) && customerLogos.length > 0) {
        const customerLogosUploaded = await Promise.all(
            customerLogos.map((logo) => imageService.uploadImage(logo as File)),
        )

        dataStore.customerLogos = customerLogosUploaded.map((logo) => logo.url)
    }

    if (Array.isArray(doYouKnowImages) && doYouKnowImages.length > 0) {
        const doYouKnowImagesUploaded = await Promise.all(
            doYouKnowImages.map((doYouKnowImage) =>
                doYouKnowImage instanceof Blob
                    ? imageService.uploadImage(doYouKnowImage)
                    : doYouKnowImage,
            ),
        )

        dataStore.doYouKnows = JSON.stringify(
            doYouKnowImagesUploaded.map((doYouKnowImage, index) => ({
                ...(typeof dataStore?.doYouKnows?.[index] === 'object'
                    ? dataStore?.doYouKnows?.[index]
                    : {}),
                image: typeof doYouKnowImage === 'object' ? doYouKnowImage.url : doYouKnowImage,
            })),
        )
    } else {
        dataStore.doYouKnows = ''
    }

    if (Array.isArray(extraImages) && extraImages.length > 0) {
        const extraImagesUploaded = await Promise.all(
            extraImages.map((image) =>
                image instanceof Blob ? imageService.uploadImage(image) : image,
            ),
        )

        dataStore.extras = JSON.stringify(
            extraImagesUploaded.map((image, index) => ({
                ...(typeof dataStore?.extras?.[index] === 'object'
                    ? dataStore?.extras?.[index]
                    : {}),
                image: typeof image === 'object' ? image.url : image,
            })),
        )
    } else {
        dataStore.extras = ''
    }

    if (Array.isArray(successStoryImages) && successStoryImages.length > 0) {
        const successStoryImagesUploaded = await Promise.all(
            successStoryImages.map((image) =>
                image instanceof Blob ? imageService.uploadImage(image) : image,
            ),
        )

        dataStore.successStories = JSON.stringify(
            successStoryImagesUploaded.map((image, index) => ({
                ...(typeof dataStore?.successStories?.[index] === 'object'
                    ? dataStore?.successStories?.[index]
                    : {}),
                image: typeof image === 'object' ? image.url : image,
            })),
        )
    } else {
        dataStore.successStories = ''
    }

    try {
        console.log('PATCH  dataStore:', dataStore)
        const homeConfig = await homeConfigService.createOrUpdateHomeConfig(dataStore)

        return NextResponse.json(homeConfig, { status: 200 })
    } catch (error) {
        console.log('🚀 -> PATCH -> error:', error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}
