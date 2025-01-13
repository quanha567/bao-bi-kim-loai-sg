import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { SelectOption } from '@/components'

import { articleApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { ArticleModel } from '@/models'
import { GetOptionType, SearchParams } from '@/types'

import { useDebounce } from '../use-debounce'

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
        onSuccess: (data: ArticleModel) => {
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

export const useGetArticleOptions = (
    { isEnable, optionKey }: GetOptionType<ArticleModel> = {
        optionKey: 'id',
        isEnable: true,
    },
) => {
    const [articleSearchText, setArticleSearchText] = useState<string>('')

    const articleSearchTextDebounce = useDebounce(articleSearchText)

    const {
        data: articles,
        isLoading: isLoadingArticleOptions,
        isFetchingNextPage: isFetchingNextPageArticleOptions,
        hasNextPage: hasNextPageArticleOptions,
        fetchNextPage: fetchNextPageArticleOptions,
    } = useInfiniteQuery({
        queryKey: [QUERY_KEY.ARTICLE_OPTIONS, articleSearchTextDebounce],
        queryFn: ({ pageParam }) =>
            articleApi.search({
                pageSize: 10,
                pageIndex: pageParam,
                searchText: articleSearchTextDebounce,
            }),
        getNextPageParam: ({ pageIndex, totalPages }) => {
            return pageIndex + 1 < totalPages ? pageIndex + 1 : undefined
        },
        initialPageParam: 0,
        enabled: isEnable,
    })

    const articleOptions = (articles?.pages
        .flatMap((page) => page.data || [])
        .map((article) => ({
            label: article.title,
            value: article[optionKey as keyof ArticleModel],
        })) || []) as SelectOption[]

    const loadMoreArticleOptions = () => {
        if (hasNextPageArticleOptions && !isFetchingNextPageArticleOptions) {
            fetchNextPageArticleOptions()
        }
    }

    return {
        articleOptions,
        articleSearchTextDebounce,
        setArticleSearchText,
        isLoadingArticleOptions,
        loadMoreArticleOptions,
        isFetchingNextPageArticleOptions,
    } as const
}
