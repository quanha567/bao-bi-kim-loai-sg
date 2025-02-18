import { User } from 'lucide-react'

import { headers } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { RelativeArticle, Typography } from '@/components'

import 'react-quill-new/dist/quill.snow.css'

import { API_URL } from '@/constants'
import { formatDate, getApiUrl } from '@/lib'

const fetchArticle = (slug: string) => {
    return fetch(getApiUrl(`${API_URL.ARTICLES}/${slug}`)).then((res) => res.json())
}

const ArticleDetail = async ({ params }: Readonly<{ params: { slug: string } }>) => {
    headers()

    const { slug } = params
    const article = await fetchArticle(slug)

    if (!article) {
        return notFound()
    }

    return (
        <div className="container gap-4 py-10 lg:grid lg:grid-cols-[3fr_1fr] lg:divide-x-[1px]">
            <div className="space-y-4 lg:pr-4">
                <Typography as="h1" variant="h1">
                    {article.title}
                </Typography>
                <div className="flex items-center gap-4">
                    <User size={20} />
                    <Typography as="span" variant="link">
                        Admin
                    </Typography>
                    <Typography as="span" variant="link">
                        {formatDate(article.createdAt)}
                    </Typography>
                </div>
                <Image
                    width={1920}
                    height={1080}
                    alt={article.title}
                    src={article.thumbnail}
                    className="rounded-lg object-cover"
                />
                <div
                    className="prose prose-stone"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                ></div>
            </div>
            <div className="mt-10 lg:mt-0 lg:pl-4">
                <RelativeArticle />
            </div>
        </div>
    )
}

export default ArticleDetail
