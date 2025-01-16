import { prisma } from '@/db'
import { PageModel } from '@/models'

export const pageService = {
    createPage: async (data: PageModel) => {
        return prisma.page.create({ data })
    },
    updatePage: async (data: PageModel) => {
        const { id, ...rest } = data

        return await prisma.page.update({
            where: { id },
            data: { ...rest },
        })
    },
    deletePages: async (ids: string[]) => prisma.page.deleteMany({ where: { id: { in: ids } } }),
    getAll: async () => prisma.page.findMany(),
    getPages: async (pageIndex: number, pageSize: number, searchText: string, sortBy: string) => {
        const skip = pageIndex * pageSize

        const [pages, total] = await prisma.$transaction([
            prisma.page.findMany({
                orderBy: {
                    [sortBy]: 'asc',
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
            prisma.page.count({
                where: {
                    name: {
                        contains: searchText,
                        mode: 'insensitive',
                    },
                },
            }),
        ])

        return { pages, total }
    },
}
