import { useMutation, useQuery } from '@tanstack/react-query'

import { adminAccountApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { AdminAccountCreateRequestModel } from '@/models'

export const useGetAdminAccounts = () => {
    return useQuery({
        queryKey: [QUERY_KEY.ADMIN_ACCOUNTS],
        queryFn: () => adminAccountApi.getAll(),
    })
}

export const useCreateAdminAccount = () => {
    return useMutation({
        mutationFn: (data: AdminAccountCreateRequestModel) => adminAccountApi.create(data),
    })
}
