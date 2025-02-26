'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components'

import { HomeConfigModel } from '@/models'

type HomeCarouselProps = Pick<HomeConfigModel, 'sliders'>

export const HomeCarousel = ({ sliders }: HomeCarouselProps) => {
    if (!sliders?.length) return <></>

    return (
        <Carousel
            className="w-full"
            opts={{
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
        >
            <CarouselContent>
                {sliders.map((src, index) => (
                    <CarouselItem key={index}>
                        <div className="aspect-video lg:aspect-[21/9]">
                            <Image
                                priority
                                width={1920}
                                alt="banner"
                                src={String(src)}
                                height={(1920 * 9) / 21}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-5 bg-white/20 transition-all hover:scale-125" />
            <CarouselNext className="right-5 bg-white/20 transition-all hover:scale-125" />
        </Carousel>
    )
}
