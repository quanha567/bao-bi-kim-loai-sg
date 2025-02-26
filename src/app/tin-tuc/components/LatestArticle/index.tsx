import { CircleUserRound } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '@/components'

import { formatDate } from '@/lib'
import { ArticleModel } from '@/models'

interface LatestArticleProps {
    article: ArticleModel
}

export const LatestArticle = ({ article }: LatestArticleProps) => {
    return (
        <Link
            href={article?.slug}
            className="relative block aspect-[21/9] cursor-pointer overflow-hidden rounded-lg"
        >
            <Image
                width={1920}
                height={1080}
                alt="latest article"
                src={article?.thumbnail}
                className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/20"></span>
            <span className="absolute bottom-2 left-2 space-y-2 text-background lg:bottom-6 lg:left-8">
                <Typography as="h2" variant="h2" className="line-clamp-2 max-w-xl text-pretty">
                    {article?.title}
                </Typography>
                <span className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <CircleUserRound size={18} />
                        <Typography as="span">Admin</Typography>
                    </span>
                    <span>{formatDate(article?.createdAt)}</span>
                </span>
            </span>
        </Link>
    )
}
