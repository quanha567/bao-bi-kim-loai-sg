import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { SelectOption } from '@/components'

import { categoryApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { CategoryModel } from '@/models'
import { GetOptionType, SearchParams } from '@/types'

import { useDebounce } from '../use-debounce'

export const useGetCategories = (params: SearchParams = {}) => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES, params],
        queryFn: () => categoryApi.search(params),
    })
}

export const useGetCategoryOptions = (
    { isEnable, optionKey }: GetOptionType<CategoryModel> = {
        optionKey: 'id',
        isEnable: true,
    },
) => {
    const [categorySearchText, setCategorySearchText] = useState<string>('')

    const categorySearchTextDebounce = useDebounce(categorySearchText)

    const {
        data: categories,
        isLoading: isLoadingCategoryOptions,
        isFetchingNextPage: isFetchingNextPageCategoryOptions,
        hasNextPage: hasNextPageCategoryOptions,
        fetchNextPage: fetchNextPageCategoryOptions,
    } = useInfiniteQuery({
        queryKey: [QUERY_KEY.CATEGORY_OPTIONS, categorySearchTextDebounce],
        queryFn: ({ pageParam }) =>
            categoryApi.search({
                pageSize: 10,
                pageIndex: pageParam,
                searchText: categorySearchTextDebounce,
            }),
        getNextPageParam: ({ pageIndex, totalPages }) => {
            return pageIndex + 1 < totalPages ? pageIndex + 1 : undefined
        },
        initialPageParam: 0,
        enabled: isEnable,
    })

    const categoryOptions = (categories?.pages
        .flatMap((page) => page.data || [])
        .map((category) => ({
            label: category.name,
            value: category[optionKey as keyof CategoryModel],
        })) || []) as SelectOption[]

    const loadMoreCategoryOptions = () => {
        if (hasNextPageCategoryOptions && !isFetchingNextPageCategoryOptions) {
            fetchNextPageCategoryOptions()
        }
    }

    return {
        categoryOptions,
        categorySearchText,
        setCategorySearchText,
        isLoadingCategoryOptions,
        loadMoreCategoryOptions,
        isFetchingNextPageCategoryOptions,
    } as const
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
        mutationFn: async (data: Partial<CategoryModel>) => {
            const response = await categoryApi.update(data)
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
    return useMutation<void, Error, string | string[]>({
        mutationFn: async (ids: string | string[]) => {
            await categoryApi.delete(ids)
        },
    })
}
