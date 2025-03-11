import { useMutation, useQuery } from '@tanstack/react-query'

import { contactApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { ContactModel } from '@/models'
import { SearchParams } from '@/types'

export const useCreateContact = () => {
    return useMutation<ContactModel, Error, ContactModel>({
        mutationFn: async (data: ContactModel) => {
            const response = await contactApi.create(data)
            return response
        },
    })
}

export const useGetContacts = (params: SearchParams = {}) => {
    return useQuery({
        queryKey: [QUERY_KEY.CONTACTS, params],
        queryFn: () => contactApi.search(params),
    })
}

export const useUpdateContact = () => {
    return useMutation({
        mutationFn: async (data: ContactModel) => {
            const response = await contactApi.update(data)
            return response
        },
    })
}
