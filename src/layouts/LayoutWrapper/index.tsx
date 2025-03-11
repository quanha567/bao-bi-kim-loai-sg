'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

import { AdminLayout } from '../AdminLayout'
import { DefaultLayout } from '../DefaultLayout'

export const LayoutWrapper = ({ children }: React.PropsWithChildren) => {
    const pathName = usePathname()

    if (pathName.includes('/auth')) {
        return <AdminLayout>{children}</AdminLayout>
    }

    if (pathName.includes('/login')) {
        return children
    }

    return <DefaultLayout>{children}</DefaultLayout>
}
