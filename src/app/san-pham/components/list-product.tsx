'use client'
import { useQuery } from '@tanstack/react-query'
import { Database } from 'lucide-react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
    CustomPagination,
    ProductItem,
    ProductSkeleton,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Typography,
} from '@/components'

import { productApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { CategoryModel } from '@/models'

type ListProductProps = {
    categories: CategoryModel[]
}

export const ListProduct = ({ categories }: ListProductProps) => {
    const searchParams = useSearchParams()

    const router = useRouter()

    const category = searchParams.get('category')
    const currentCategory = categories.find((item) => item.slug === category)

    const { data: products, isLoading: isLoadingProducts } = useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, category],
        queryFn: () =>
            productApi.search({
                category,
            }),
    })

    const handleChangePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set('page', String(page))

        router.push(`?${params.toString()}`)
    }

    return (
        <>
            <div className="mt-6">
                <div className="space-y-2">
                    <Typography as="h5" variant="h5">
                        {currentCategory?.name || 'Tất cả sản phẩm'}
                    </Typography>
                    <div className="flex items-center justify-between">
                        <Typography>
                            Sản phẩm {!isLoadingProducts ? `(${products?.totalElements})` : ''}
                        </Typography>
                        <Select>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Sắp xếp theo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Bán chạy nhất</SelectItem>
                                <SelectItem value="dark">Phổ biến nhất</SelectItem>
                                <SelectItem value="system">Mới nhất</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoadingProducts ? (
                        Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
                    ) : Array.isArray(products?.data) && products.data.length > 0 ? (
                        products.data.map((product) => (
                            <ProductItem key={product.id} {...product} />
                        ))
                    ) : (
                        <div className="col-span-4 flex flex-col items-center justify-center space-y-4 p-10 text-zinc-400">
                            <Database size={100} />
                            <Typography>Không có dữ liệu sản phẩm nào</Typography>
                        </div>
                    )}
                </div>
                <CustomPagination
                    onPageChange={handleChangePage}
                    pageSize={products?.pageSize || 10}
                    total={products?.totalElements || 0}
                    currentPage={products?.pageIndex || 1}
                />
            </div>
        </>
    )
}
