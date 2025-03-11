import slugify from 'slug'

import { prisma } from '@/db'
import { ArticleModel } from '@/models'

export const articleService = {
    checkIsExistSlug: async (slug: string) => !!prisma.article.count({ where: { slug } }),
    createArticle: async (data: ArticleModel) => {
        return prisma.article.create({
            data: {
                ...data,
                thumbnail: typeof data.thumbnail === 'string' ? data.thumbnail : undefined,
            },
        })
    },
    getArticle: async (id: string) => prisma.article.findUnique({ where: { id } }),
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
        const { id, ...rest } = data
        return prisma.article.update({
            data: {
                ...rest,
                thumbnail: typeof data.thumbnail === 'string' ? data.thumbnail : null,
            },
            where: { id },
        })
    },
    generateSlug: async (name: string) => {
        const baseSlug = slugify(name)

        let slug = baseSlug
        let counter = 1

        // Check if the base slug already exists
        const existingSlug = await prisma.article.findFirst({
            where: { slug: baseSlug },
            select: { slug: true },
        })

        if (existingSlug) {
            // If the base slug exists, find a unique one by appending a counter
            while (await prisma.article.findFirst({ where: { slug } })) {
                slug = `${baseSlug}-${counter}`
                counter++
            }
        }

        return slug
    },
    getBySlug: async (slug: string) => prisma.article.findUnique({ where: { slug } }),
}
