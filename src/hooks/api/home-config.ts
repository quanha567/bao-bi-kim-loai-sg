import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { homeConfigApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { HomeConfigItemModel, HomeConfigModel } from '@/models'

export const useGetHomeConfig = () => {
    return useQuery({
        queryKey: [QUERY_KEY.HOME_CONFIG],
        queryFn: async (): Promise<HomeConfigModel> => {
            const settingResponse = await homeConfigApi.getOne()
            return settingResponse
                ? {
                      ...settingResponse,
                      doYouKnows: Array.isArray(settingResponse.doYouKnows)
                          ? settingResponse.doYouKnows
                          : [],
                      extras: Array.isArray(settingResponse.extras) ? settingResponse.extras : [],
                      sliders: settingResponse.sliders || [],
                      successStories: Array.isArray(settingResponse.successStories)
                          ? settingResponse.successStories
                          : [],
                      customerLogos: settingResponse.customerLogos || [],
                      products: settingResponse.products || [],
                      createdAt: settingResponse.createdAt || '',
                      id: settingResponse.id || '',
                      updatedAt: settingResponse.updatedAt || '',
                  }
                : {
                      doYouKnows: [] as HomeConfigItemModel[],
                      extras: [] as HomeConfigItemModel[],
                      sliders: [],
                      successStories: [] as HomeConfigItemModel[],
                      customerLogos: [],
                      products: [],
                      createdAt: '',
                      id: '',
                      updatedAt: '',
                  }
        },
    })
}

export const useCreateOrUpdateHomeConfig = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: HomeConfigModel) => {
            console.log('mutationFn:  data:', data)
            const response = await homeConfigApi.createOrUpdate(data)
            return response
        },
        onSuccess: () => {
            return queryClient.refetchQueries({
                queryKey: [QUERY_KEY.HOME_CONFIG],
            })
        },
    })
}

export const useDeleteHomeConfig = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            const response = await homeConfigApi.delete()
            return response
        },
        onSuccess: () => {
            return queryClient.refetchQueries({
                queryKey: [QUERY_KEY.HOME_CONFIG],
            })
        },
    })
}
