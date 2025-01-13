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
}
