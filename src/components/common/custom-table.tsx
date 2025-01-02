'use client'

import { TooltipArrow } from '@radix-ui/react-tooltip'
import {
    BadgePlus,
    ChevronDown,
    ChevronUp,
    Database,
    Ellipsis,
    List,
    Loader,
    PencilLine,
    RotateCw,
    TableIcon,
    Trash2,
} from 'lucide-react'
import React, { ReactNode, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { useSearch } from '@/hooks'
import { cn } from '@/lib'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '..'
import { Typography } from './typography'

export type ColumnType<T> = {
    align?: 'center' | 'left' | 'right'
    className?: string
    key: keyof T
    label: ReactNode
    render?: (data: T) => ReactNode
    sortable?: boolean
}[]

const alignClass = {
    center: 'text-center flex justify-center',
    left: 'text-left',
    right: 'text-right',
}

interface CustomTableProps<T> {
    columns: ColumnType<T>
    data: T[]
    extraButtons?: ReactNode | ReactNode[]
    isLoading?: boolean
    onPaginationChange?: (page: number) => void
    onRefresh?: () => Promise<unknown>
    onRowClick?: (id: T[keyof T]) => void
    onSortChange?: (sortBy: string, ascending: boolean) => void
    pageIndex?: number
    pageSize?: number
    rowKey: keyof T
    showCheckbox?: boolean
    tableName: string
    totalElements?: number
    totalPages?: number
}

export const CustomTable = <T,>({
    columns,
    data,
    extraButtons,
    onPaginationChange,
    onRefresh,
    onRowClick,
    onSortChange,
    pageIndex = 0,
    pageSize = 10,
    rowKey,
    showCheckbox = false,
    tableName,
    totalElements = 0,
    totalPages = 0,
    isLoading,
}: CustomTableProps<T>) => {
    const { ascending, handleSortChange, sortColumn } = useSearch({
        initialSortColumn: null,
        pageSize,
        totalElements,
    })
    const [isRefresh, setIsRefresh] = useState<boolean>(false)
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<Set<T[keyof T]>>(new Set())
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false)

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedCheckboxes(new Set())
        } else {
            data.forEach((item) => selectedCheckboxes.add(item[rowKey]))
            setSelectedCheckboxes(new Set(selectedCheckboxes))
        }
        setIsAllSelected(!isAllSelected)
    }

    const handleCheckboxChange = (key: T[keyof T]) => {
        const newSelectedCheckboxes = new Set(selectedCheckboxes)
        if (newSelectedCheckboxes.has(key)) {
            newSelectedCheckboxes.delete(key)
        } else {
            newSelectedCheckboxes.add(key)
        }
        setSelectedCheckboxes(newSelectedCheckboxes)
    }
    useEffect(() => {
        setIsAllSelected(data.every((item) => selectedCheckboxes.has(item[rowKey])))
    }, [pageIndex, data, selectedCheckboxes])
    const [isListView, setIsListView] = useState<boolean>(() => {
        const savedView = localStorage.getItem('listViewMode')
        return savedView ? JSON.parse(savedView) : false
    })

    useEffect(() => {
        localStorage.setItem('listViewMode', JSON.stringify(isListView))
    }, [isListView])

    const handleSort = (columnKey: string) => {
        const newAscending = sortColumn === columnKey ? !ascending : true
        handleSortChange(columnKey, newAscending)
        onSortChange?.(columnKey, newAscending)
    }

    const maxPagesToShow = 5
    const startPage = Math.max(
        0,
        Math.min(pageIndex - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow),
    )
    const endPage = Math.min(totalPages, startPage + maxPagesToShow)
    const handlePageChangeWithPagination = (page: number) => {
        if (page >= 0 && page < totalPages && page !== pageIndex) {
            onPaginationChange?.(page)
        }
    }
    const handleRefetchData = async () => {
        setIsRefresh(true)
        const startTime = Date.now()

        await onRefresh?.()

        const elapsedTime = Date.now() - startTime

        const remainingTime = Math.max(1000 - elapsedTime, 0)

        setTimeout(() => {
            setIsRefresh(false)
        }, remainingTime)
    }

    return (
        <div className="relative rounded-lg bg-white p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <Typography as="h3" variant="h3">
                    {tableName}
                </Typography>
                <div className="flex items-center gap-2">
                    {onRefresh && (
                        <Button
                            color="info"
                            onClick={handleRefetchData}
                            className={`flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:scale-105 hover:bg-blue-700`}
                        >
                            <RotateCw size={20} className={`${isRefresh ? 'animate-spin' : ''}`} />
                            Tải lại
                        </Button>
                    )}
                    {extraButtons && <div className="space-x-2">{extraButtons}</div>}
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => setIsListView(!isListView)}
                    >
                        {isListView ? <TableIcon size={20} /> : <List size={20} />}
                    </Button>
                </div>
            </div>
            {!isListView ? (
                <Table className="w-full table-auto border">
                    <TableHeader className="bg-gray-100">
                        <TableRow className="divide-x-[1px]">
                            <TableHead className="text-center font-bold">STT</TableHead>
                            {showCheckbox && (
                                <TableHead className="text-center">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                            )}
                            {columns.map((col) => (
                                <TableHead
                                    key={String(col.key)}
                                    onClick={() => col.sortable && handleSort(String(col.key))}
                                    className={cn(
                                        'relative cursor-pointer text-center font-bold',
                                        alignClass[col.align || 'left'],
                                    )}
                                    title={
                                        col.sortable
                                            ? `Sắp xếp theo ${ascending ? 'giảm dần' : 'tăng dần'}`
                                            : ''
                                    }
                                >
                                    {col.label}
                                    {col.sortable && (
                                        <span className="group absolute right-0 top-1/2 -translate-y-1/2 transform">
                                            {sortColumn === String(col.key) ? (
                                                ascending ? (
                                                    <ChevronUp
                                                        size={25}
                                                        className="rounded p-1 group-hover:bg-blue-200"
                                                    />
                                                ) : (
                                                    <ChevronDown
                                                        size={25}
                                                        className="rounded p-1 group-hover:bg-blue-200"
                                                    />
                                                )
                                            ) : (
                                                <ChevronUp
                                                    size={25}
                                                    className="rounded p-1 group-hover:bg-blue-200"
                                                />
                                            )}
                                        </span>
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-b border-gray-300">
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1 + (showCheckbox ? 1 : 0)}>
                                    <div className="flex flex-col items-center justify-center gap-2 p-10">
                                        <Loader size={40} className="animate-spin" />
                                        <Typography className="font-medium">
                                            Đang tải dữ liệu...
                                        </Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : !data?.length ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={columns.length + 1 + (showCheckbox ? 1 : 0)}>
                                    <div className="flex flex-col items-center justify-center gap-2 p-10">
                                        <Database size={40} />
                                        <Typography className="font-medium">
                                            Không có dữ liệu
                                        </Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item: T) => (
                                <TableRow
                                    key={String(item[rowKey])}
                                    onClick={() => onRowClick && onRowClick(item[rowKey])}
                                    className="divide-x-[1px] border-b border-gray-300 hover:bg-transparent"
                                >
                                    <TableCell className="text-center font-medium">
                                        {pageIndex * pageSize + data.indexOf(item) + 1}
                                    </TableCell>
                                    {showCheckbox && (
                                        <TableCell
                                            className="text-center font-medium"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Checkbox
                                                checked={selectedCheckboxes.has(item[rowKey])}
                                                onCheckedChange={() =>
                                                    handleCheckboxChange(item[rowKey])
                                                }
                                            />
                                        </TableCell>
                                    )}
                                    {columns.map((col) => (
                                        <TableCell
                                            key={`${String(item[rowKey])}-${String(col.key)}`}
                                            className={cn(
                                                alignClass[col.align || 'left'],
                                                col.className,
                                            )}
                                        >
                                            {col?.render?.(item) || (item[col.key] as ReactNode)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="mb-4 flex items-center justify-start gap-2">
                        {showCheckbox && (
                            <>
                                <Checkbox
                                    className="mr-2"
                                    checked={isAllSelected}
                                    onCheckedChange={handleSelectAll}
                                />
                                <span className="text-lg font-medium">Chọn tất cả</span>
                            </>
                        )}
                    </div>
                    {data.map((item: T) => (
                        <div
                            key={String(item[rowKey])}
                            onClick={() => onRowClick && onRowClick(item[rowKey])}
                            className="relative flex items-center gap-4 rounded-lg border p-4 shadow-sm hover:shadow-md"
                        >
                            {showCheckbox && (
                                <div className="absolute right-2 top-2">
                                    <Checkbox
                                        className="ml-4"
                                        checked={selectedCheckboxes.has(item[rowKey])}
                                        onCheckedChange={() => handleCheckboxChange(item[rowKey])}
                                    />
                                </div>
                            )}
                            <div className="flex w-full flex-col gap-2">
                                {columns.map((col) => (
                                    <div key={String(col.key)} className="flex gap-2">
                                        <span className="font-semibold text-gray-600">
                                            {col.label}:
                                        </span>
                                        <span className="flex-1 text-gray-800">
                                            {col?.render?.(item) || (item[col.key] as ReactNode)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {totalPages > 0 && (
                <div className="mt-4 flex items-center justify-end space-x-4">
                    <Typography variant="link">
                        Hiển thị {pageIndex * pageSize + 1} -{' '}
                        {Math.min((pageIndex + 1) * pageSize, totalElements)} / {totalElements}
                    </Typography>
                    <div className="flex items-center space-x-2">
                        <Pagination className="flex space-x-2">
                            <PaginationContent>
                                <PaginationItem
                                    disabled={pageIndex === 0}
                                    onClick={() => handlePageChangeWithPagination(pageIndex - 1)}
                                >
                                    <PaginationPrevious />
                                </PaginationItem>
                                {startPage > 0 && (
                                    <>
                                        <PaginationItem
                                            onClick={() => handlePageChangeWithPagination(0)}
                                        >
                                            <PaginationLink
                                                href="#"
                                                isActive={pageIndex === pageIndex}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        {startPage > 1 && (
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    <Ellipsis />
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}
                                    </>
                                )}
                                {Array.from({ length: Math.min(maxPagesToShow, totalPages) })
                                    .map((_, index) => startPage + index)
                                    .filter((page) => page < totalPages)
                                    .map((page) => (
                                        <PaginationItem
                                            key={page}
                                            onClick={() => handlePageChangeWithPagination(page)}
                                        >
                                            <PaginationLink href="#" isActive={page === pageIndex}>
                                                {page + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                {endPage < totalPages && (
                                    <>
                                        {endPage < totalPages - 1 && (
                                            <PaginationItem>
                                                <PaginationLink href="#">
                                                    <Ellipsis />
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}
                                        <PaginationItem
                                            onClick={() =>
                                                handlePageChangeWithPagination(totalPages - 1)
                                            }
                                        >
                                            <PaginationLink
                                                href="#"
                                                isActive={pageIndex === pageIndex}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}
                                <PaginationItem
                                    disabled={pageIndex === totalPages - 1}
                                    onClick={() => handlePageChangeWithPagination(pageIndex + 1)}
                                >
                                    <PaginationNext />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}
            {isRefresh && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 bg-opacity-75">
                    <RotateCw size={40} className="animate-spin text-blue-600" />
                </div>
            )}
        </div>
    )
}

interface TableButtonProps {
    children?: ReactNode
    onClick?: () => void
}

export const UpdateButton = ({ onClick }: TableButtonProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={onClick}
                        className="text-green-700 hover:bg-green-700 hover:text-white"
                    >
                        <PencilLine />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-green-700">
                    <TooltipArrow className="fill-green-700" />
                    <Typography className="text-sm font-medium">Chỉnh sửa</Typography>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export const DeleteButton = ({ onClick }: TableButtonProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={onClick}
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                    >
                        <Trash2 />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-red-500">
                    <TooltipArrow className="fill-red-500" />
                    <Typography className="text-sm font-medium">Xóa</Typography>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export const AddButton = ({ children, onClick }: TableButtonProps) => {
    return (
        <Button onClick={onClick}>
            <BadgePlus />
            {children}
        </Button>
    )
}

export const TableButtonWrapper = ({ children }: React.PropsWithChildren) => {
    return <div className="flex items-center justify-center gap-2">{children}</div>
}
