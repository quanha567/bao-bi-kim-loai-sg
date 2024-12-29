import { CircleUserRound } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '@/components'

import { formatDate } from '@/lib'
import ArticleBanner from '@/public/article.jpg'

export const ArticleItem = () => {
    return (
        <Link href={'#'} className="rounded-lg border bg-background p-2">
            <Image
                alt="article"
                src={ArticleBanner}
                className="aspect-video rounded-md object-cover"
            />
            <span className="inline-block p-1.5">
                <Typography as="span" className="mt-1 inline-block text-pretty font-medium">
                    Sự khác biệt của dịch vụ chăm sóc khách hàng của Nam Việt
                </Typography>
                <span className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <CircleUserRound size={18} />
                        <Typography as="span">Admin</Typography>
                    </span>
                    <span>{formatDate(new Date())}</span>
                </span>
            </span>
        </Link>
    )
}
