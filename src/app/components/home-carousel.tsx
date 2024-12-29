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

import Article from '@/public/article.jpg'
import Banner from '@/public/banner.png'

export const HomeCarousel = () => {
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
                {[Banner, Article].map((src, index) => (
                    <CarouselItem key={index}>
                        <div className="aspect-video lg:aspect-[21/9]">
                            <Image src={src} alt="banner" className="h-full w-full object-cover" />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-5 bg-white/20 transition-all hover:scale-125" />
            <CarouselNext className="right-5 bg-white/20 transition-all hover:scale-125" />
        </Carousel>
    )
}
