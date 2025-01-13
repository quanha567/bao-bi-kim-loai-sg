import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { pageApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { PageModel } from '@/models'

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
        mutationFn: pageApi.delete,
        onSuccess: () => queryClient.refetchQueries({ queryKey: [QUERY_KEY.PAGES] }),
    })
}
