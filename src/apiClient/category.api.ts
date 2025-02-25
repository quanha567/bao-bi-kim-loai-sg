import { API_URL } from '@/constants'
import { CategoryModel } from '@/models'

import { apiClient } from './axios'
import { BaseApi } from './base.api'

class CategoryApi extends BaseApi<CategoryModel> {
    constructor() {
        super(apiClient, API_URL.CATEGORIES)
    }
}

export const categoryApi = new CategoryApi()
