import { API_URL } from '@/constants'
import { AdminAccountModel } from '@/models'

import ApiClient, { apiClient } from './axios'
import { BaseApi } from './base.api'

export class AdminAccountClass extends BaseApi<AdminAccountModel> {
    constructor(client: ApiClient) {
        super(client, API_URL.ADMIN)
    }
}

export const adminAccountApi = new AdminAccountClass(apiClient)
