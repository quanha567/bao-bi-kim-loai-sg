import { prisma } from '@/db'
import { ArticleModel } from '@/models'

export const articleService = {
    checkIsExistSlug: async (slug: string) => !!prisma.article.count({ where: { slug } }),
    createArticle: async (data: ArticleModel) => {
        return prisma.article.create({
            data,
        })
    },
    deleteArticles: async (ids: string[]) =>
        prisma.article.deleteMany({ where: { id: { in: ids } } }),
    getArticles: async (
        pageIndex: number,
        pageSize: number,
        searchText: string,
        sortBy: string,
    ) => {
        const skip = pageIndex * pageSize

        const [articles, total] = await prisma.$transaction([
            prisma.article.findMany({
                orderBy: {
                    [sortBy]: 'asc',
                },
                skip,
                take: pageSize,
                where: {
                    OR: [
                        {
                            title: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                        {
                            content: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
            }),
            prisma.article.count({
                where: {
                    OR: [
                        {
                            title: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                        {
                            content: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
            }),
        ])

        return { articles, total }
    },
    updateArticle: async (data: ArticleModel) => {
        return prisma.product.update({
            data,
            where: { id: data.id },
        })
    },
    generateSlug: (name: string) => name.toLowerCase().replace(/\s+/g, '-'),
}
