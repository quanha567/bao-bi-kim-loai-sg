'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

import { AdminLayout } from '../AdminLayout'
import { DefaultLayout } from '../DefaultLayout'

export const LayoutWrapper = ({ children }: React.PropsWithChildren) => {
    const pathName = usePathname()

    return (
        <div className="relative">
            {pathName.includes('/auth') ? (
                <AdminLayout>{children}</AdminLayout>
            ) : pathName.includes('/login') ? (
                children
            ) : (
                <DefaultLayout>{children}</DefaultLayout>
            )}
        </div>
    )
}
