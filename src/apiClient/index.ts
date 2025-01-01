import { API_URL } from '@/constants'
import { ApiClient } from '@/lib'

export const apiClient = new ApiClient(API_URL.BASE_URL)
export * from './category.api'
export * from './product.api'
