'use client'

import { useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface UseTableProps {
    initialAscending?: boolean
    initialSortColumn?: null | string
}

export const useSearch = ({ initialAscending = true, initialSortColumn = null }: UseTableProps) => {
    const params = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const pageIndex = Number(params.get('pageIndex')) || 0
    const pageSize = Number(params.get('pageSize')) || 10
    const searchText = params.get('searchText') || ''

    const [sortColumn, setSortColumn] = useState<null | string>(initialSortColumn)
    const [ascending, setAscending] = useState<boolean>(initialAscending)

    const handleSortChange = (sortBy: string, ascending: boolean) => {
        setSortColumn(sortBy)
        setAscending(ascending)
    }

    const handlePaginationChange = (page: number) => {
        router.push(
            `${pathname}?${new URLSearchParams({
                ...Object.fromEntries(params.entries()),
                pageIndex: page.toString(),
            }).toString()}`,
        )
    }

    return {
        ascending,
        handleSortChange,
        pageSize,
        sortColumn,
        pageIndex,
        searchText,
        handlePaginationChange,
    }
}
