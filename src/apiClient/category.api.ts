import { API_URL } from '@/constants'
import { CategoryModel } from '@/models'

const apiClient = (await import('./index')).apiClient

import { BaseApi } from './base.api'

class CategoryApi extends BaseApi<CategoryModel> {
    constructor() {
        super(apiClient, API_URL.CATEGORIES)
    }
}

export const categoryApi = new CategoryApi()
