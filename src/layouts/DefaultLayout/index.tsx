'use client'
import { useQuery } from '@tanstack/react-query'

import { DefaultFooter, DefaultHeader } from '../components'

import { API_URL, QUERY_KEY } from '@/constants'
import { AppProvider } from '@/contexts'
import { getApiUrl } from '@/lib'
import { SettingResponseModel } from '@/models'

export const DefaultLayout = ({ children }: React.PropsWithChildren) => {
    const { data: setting } = useQuery({
        queryKey: [QUERY_KEY.SETTING],
        queryFn: getData,
    })

    return (
        <>
            <DefaultHeader {...setting} />
            <AppProvider setting={setting?.setting}>
                <main>{children}</main>
            </AppProvider>
            <DefaultFooter {...setting} />
        </>
    )
}

function getData(): Promise<SettingResponseModel> {
    return fetch(getApiUrl(API_URL.SETTING)).then((res) => res.json())
}
