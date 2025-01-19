import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { settingApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { SettingModel, SettingRequestModel } from '@/models'

export const useGetSetting = () => {
    return useQuery({
        queryKey: [QUERY_KEY.SETTING],
        queryFn: async () => {
            const settingResponse = await settingApi.getOne()
            console.log('queryFn:  settingResponse:', settingResponse)
            return settingResponse
                ? {
                      ...settingResponse,
                      menus: settingResponse.menus ? JSON.parse(settingResponse.menus) : [],
                  }
                : {}
        },
    })
}

export const useCreateOrUpdateSetting = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: SettingModel) => {
            const dataSubmit: SettingRequestModel = {
                ...data,
                menus: Array.isArray(data.menus) ? JSON.stringify(data.menus) : '',
            }

            const response = await settingApi.createOrUpdate(dataSubmit)
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
