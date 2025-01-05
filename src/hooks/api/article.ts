import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { articleApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { ArticleModel, ProductModel } from '@/models'
import { SearchParams } from '@/types'

export const useGetArticles = (params: SearchParams = {}) => {
    return useQuery({
        queryKey: [QUERY_KEY.ARTICLES, params],
        queryFn: () => articleApi.search(params),
    })
}

export const useGetArticle = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.ARTICLE, id],
        queryFn: () => articleApi.getOne(id),
    })
}

export const useCreateArticle = () => {
    return useMutation({
        mutationFn: async (data: ArticleModel) => {
            const response = await articleApi.create(data)
            return response
        },
    })
}

export const useUpdateArticle = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: ArticleModel) => {
            const response = await articleApi.update(data)
            return response
        },
        onSuccess: (data: ProductModel) => {
            return queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.ARTICLE, data.id],
            })
        },
    })
}

export const useDeleteArticle = () => {
    return useMutation<void, Error, string | string[]>({
        mutationFn: async (ids: string | string[]) => {
            await articleApi.delete(ids)
        },
    })
}
