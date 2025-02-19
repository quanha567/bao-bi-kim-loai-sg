import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { SelectOption } from '@/components'

import { productApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { ProductModel } from '@/models'
import { GetOptionType, SearchParams } from '@/types'

import { useDebounce } from '../use-debounce'

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
            const response = await productApi.update(data)
            return response
        },
        onSuccess: (data: ProductModel) => {
            return queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.PRODUCT, data.id],
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

export const useGetProductOptions = (
    { isEnable, optionKey }: GetOptionType<ProductModel> = {
        optionKey: 'id',
        isEnable: true,
    },
) => {
    const [productSearchText, setProductSearchText] = useState<string>('')

    const productSearchTextDebounce = useDebounce(productSearchText)

    const {
        data: products,
        isLoading: isLoadingProductOptions,
        isFetchingNextPage: isFetchingNextPageProductOptions,
        hasNextPage: hasNextPageProductOptions,
        fetchNextPage: fetchNextPageProductOptions,
    } = useInfiniteQuery({
        queryKey: [QUERY_KEY.PRODUCT_OPTIONS, productSearchTextDebounce],
        queryFn: ({ pageParam }) =>
            productApi.search({
                pageSize: 10,
                pageIndex: pageParam,
                searchText: productSearchTextDebounce,
            }),
        getNextPageParam: ({ pageIndex, totalPages }) => {
            return pageIndex + 1 < totalPages ? pageIndex + 1 : undefined
        },
        initialPageParam: 0,
        enabled: isEnable,
    })

    const productOptions = (products?.pages
        .flatMap((page) => page.data || [])
        .map((product) => ({
            label: product.name,
            value: product[optionKey as keyof ProductModel],
        })) || []) as SelectOption[]

    const loadMoreProductOptions = () => {
        if (hasNextPageProductOptions && !isFetchingNextPageProductOptions) {
            fetchNextPageProductOptions()
        }
    }

    return {
        productOptions,
        productSearchTextDebounce,
        setProductSearchText,
        isLoadingProductOptions,
        loadMoreProductOptions,
        isFetchingNextPageProductOptions,
    } as const
}
