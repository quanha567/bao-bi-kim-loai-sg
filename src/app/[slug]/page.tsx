import { User } from 'lucide-react'

import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import 'react-quill-new/dist/quill.snow.css'

import { RelativeArticle, Typography } from '@/components'

import { API_URL } from '@/constants'
import { formatDate, getApiUrl } from '@/lib'
import { ArticleModel } from '@/models'

const fetchArticle = (slug: string): Promise<ArticleModel> => {
    return fetch(getApiUrl(`${API_URL.ARTICLES}/${slug}`)).then((res) => res.json())
}

export const generateMetadata = async ({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> => {
    const { slug } = params
    const article = await fetchArticle(slug)

    if (!article) {
        return notFound()
    }

    return {
        title: article.title,
        description: article.content,
        openGraph: {
            images: [
                {
                    url: String(article.thumbnail),
                    width: 500,
                    height: 500,
                    alt: article.title,
                },
            ],
        },
        robots: 'index,follow',
        referrer: 'no-referrer',
        authors: [{ name: 'Admin' }],
        keywords: article.tags.join(', '),
    }
}

const ArticleDetail = async ({ params }: Readonly<{ params: { slug: string } }>) => {
    const { slug } = params
    const article = await fetchArticle(slug)

    if (!article) {
        return notFound()
    }

    return (
        <div className="container gap-4 py-6 lg:grid lg:grid-cols-[3fr_1fr] lg:divide-x-[1px] lg:py-10">
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
                    src={String(article.thumbnail)}
                    className="rounded-lg object-cover"
                />
                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
            <div className="mt-10 lg:mt-0 lg:pl-4">
                <RelativeArticle />
            </div>
        </div>
    )
}

export default ArticleDetail
