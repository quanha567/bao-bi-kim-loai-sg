import { DefaultFooter, DefaultHeader } from '../components'

import { API_URL } from '@/constants'
import { getApiUrl } from '@/lib'

export const DefaultLayout = async ({ children }: React.PropsWithChildren) => {
    const setting = await getData()

    return (
        <div className="layout">
            <DefaultHeader {...setting} />
            <main>{children}</main>
            <DefaultFooter {...setting} />
        </div>
    )
}

function getData() {
    return fetch(getApiUrl(API_URL.SETTING)).then((res) => res.json())
}
