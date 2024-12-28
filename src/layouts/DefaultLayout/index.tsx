import React from 'react'

import { DefaultFooter, DefaultHeader } from '../components'

export const DefaultLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="layout">
            <DefaultHeader />
            <main>{children}</main>
            <DefaultFooter />
        </div>
    )
}
