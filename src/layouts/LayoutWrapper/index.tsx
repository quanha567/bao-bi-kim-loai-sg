import React from 'react'

import { AdminLayout } from '../AdminLayout'
import { DefaultLayout } from '../DefaultLayout'

export const LayoutWrapper = async ({ children }: React.PropsWithChildren) => {
    return (
        <DefaultLayout>
            <AdminLayout>{children}</AdminLayout>
        </DefaultLayout>
    )
}
