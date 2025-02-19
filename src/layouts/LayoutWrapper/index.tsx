import React from 'react'

import { DefaultLayout } from '../DefaultLayout'

export const LayoutWrapper = ({ children }: React.PropsWithChildren) => {
    return <DefaultLayout>{children}</DefaultLayout>
}
