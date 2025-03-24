import { prisma } from '@/db'
import { AdminAccountCreateModal } from '@/models'

export const adminAccountService = {
    create: (data: AdminAccountCreateModal) => {
        return prisma.adminAccount.create({ data })
    },
    findByEmail: (email: string) => prisma.adminAccount.findUnique({ where: { email } }),
    search: () => prisma.adminAccount.findMany(),
}
