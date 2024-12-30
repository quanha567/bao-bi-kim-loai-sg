'use client'

import { useEffect, useState } from 'react'

import {
    AddButton,
    Button,
    ColumnType,
    CustomTable,
    DeleteButton,
    Input,
    Label,
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    TableButtonWrapper,
    UpdateButton,
} from '@/components'

import { CategoryModel } from '@/models'
import { ApiListResponse } from '@/types/api.type'

const fetchCategories = async () => {
    const response = await fetch('https://baobikimloaisg.vercel.app/api/categories')
    if (!response.ok) {
        throw new Error('Failed to fetch categories')
    }
    return response.json()
}

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState<ApiListResponse<CategoryModel> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories()
                setCategories(data)
            } catch (err) {
                setError('Error loading categories')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadCategories()
    }, [])

    const columns: ColumnType<CategoryModel> = [
        {
            key: 'name',
            label: 'Tên danh mục',
            render: (data) => data.name,
        },
        {
            key: 'products',
            label: 'Số lượng sản phẩm',
            render: (data) => data.products?.length || 0,
        },
        {
            key: 'id',
            label: 'Chức năng',
            render: (data) => (
                <TableButtonWrapper>
                    <UpdateButton />
                    <DeleteButton />
                </TableButtonWrapper>
            ),
        },
    ]

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="p-4">
            <Sheet>
                <CustomTable
                    rowKey={'id'}
                    columns={columns}
                    data={categories?.data || []}
                    tableName="Danh sách danh mục"
                    pageSize={categories?.pageSize || 0}
                    pageIndex={categories?.pageIndex || 0}
                    totalPages={categories?.totalPages || 0}
                    totalElements={categories?.totalElements || 0}
                    extraButtons={
                        <SheetTrigger asChild>
                            <AddButton>Thêm danh mục</AddButton>
                        </SheetTrigger>
                    }
                />
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Thêm danh mục sản phẩm</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Tên
                            </Label>
                            <Input id="name" className="col-span-3" value="Nhập tên danh mục..." />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Lưu</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AdminCategoryPage
