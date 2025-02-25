import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

import { API_URL } from '@/constants'

export default class ApiClient {
    private axios: AxiosInstance

    constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
        this.axios = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                ...defaultHeaders,
            },
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
        })

        // Add request interceptor
        this.axios.interceptors.request.use(
            async (config) => {
                // Customize request if needed
                return config
            },
            (error) => Promise.reject(error),
        )

        // Add response interceptor
        this.axios.interceptors.response.use(
            (response: AxiosResponse) => {
                // Customize response if needed
                return response
            },
            (error) => {
                // Handle errors globally
                return Promise.reject(error)
            },
        )
    }

    // Get the Axios instance for further customization if needed
    get instance(): AxiosInstance {
        return this.axios
    }

    // Set Authorization token
    setToken(token: string): void {
        this.axios.defaults.headers.Authorization = `Bearer ${token}`
    }

    // Remove Authorization token
    removeToken(): void {
        delete this.axios.defaults.headers.Authorization
    }

    // GET request
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axios.get<T>(url, config)
    }

    // POST request
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axios.post<T>(url, data, config)
    }

    // PUT request
    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axios.put<T>(url, data, config)
    }

    // DELETE request
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axios.delete<T>(url, config)
    }

    // PATCH request
    async patch<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.axios.patch<T>(url, data, config)
    }

    // Custom request
    async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axios.request<T>(config)
    }
}

export const apiClient = new ApiClient(API_URL.BASE_URL)
