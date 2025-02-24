import { API_URL } from '@/constants'
import { ProductModel } from '@/models'

const apiClient = (await import('./index')).apiClient

import { BaseApi } from './base.api'

class ProductApi extends BaseApi<ProductModel> {
    constructor() {
        super(apiClient, API_URL.PRODUCTS)
    }

    async create(data: Partial<ProductModel>): Promise<ProductModel> {
        const formData = new FormData()

        // Append image if it exists and is a Blob
        if (data.image && data.image instanceof Blob) {
            formData.append('image', data.image)
            delete data.image // Remove image from the original object
        }

        if (data.imageHover && data.imageHover instanceof Blob) {
            formData.append('imageHover', data.imageHover)
            delete data.imageHover // Remove image from the original object
        }

        // Append the rest of the data as a JSON string
        formData.append('data', JSON.stringify(data))

        // Make the API call using FormData
        const response = await this.client.post<ProductModel>(this.endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        return response.data
    }

    async update(data: Partial<ProductModel>): Promise<ProductModel> {
        const formData = new FormData()

        // Append image if it exists and is a Blob
        if (data.image && data.image instanceof Blob) {
            formData.append('image', data.image)
            delete data.image // Remove image from the original object
        }

        if (data.imageHover && data.imageHover instanceof Blob) {
            formData.append('imageHover', data.imageHover)
            delete data.imageHover // Remove image from the original object
        }

        // Append the rest of the data as a JSON string
        formData.append('data', JSON.stringify(data))

        // Make the API call using FormData
        const response = await this.client.patch<ProductModel>(this.endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        return response.data
    }
}

export const productApi = new ProductApi()
