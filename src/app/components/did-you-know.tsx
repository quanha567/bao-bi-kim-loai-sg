import Image from 'next/image'

import { Typography } from '@/components'

import Reason1 from '@/public/reason1.png'
import Reason2 from '@/public/reason2.png'
import Reason3 from '@/public/reason3.png'
import Reason4 from '@/public/reason4.png'

const reasons = [
    {
        description: 'Chăm sóc khách hàng chu đáo và chuyên nghiệp',
        img: Reason1,
    },
    {
        description: 'Công nghệ mới  và hiện đại',
        img: Reason2,
    },
    {
        description: 'Cơ sở hạ tầng tiềm năng đáp ứng nhu cầu khách hàng',
        img: Reason3,
    },
    {
        description: 'Bảo vệ môi trường là ưu tiên hàng đầu',
        img: Reason4,
    },
]

export const DidYouKnow = () => {
    return (
        <div className="container py-10">
            <div className="mb-16">
                <Typography as="h2" variant="h2">
                    Bạn có biết
                </Typography>
                <Typography as="h3" variant="h3" className="mt-2 font-normal">
                    Điều gì tạo nên sự khác biệt của chúng tôi?
                </Typography>
                <div className="mt-6 h-[1px] w-full max-w-[500px] bg-[#808080]"></div>
            </div>
            <div className="grid grid-cols-4 gap-8">
                {reasons.map((reason, index) => (
                    <div
                        key={index}
                        className="flex cursor-pointer flex-col items-center gap-2 transition-all hover:-translate-y-2"
                    >
                        <div className="aspect-square w-1/2 overflow-hidden rounded-lg border">
                            <Image
                                alt="reason"
                                src={reason.img}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <Typography className="text-pretty text-center font-medium">
                            {reason.description}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}
