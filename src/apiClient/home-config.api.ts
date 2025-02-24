import { API_URL } from '@/constants'
import {
    HomeConfigModel,
    HomeConfigRequestModel,
    ProductModel,
    SettingRequestModel,
} from '@/models'

const apiClient = (await import('./index')).apiClient

import { BaseApi } from './base.api'

export class HomeConfigApi extends BaseApi<HomeConfigRequestModel> {
    constructor() {
        super(apiClient, API_URL.HOME_CONFIG)
    }
    async getOne(): Promise<HomeConfigRequestModel> {
        const response = await this.client.get<HomeConfigRequestModel>(this.endpoint)
        return response.data
    }

    async createOrUpdate(data: HomeConfigModel): Promise<SettingRequestModel> {
        const formData = new FormData()

        const submitData: HomeConfigModel = {
            ...data,
        }

        if (Array.isArray(data.sliders) && data.sliders) {
            data.sliders.forEach((slider) => formData.append('sliders', slider))
            data.sliders = []
        }

        if (Array.isArray(data.customerLogos) && data.customerLogos) {
            data.customerLogos.forEach((customerLogo) =>
                formData.append('customerLogos', customerLogo),
            )
            data.customerLogos = []
        }

        if (Array.isArray(data?.doYouKnows) && data.doYouKnows.length > 0) {
            data.doYouKnows.forEach(({ image }) => formData.append('doYouKnowImages', image || ''))
        }

        if (Array.isArray(data?.extras) && data.extras.length > 0) {
            data.extras.forEach(({ image }) => formData.append('extraImages', image || ''))
        }

        if (Array.isArray(data?.successStories) && data.successStories.length > 0) {
            data.successStories.forEach(({ image }) =>
                formData.append('successStoryImages', image || ''),
            )
        }

        if (Array.isArray(data?.products) && data.products.length > 0) {
            submitData.products = data.products.map((id) => ({ id })) as ProductModel[]
        }

        formData.append('data', JSON.stringify(submitData))

        const response = await this.client.patch<HomeConfigRequestModel>(this.endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return response.data
    }

    async delete(): Promise<void> {
        await this.client.delete(this.endpoint)
    }
}

export const homeConfigApi = new HomeConfigApi()
