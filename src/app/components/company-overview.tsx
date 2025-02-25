import Image from 'next/image'

import { Typography } from '@/components'

import { HomeConfigModel } from '@/models'

type CompanyOverviewProps = Pick<HomeConfigModel, 'extras'>

export const CompanyOverview = ({ extras }: CompanyOverviewProps) => {
    if (!extras?.length) return <></>

    return (
        <div className="container pb-10 lg:pb-20">
            <div className="mx-auto grid grid-cols-2 lg:max-w-5xl">
                {extras.map((extra, index) => (
                    <div key={index} className="relative aspect-video overflow-hidden">
                        <Image
                            width={500}
                            height={500}
                            src={String(extra.image)}
                            alt={extra.title || "my company's image"}
                            className="h-full w-full cursor-pointer object-cover transition-all hover:scale-110"
                        />
                        {extra.title && (
                            <>
                                <div className="absolute inset-0 bg-white/30"></div>
                                <Typography
                                    variant="bold-lg"
                                    className="absolute left-1/2 top-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2 text-pretty text-center text-4xl"
                                >
                                    {extra.title}
                                </Typography>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
