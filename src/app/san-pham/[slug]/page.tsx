import React from 'react'

import { headers } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { ProductBreadcrumb, RelativeProduct } from '../components'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Typography,
} from '@/components'

import { API_URL } from '@/constants'
import { getApiUrl } from '@/lib'

const fetchProduct = (slug: string) => {
    return fetch(getApiUrl(`${API_URL.PRODUCTS}/${slug}`)).then((res) => res.json())
}

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
    headers()
    const { slug } = params
    const product = await fetchProduct(slug)
    const productDetail = product?.data?.[0]

    if (!productDetail) {
        return notFound()
    }

    return (
        <div className="container space-y-3 pb-10 pt-4">
            <ProductBreadcrumb />
            <div className="grid grid-cols-[1fr_2fr] gap-4">
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {[productDetail?.image, productDetail?.imageHover]
                            .filter(Boolean)
                            .map((img, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={String(img)}
                                            alt={productDetail.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="space-y-4">
                    <Typography as="h1" variant="h1" className="!text-2xl">
                        {productDetail.name}
                    </Typography>
                    <Typography as="h5" variant="h5" className="text-primary">
                        Liên hệ
                    </Typography>

                    {/* <div className="space-y-2">
                        <Typography as="h5" variant="h5">
                            Thông số sản phẩm
                        </Typography>
                        <div className="flex items-center gap-4">
                            <Plus size={20} />
                            <Typography>Kích thước:</Typography>
                            <Typography>190×225</Typography>
                        </div>
                        <div className="flex items-center gap-4">
                            <Plus size={20} />
                            <Typography>Kích thước:</Typography>
                            <Typography>190×225</Typography>
                        </div>
                    </div> */}
                    <div className="space-y-2">
                        <Typography as="h5" variant="h5">
                            Mô tả sản phẩm
                        </Typography>
                        <Typography>{productDetail?.description}</Typography>
                    </div>
                </div>
            </div>
            <RelativeProduct productId={productDetail?.id} slug={productDetail?.category?.slug} />
        </div>
    )
}

export default ProductDetailPage
