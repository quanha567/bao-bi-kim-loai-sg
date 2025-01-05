import { Typography } from '@/components'
import 'react-quill-new/dist/quill.snow.css'

import { articleApi } from '@/apiClient'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const articleDetail = await articleApi.getOne(slug)

    return (
        <article className="bg-white">
            <Typography as="h1" variant="h1" className="mb-4">
                {articleDetail?.title}
            </Typography>
            <div
                className="view ql-editor"
                dangerouslySetInnerHTML={{
                    __html: articleDetail?.content,
                }}
            ></div>
        </article>
    )
}
