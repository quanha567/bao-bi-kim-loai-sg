import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { settingApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { SettingModel, SettingRequestModel, SettingResponseModel } from '@/models'

export const useGetSetting = () => {
    return useQuery({
        queryKey: [QUERY_KEY.SETTING],
        queryFn: async () => {
            return (await settingApi.getOne()) as any as SettingResponseModel
        },
    })
}

export const useCreateOrUpdateSetting = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: SettingModel) => {
            return await settingApi.createOrUpdate(data as SettingRequestModel)
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
