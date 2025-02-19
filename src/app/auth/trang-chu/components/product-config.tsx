'use client'
import { Card, CardContent, CardHeader, CardTitle, FormMultipleSelect } from '@/components'

import { useGetProductOptions } from '@/hooks'

export const ProductConfig = () => {
    const {
        productOptions,
        isFetchingNextPageProductOptions,
        isLoadingProductOptions,
        loadMoreProductOptions,
    } = useGetProductOptions()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sản phẩm chính</CardTitle>
            </CardHeader>
            <CardContent>
                <FormMultipleSelect
                    name="products"
                    label="Sản phẩm"
                    options={productOptions}
                    isLoading={isLoadingProductOptions}
                    onLoadMore={loadMoreProductOptions}
                    isLoadingMore={isFetchingNextPageProductOptions}
                />
            </CardContent>
        </Card>
    )
}
