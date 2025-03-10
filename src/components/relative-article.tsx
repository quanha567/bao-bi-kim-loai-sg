'use client'

import { useQuery } from '@tanstack/react-query'

import Link from 'next/link'

import { articleApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'

import { Typography } from './common'
import { Skeleton } from './ui'

export const RelativeArticle = () => {
    const { data: articles, isLoading: isLoadingRelativeArticles } = useQuery({
        queryKey: [QUERY_KEY.ARTICLES],
        queryFn: () => articleApi.search({}),
    })

    return (
        <div className="lg:sticky lg:top-10">
            <Typography as="h4" variant="h4" className="uppercase">
                Bài viết liên quan
            </Typography>
            <div className="mt-4 grid divide-y-[1px]">
                {true
                    ? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} />)
                    : articles?.data?.map((article) => (
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
        </div>
    )
}
