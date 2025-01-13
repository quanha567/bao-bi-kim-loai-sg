import { API_URL } from '@/constants'
import { ArticleModel } from '@/models'

import { apiClient } from '.'
import { BaseApi } from './base.api'

export class ArticleApi extends BaseApi<ArticleModel> {
    constructor() {
        super(apiClient, API_URL.ARTICLES)
    }

    async create(data: Partial<ArticleModel>) {
        const formData = new FormData()

        // Append image if it exists and is a Blob
        if (data.thumbnail && data.thumbnail instanceof Blob) {
            formData.append('thumbnail', data.thumbnail)
            delete data.thumbnail // Remove image from the original object
        }

        // Append the rest of the data as a JSON string
        formData.append('data', JSON.stringify(data))

        // Make the API call using FormData
        const response = await this.client.post<ArticleModel>(this.endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        return response.data
    }

    async update(data: Partial<ArticleModel>) {
        const formData = new FormData()

        // Append image if it exists and is a Blob
        if (data.thumbnail && data.thumbnail instanceof Blob) {
            formData.append('thumbnail', data.thumbnail)
            delete data.thumbnail // Remove image from the original object
        }

        // Append the rest of the data as a JSON string
        formData.append('data', JSON.stringify(data))

        // Make the API call using FormData to update the article
        const response = await this.client.patch<ArticleModel>(this.endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        return response.data
    }
}

export const articleApi = new ArticleApi()
