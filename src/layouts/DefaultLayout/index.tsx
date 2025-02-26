import { DefaultFooter, DefaultHeader } from '../components'

import { API_URL } from '@/constants'
import { AppProvider } from '@/contexts'
import { getApiUrl } from '@/lib'
import { SettingResponseModel } from '@/models'

export const DefaultLayout = async ({ children }: React.PropsWithChildren) => {
    const setting = await getData()

    return (
        <>
            <DefaultHeader {...setting} />
            <AppProvider setting={setting.setting}>
                <main>{children}</main>
            </AppProvider>
            <DefaultFooter {...setting} />
        </>
    )
}

function getData(): Promise<SettingResponseModel> {
    return fetch(getApiUrl(API_URL.SETTING)).then((res) => res.json())
}
