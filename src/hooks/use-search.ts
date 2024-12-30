import { useState } from 'react'

interface UseTableProps {
    initialAscending?: boolean
    initialPageIndex?: number
    initialSortColumn?: null | string
    pageSize: number
    totalElements: number
}

interface UseTableReturn {
    ascending: boolean
    handleSortChange: (sortBy: string, ascending: boolean) => void
    pageSize: number
    sortColumn: null | string
}

export const useSearch = ({
    initialAscending = true,
    initialSortColumn = null,
    pageSize,
}: UseTableProps): UseTableReturn => {
    const [sortColumn, setSortColumn] = useState<null | string>(initialSortColumn)
    const [ascending, setAscending] = useState<boolean>(initialAscending)

    const handleSortChange = (sortBy: string, ascending: boolean) => {
        setSortColumn(sortBy)
        setAscending(ascending)
    }

    return {
        ascending,
        handleSortChange,
        pageSize,
        sortColumn,
    }
}
