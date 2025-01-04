import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { settingApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { SettingModel } from '@/models'

export const useGetSetting = () => {
    return useQuery({
        queryKey: [QUERY_KEY.SETTING],
        queryFn: () => settingApi.getOne(),
    })
}

export const useCreateOrUpdateSetting = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: SettingModel) => {
            const response = await settingApi.createOrUpdate(data)
            return response
        },
        onSuccess: () => {
            return queryClient.refetchQueries({
                queryKey: [QUERY_KEY.SETTING],
            })
        },
    })
}

export const useDeleteSetting = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            const response = await settingApi.delete()
            return response
        },
        onSuccess: () => {
            return queryClient.refetchQueries({
                queryKey: [QUERY_KEY.SETTING],
            })
        },
    })
}
