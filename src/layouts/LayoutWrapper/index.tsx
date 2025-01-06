'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

import { ADMIN_PATH } from '@/constants'

import { AdminLayout } from '../AdminLayout'
import { DefaultLayout } from '../DefaultLayout'

export const LayoutWrapper = ({ children }: React.PropsWithChildren) => {
    const currentPath = usePathname()

    if (currentPath === ADMIN_PATH.LOGIN) {
        return children
    }

    if (currentPath && currentPath.includes('/auth/')) {
        return <AdminLayout>{children}</AdminLayout>
    }

    return <DefaultLayout>{children}</DefaultLayout>
}
