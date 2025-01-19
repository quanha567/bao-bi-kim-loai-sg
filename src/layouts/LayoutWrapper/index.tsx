import React from 'react'

import { AdminLayout } from '../AdminLayout'

export const LayoutWrapper = ({ children }: React.PropsWithChildren) => {
    return <AdminLayout>{children}</AdminLayout>
}
