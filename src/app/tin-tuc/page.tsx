import { ArticleItem, LatestArticle } from './components'
import { Button, Typography } from '@/components'

import { articleApi } from '@/apiClient'

const NewsPage = async () => {
    const blogs = await articleApi.search({})

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
