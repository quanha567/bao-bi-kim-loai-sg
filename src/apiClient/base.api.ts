import { ApiClient } from '@/lib'
import { ApiListResponse } from '@/types/api.type'

export class BaseApi<T> {
    protected client: ApiClient
    protected endpoint: string

    constructor(client: ApiClient, endpoint: string) {
        this.client = client
        this.endpoint = endpoint
    }

    async getAll(): Promise<T[]> {
        const response = await this.client.get<T[]>(this.endpoint)
        return response.data
    }

    async getOne(id: string): Promise<T> {
        const response = await this.client.get<T>(`${this.endpoint}/${id}`)
        return response.data
    }

    async search(query: Record<string, unknown>): Promise<ApiListResponse<T>> {
        const response = await this.client.get<ApiListResponse<T>>(`${this.endpoint}/search`, {
            params: query,
        })
        return response.data
    }

    async create(data: Partial<T>): Promise<T> {
        const response = await this.client.post<T>(this.endpoint, data)
        return response.data
    }

    async update(data: Partial<T>): Promise<T> {
        const response = await this.client.patch<T>(this.endpoint, data)
        return response.data
    }

    async delete(ids: string | string[]): Promise<void> {
        await this.client.delete(this.endpoint, { params: { ids } })
    }
}
