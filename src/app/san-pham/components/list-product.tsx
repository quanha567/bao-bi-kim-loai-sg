'use client'
import { useQuery } from '@tanstack/react-query'

import { useSearchParams } from 'next/navigation'

import {
    ProductItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Typography,
} from '@/components'

import { productApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'

export const ListProduct = () => {
    const searchParams = useSearchParams()

    const category = searchParams.get('category')

    const { data: products } = useQuery({
        queryKey: [QUERY_KEY.PRODUCTS, category],
        queryFn: () =>
            productApi.search({
                slug: category,
            }),
    })

    return (
        <>
            <div className="mt-6">
                <div className="space-y-2">
                    <Typography as="h5" variant="h5">
                        {products?.data?.[0]?.category?.name || 'Tất cả sản phẩm'}
                    </Typography>
                    <div className="flex items-center justify-between">
                        <Typography>Sản phẩm ({products?.totalElements})</Typography>
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
                <div className="mt-4 grid grid-cols-4 gap-4">
                    {products?.data?.map((product) => (
                        <ProductItem key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </>
    )
}
