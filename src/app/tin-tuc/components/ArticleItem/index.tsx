import { CircleUserRound } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '@/components'

import { formatDate } from '@/lib'
import { ArticleModel } from '@/models'

type ArticleItemProps = ArticleModel

export const ArticleItem = ({ slug, title, thumbnail, createdAt }: ArticleItemProps) => {
    return (
        <Link href={`${slug}`} className="flex flex-col rounded-lg border bg-background p-2">
            <Image
                width={300}
                height={200}
                alt="article"
                src={thumbnail}
                className="aspect-video rounded-md object-cover"
            />
            <span className="flex flex-1 flex-col gap-1.5 p-1.5">
                <Typography as="span" className="line-clamp-2 flex-1 text-pretty font-medium">
                    {title}
                </Typography>
                <span className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <CircleUserRound size={18} />
                        <Typography as="span">Admin</Typography>
                    </span>
                    <span>{formatDate(createdAt)}</span>
                </span>
            </span>
        </Link>
    )
}
