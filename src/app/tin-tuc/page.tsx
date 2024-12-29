import { ArticleItem, LatestArticle } from './components'
import { Button, Typography } from '@/components'

const NewsPage = () => {
    return (
        <div className="container space-y-6 py-10">
            <Typography as="h1" variant="h1" className="text-center">
                Tin tức và sự kiên
            </Typography>
            <LatestArticle />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ArticleItem key={index} />
                ))}
            </div>
            <div className="flex justify-center">
                <Button variant="outline">Xem thêm</Button>
            </div>
        </div>
    )
}

export default NewsPage
