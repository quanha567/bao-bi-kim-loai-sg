import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { SelectOption } from '@/components'

import { pageApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { PageModel } from '@/models'
import { GetOptionType } from '@/types'

import { useDebounce } from '../use-debounce'

export const useGetAllPage = () => {
    return useQuery({
        queryKey: [QUERY_KEY.PAGES],
        queryFn: () => pageApi.getAll(),
    })
}

export const useCreatePage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: PageModel) => pageApi.create(data),
        onSuccess: () => queryClient.refetchQueries({ queryKey: [QUERY_KEY.PAGES] }),
    })
}

export const useUpdatePage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: PageModel) => pageApi.update(data),
        onSuccess: () => queryClient.refetchQueries({ queryKey: [QUERY_KEY.PAGES] }),
    })
}

export const useDeletePage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: string | string[]) => pageApi.delete(ids),
        onSuccess: () => queryClient.refetchQueries({ queryKey: [QUERY_KEY.PAGES] }),
    })
}

export const useGetPageOptions = (
    { isEnable, optionKey }: GetOptionType<PageModel> = {
        optionKey: 'id',
        isEnable: true,
    },
) => {
    const [pageSearchText, setPageSearchText] = useState<string>('')

    const pageSearchTextDebounce = useDebounce(pageSearchText)

    const {
        data: pages,
        isLoading: isLoadingPageOptions,
        isFetchingNextPage: isFetchingNextPagePageOptions,
        hasNextPage: hasNextPagePageOptions,
        fetchNextPage: fetchNextPagePageOptions,
    } = useInfiniteQuery({
        queryKey: [QUERY_KEY.PAGE_OPTIONS, pageSearchTextDebounce],
        queryFn: ({ pageParam }) =>
            pageApi.search({
                pageSize: 10,
                pageIndex: pageParam,
                searchText: pageSearchTextDebounce,
            }),
        getNextPageParam: ({ pageIndex, totalPages }) => {
            return pageIndex + 1 < totalPages ? pageIndex + 1 : undefined
        },
        initialPageParam: 0,
        enabled: isEnable,
    })

    const pageOptions = (pages?.pages
        .flatMap((page) => page.data || [])
        .map((item) => ({
            label: item.name,
            value: item[optionKey ?? 'id'],
        })) || []) as SelectOption[]

    const loadMorePageOptions = () => {
        if (hasNextPagePageOptions && !isFetchingNextPagePageOptions) {
            fetchNextPagePageOptions()
        }
    }

    return {
        pageOptions,
        pageSearchTextDebounce,
        setPageSearchText,
        isLoadingPageOptions,
        loadMorePageOptions,
        isFetchingNextPagePageOptions,
    } as const
}
