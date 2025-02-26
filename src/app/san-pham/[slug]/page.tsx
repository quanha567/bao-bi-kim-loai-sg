import React from 'react'

import { Metadata } from 'next'
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
import { ProductModel } from '@/models'
import { ApiListResponse } from '@/types'

const fetchProduct = (slug: string): Promise<ApiListResponse<ProductModel>> => {
    return fetch(getApiUrl(`${API_URL.PRODUCTS}/search?slug=${slug}`)).then((res) => res.json())
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const { slug } = await params
    const product = await fetchProduct(slug)
    const productDetail = product?.data?.[0]

    if (!productDetail) {
        return notFound()
    }

    return {
        title: productDetail?.name,
        description: productDetail?.description,
        openGraph: {
            images: [
                {
                    url: String(productDetail?.image),
                    width: 500,
                    height: 500,
                    alt: productDetail?.name,
                },
            ],
        },
        robots: 'index,follow',
        category: productDetail?.category?.name,
        keywords: productDetail?.category?.name,
    }
}

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params
    const product = await fetchProduct(slug)
    const productDetail = product?.data?.[0]

    if (!productDetail) {
        return notFound()
    }

    const productImages = [productDetail?.image, productDetail?.imageHover].filter(Boolean)

    return (
        <div className="container space-y-3 pb-10 pt-4">
            <ProductBreadcrumb />
            <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
                <Carousel className="w-full lg:max-w-xs">
                    <CarouselContent>
                        {productImages.map((img, index) => (
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
                    <Typography as="h4" variant="h4" className="text-primary">
                        Liên hệ
                    </Typography>
                    <div className="space-y-2">
                        <Typography as="h4" variant="h4">
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
