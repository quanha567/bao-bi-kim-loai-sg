import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { productApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { ProductModel } from '@/models'
import { SearchParams } from '@/types'

export const useGetProducts = (params: SearchParams = {}) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, params],
        queryFn: () => productApi.search(params),
    })
}

export const useGetProduct = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCT, id],
        queryFn: () => productApi.getOne(id),
    })
}

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: async (data: ProductModel) => {
            const response = await productApi.create(data)
            return response
        },
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: ProductModel) => {
            const response = await productApi.update(data.id, data)
            return response
        },
        onSuccess: (data: ProductModel) => {
            return queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CATEGORY, data.id],
            })
        },
    })
}

export const useDeleteProduct = () => {
    return useMutation<void, Error, string>({
        mutationFn: async (ids: string | string[]) => {
            await productApi.delete(ids)
        },
    })
}
