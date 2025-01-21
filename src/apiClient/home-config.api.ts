import { API_URL } from '@/constants'
import { HomeConfigModel, HomeConfigRequestModel, SettingRequestModel } from '@/models'

import { apiClient } from '.'
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

        if (Array.isArray(data.sliders) && data.sliders) {
            data.sliders.forEach((slider) => formData.append('sliders', slider))
            data.sliders = []
        }

        formData.append('data', JSON.stringify(data))

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
