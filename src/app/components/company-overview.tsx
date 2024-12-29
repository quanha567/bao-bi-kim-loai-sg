import Image from 'next/image'

import OvvImg1 from '@/public/article.jpg'
import OvvImg2 from '@/public/ovv2.png'
import OvvImg3 from '@/public/ovv3.png'
import OvvImg4 from '@/public/ovv4.png'

export const CompanyOverview = () => {
    const imgs = [OvvImg1, OvvImg2, OvvImg3, OvvImg4]

    return (
        <div className="container pb-10 lg:pb-20">
            <div className="mx-auto grid grid-cols-2 lg:max-w-5xl">
                {imgs.map((img, index) => (
                    <div key={index} className="aspect-video overflow-hidden">
                        <Image
                            src={img}
                            alt="OvvImg1"
                            className="h-full w-full cursor-pointer object-cover transition-all hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
