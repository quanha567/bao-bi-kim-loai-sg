import slugify from 'slug'

import { prisma } from '@/db'
export const categoryService = {
    checkIsExistSlug: async (slug: string) => !!prisma.category.count({ where: { slug } }),
    createCategory: async (name: string, slug: string) =>
        prisma.category.create({ data: { name, slug } }),
    deleteCategories: async (ids: string[]) =>
        prisma.category.deleteMany({ where: { id: { in: ids } } }),
    getCategories: async (
        pageIndex: number,
        pageSize: number,
        searchText: string,
        sortBy: string,
    ) => {
        const skip = pageIndex * pageSize

        const [categories, total] = await prisma.$transaction([
            prisma.category.findMany({
                orderBy: {
                    [sortBy]: 'desc',
                },
                skip,
                take: pageSize,
                where: {
                    name: {
                        contains: searchText,
                        mode: 'insensitive',
                    },
                },
                select: {
                    products: true,
                    id: true,
                    name: true,
                    slug: true,
                },
            }),
            prisma.category.count({
                where: {
                    name: {
                        contains: searchText,
                        mode: 'insensitive',
                    },
                },
            }),
        ])

        return { categories, total }
    },
    updateCategory: async (id: string, name: string, slug: string) => {
        return prisma.category.update({ data: { name, slug }, where: { id } })
    },
    generateSlug: async (name: string) => {
        const baseSlug = slugify(name)

        let slug = baseSlug
        let counter = 1

        // Check if the base slug already exists
        const existingSlug = await prisma.category.findFirst({
            where: { slug: baseSlug },
            select: { slug: true },
        })

        if (existingSlug) {
            // If the base slug exists, find a unique one by appending a counter
            while (await prisma.category.findFirst({ where: { slug } })) {
                slug = `${baseSlug}-${counter}`
                counter++
            }
        }

        return slug
    },
    getAll: async () =>
        prisma.category.findMany({
            select: {
                products: {
                    select: {
                        id: true,
                    },
                },
                name: true,
                id: true,
                slug: true,
            },
        }),
}
