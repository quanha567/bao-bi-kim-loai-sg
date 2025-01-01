export interface ApiListResponse<T> {
    data: T[]
    pageIndex: number
    pageSize: number
    totalElements: number
    totalPages: number
}

export type SearchParams = Record<string, unknown>
