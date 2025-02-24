import { API_URL } from '@/constants'
import { SettingRequestModel } from '@/models'

const apiClient = (await import('./index')).apiClient

import { BaseApi } from './base.api'

export class SettingApi extends BaseApi<SettingRequestModel> {
    constructor() {
        super(apiClient, API_URL.SETTING)
    }
    async getOne(): Promise<SettingRequestModel> {
        const response = await this.client.get<SettingRequestModel>(this.endpoint)
        return response.data
    }

    async createOrUpdate(data: SettingRequestModel): Promise<SettingRequestModel> {
        const response = await this.client.patch<SettingRequestModel>(this.endpoint, data)
        return response.data
    }

    async delete(): Promise<void> {
        await this.client.delete(this.endpoint)
    }
}

export const settingApi = new SettingApi()
