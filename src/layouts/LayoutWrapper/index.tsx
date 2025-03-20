'use client'

import React, { createRef, useImperativeHandle, useState } from 'react'

import { usePathname } from 'next/navigation'

import { Loader } from '@/components'

import { AdminLayout } from '../AdminLayout'
import { DefaultLayout } from '../DefaultLayout'

interface GlobalLoadingRef {
    hideLoading: () => void
    showLoading: () => void
}

export const globalLoadingRef = createRef<GlobalLoadingRef>()

export const LayoutWrapper = ({ children }: React.PropsWithChildren) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const pathName = usePathname()

    const showLoading = () => {
        setIsLoading(true)
    }

    const hideLoading = () => {
        setIsLoading(false)
    }

    useImperativeHandle(globalLoadingRef, () => ({
        showLoading,
        hideLoading,
    }))

    return (
        <div className="relative">
            {isLoading && <Loader className="z-50" />}
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
