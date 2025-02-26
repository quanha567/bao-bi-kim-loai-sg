'use client'

import { useQuery } from '@tanstack/react-query'

import Link from 'next/link'

import { articleApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'

import { Typography } from './common'

export const RelativeArticle = () => {
    const { data: articles } = useQuery({
        queryKey: [QUERY_KEY.ARTICLES],
        queryFn: () => articleApi.search({}),
    })

    return (
        <>
            <Typography as="h4" variant="h4" className="uppercase">
                Bài viết liên quan
            </Typography>
            <div className="mt-4 grid divide-y-[1px]">
                {articles?.data?.map((article) => (
                    <Link key={article.id} href={article.slug}>
                        <Typography
                            as="span"
                            variant="link"
                            className="block py-1.5 hover:underline"
                        >
                            {article.title}
                        </Typography>
                    </Link>
                ))}
            </div>
        </>
    )
}
