import { prisma } from '@/db'
import { PageModel } from '@/models'

export const pageService = {
    createPage: async (data: PageModel) => {
        return prisma.page.create({ data })
    },
    updatePage: async (data: PageModel) => {
        return prisma.page.update({ where: { id: data?.id }, data })
    },
    deletePages: async (ids: string[]) => prisma.page.deleteMany({ where: { id: { in: ids } } }),
    getAll: async () => prisma.page.findMany(),
}
