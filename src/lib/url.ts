import { API_URL } from '@/constants'

export const getApiUrl = (path: string) => `${API_URL.BASE_URL}${path}`
