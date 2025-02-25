import { Metadata } from 'next'

import { ArticleItem, LatestArticle } from './components'
import { Button, Typography } from '@/components'

import { API_URL } from '@/constants'
import { getApiUrl } from '@/lib'
import { ArticleModel } from '@/models'
import { ApiListResponse } from '@/types'

export const metadata: Metadata = {
    title: 'Tin tức và sự kiện',
    description: 'Cập nhật tin tức và sự kiện mới nhất từ cộng đồng',
}

const fetchArticles = (): Promise<ApiListResponse<ArticleModel>> => {
    return fetch(getApiUrl(`${API_URL.ARTICLES}/search`)).then((res) => res.json())
}

const NewsPage = async () => {
    const blogs = await fetchArticles()

    return (
        <div className="container space-y-6 py-10">
            <Typography as="h1" variant="h1" className="text-center">
                Tin tức và sự kiên
            </Typography>
            <LatestArticle article={blogs?.data?.[0]} />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {blogs?.data?.map((article) => <ArticleItem key={article?.id} {...article} />)}
            </div>
            <div className="flex justify-center">
                <Button variant="outline">Xem thêm</Button>
            </div>
        </div>
    )
}

export default NewsPage
