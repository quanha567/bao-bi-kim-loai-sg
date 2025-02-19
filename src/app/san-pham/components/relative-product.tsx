'use client'

import { useQuery } from '@tanstack/react-query'

import { ProductItem, ProductSkeleton, Typography } from '@/components'

import { productApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'

type RelativeProductProps = {
    productId: string
    slug: string
}

export const RelativeProduct = ({ slug, productId }: RelativeProductProps) => {
    const { data: relativeProducts, isLoading: isLoadingRelativeProducts } = useQuery({
        queryKey: [QUERY_KEY.RELATIVE_PRODUCTS, slug],
        queryFn: () => productApi.search({ category: slug }),
    })

    if (
        (!isLoadingRelativeProducts && !relativeProducts?.data?.length) ||
        relativeProducts?.data?.length === 1
    ) {
        return null
    }

    return (
        <div>
            <Typography as="h5" variant="h5">
                Sản phẩm liên quan
            </Typography>
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {isLoadingRelativeProducts
                    ? Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
                    : relativeProducts?.data?.map((product) => {
                          if (product?.id === productId) return null

                          return <ProductItem key={product?.id} {...product} />
                      })}
            </div>
        </div>
    )
}
