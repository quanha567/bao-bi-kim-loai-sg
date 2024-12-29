import React from 'react'

import { DefaultFooter, DefaultHeader } from '../components'

const contactInfo = {
    address: '368/77O Tôn Đản, Phường 04, Quận 4, Thành phố Hồ Chí Minh, Việt Nam',
    mail: 'baobikimloaisaigon@gmail.com',
    phoneNumber: '0903207911',
}

export const DefaultLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="layout">
            <DefaultHeader {...contactInfo} />
            <main>{children}</main>
            <DefaultFooter {...contactInfo} />
        </div>
    )
}
