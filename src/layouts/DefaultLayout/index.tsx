import { DefaultFooter, DefaultHeader } from '../components'

import { API_URL } from '@/constants'
import { AppProvider } from '@/contexts'
import { getApiUrl } from '@/lib'
import { SettingRequestModel } from '@/models'

export const DefaultLayout = async ({ children }: React.PropsWithChildren) => {
    const setting = await getData()

    return (
        <>
            <DefaultHeader {...setting} />
            <AppProvider setting={setting}>
                <main>{children}</main>
            </AppProvider>
            <DefaultFooter {...setting} />
        </>
    )
}

function getData(): Promise<SettingRequestModel> {
    return fetch(getApiUrl(API_URL.SETTING)).then((res) => res.json())
}
