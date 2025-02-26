import React from 'react'

import { DefaultLayout } from '../DefaultLayout'

export const LayoutWrapper = async ({ children }: React.PropsWithChildren) => {
    return <DefaultLayout>{children}</DefaultLayout>
}
