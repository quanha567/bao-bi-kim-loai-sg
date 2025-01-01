import { API_URL } from '@/constants'
import { ProductModel } from '@/models'

import { apiClient } from '.'
import { BaseApi } from './base.api'

class ProductApi extends BaseApi<ProductModel> {
    constructor() {
        super(apiClient, API_URL.PRODUCTS)
    }
}

export const productApi = new ProductApi()
