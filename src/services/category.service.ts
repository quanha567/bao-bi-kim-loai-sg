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
    generateSlug: (name: string) =>
        name
            .toLowerCase() // Convert to lowercase
            .normalize('NFD') // Normalize to decompose special characters
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
            .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters (keep spaces and hyphens)
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Collapse multiple hyphens into one
            .trim() // Remove leading and trailing spaces or hyphens
            .replace(/^-|-$/g, ''),
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
