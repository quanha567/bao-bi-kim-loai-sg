import { Plus } from 'lucide-react'
import React from 'react'

import Image from 'next/image'
import { notFound } from 'next/navigation'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Typography,
} from '@/components'

import { productApi } from '@/apiClient'

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params
    const product = await productApi.search({ slug })
    const productDetail = product?.data?.[0]

    if (!productDetail) {
        return notFound()
    }

    return (
        <div className="container space-y-10 py-10">
            <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div>
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {[productDetail?.image, productDetail?.imageHover]
                                .filter(Boolean)
                                .map((img, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Image
                                                src={img}
                                                width={500}
                                                height={500}
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
                </div>
                <div className="space-y-4">
                    <Typography as="h1" variant="h1" className="!text-2xl">
                        {productDetail.name}
                    </Typography>
                    <Typography as="h5" variant="h5" className="text-primary">
                        Liên hệ
                    </Typography>

                    <div className="space-y-2">
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
                    </div>
                    <div className="space-y-2">
                        <Typography as="h5" variant="h5">
                            Mô tả sản phẩm
                        </Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod corrupti
                            similique error repudiandae neque eveniet accusamus soluta ex dolore
                            eum, minima sapiente porro eaque veritatis voluptates dolores inventore
                            harum possimus.
                        </Typography>
                    </div>
                </div>
            </div>
            <div>
                <Typography as="h5" variant="h5">
                    Sản phẩm liên quan
                </Typography>
            </div>
        </div>
    )
}

export default ProductDetailPage
