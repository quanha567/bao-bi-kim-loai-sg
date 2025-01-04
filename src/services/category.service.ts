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
    updateCategory: async (id: string, name: string, slug: string) =>
        prisma.category.update({ data: { name, slug }, where: { id } }),
    generateSlug: (name: string) => name.toLowerCase().replace(/\s+/g, '-'),
}
