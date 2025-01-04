import { API_URL } from '@/constants'
import { SettingModel } from '@/models'

import { apiClient } from '.'
import { BaseApi } from './base.api'

export class SettingApi extends BaseApi<SettingModel> {
    constructor() {
        super(apiClient, API_URL.SETTING)
    }
    async getOne(): Promise<SettingModel> {
        const response = await this.client.get<SettingModel>(this.endpoint)
        return response.data
    }

    async createOrUpdate(data: SettingModel): Promise<SettingModel> {
        const response = await this.client.patch<SettingModel>(this.endpoint, data)
        return response.data
    }

    async delete(): Promise<void> {
        await this.client.delete(this.endpoint)
    }
}

export const settingApi = new SettingApi()
