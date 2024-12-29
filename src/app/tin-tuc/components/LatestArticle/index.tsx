import { CircleUserRound } from 'lucide-react'

import Image from 'next/image'

import { Typography } from '@/components'

import { formatDate } from '@/lib'
import ArticleBanner from '@/public/article.jpg'

export const LatestArticle = () => {
    return (
        <div className="relative aspect-[21/9] cursor-pointer overflow-hidden rounded-lg">
            <Image
                src={ArticleBanner}
                alt="latest article"
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-8 space-y-2 text-background">
                <Typography as="h2" variant="h2" className="line-clamp-2 max-w-xl text-pretty">
                    Sự khác biệt của dịch vụ chăm sóc khách hàng của Nam Việt
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <CircleUserRound size={18} />
                        <Typography as="span">Admin</Typography>
                    </div>
                    <div>{formatDate(new Date())}</div>
                </div>
            </div>
        </div>
    )
}
