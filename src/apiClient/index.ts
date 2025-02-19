import { API_URL } from '@/constants'
import { ApiClient } from '@/lib'

export const apiClient = new ApiClient(API_URL.BASE_URL)
export * from './article.api'
export * from './category.api'
export * from './contact.api'
export * from './home-config.api'
export * from './page.api'
export * from './product.api'
export * from './setting.api'
