import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { categoryApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { CategoryModel } from '@/models'
import { SearchParams } from '@/types'

export const useGetCategories = (params: SearchParams = {}) => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES, params],
        queryFn: () => categoryApi.search(params),
    })
}

export const useGetCategory = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORY, id],
        queryFn: () => categoryApi.getOne(id),
    })
}

export const useCreateCategory = () => {
    return useMutation<CategoryModel, Error, CategoryModel>({
        mutationFn: async (data: CategoryModel) => {
            const response = await categoryApi.create(data)
            return response
        },
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()

    return useMutation<CategoryModel, Error, CategoryModel>({
        mutationFn: async (data: CategoryModel) => {
            const response = await categoryApi.update(data.id, data)
            return response
        },
        onSuccess: (data: CategoryModel) => {
            return queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CATEGORY, data.id],
            })
        },
    })
}

export const useDeleteCategory = () => {
    return useMutation<void, Error, string>({
        mutationFn: async (ids: string | string[]) => {
            await categoryApi.delete(ids)
        },
    })
}
