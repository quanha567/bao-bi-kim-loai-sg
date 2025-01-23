import Image from 'next/image'

import { Typography } from '@/components'

import { HomeConfigModel } from '@/models'

type DidYouKnowProps = Pick<HomeConfigModel, 'doYouKnows'>

export const DidYouKnow = ({ doYouKnows }: DidYouKnowProps) => {
    if (!doYouKnows?.length) return <></>

    return (
        <div className="container py-10">
            <div className="mb-16">
                <Typography as="h2" variant="h2">
                    Bạn có biết
                </Typography>
                <Typography as="h3" variant="h3" className="mt-2 font-normal">
                    Điều gì tạo nên sự khác biệt của chúng tôi?
                </Typography>
                <div className="mt-2 h-[1px] w-3/4 max-w-[500px] bg-[#808080] lg:mt-6 lg:w-full"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
                {doYouKnows.map((reason, index) => (
                    <div
                        key={index}
                        className="flex cursor-pointer flex-col items-center gap-2 transition-all hover:-translate-y-2"
                    >
                        <div className="aspect-square w-3/4 overflow-hidden rounded-lg border lg:w-1/2">
                            <Image
                                width={300}
                                height={300}
                                alt={reason.title}
                                src={String(reason.image)}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <Typography className="text-pretty text-center font-medium">
                            {reason.title}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}
