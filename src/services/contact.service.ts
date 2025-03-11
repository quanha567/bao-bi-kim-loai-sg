import { prisma } from '@/db'
import { ContactModel } from '@/models'

export const contactService = {
    searchContacts: async ({
        pageIndex,
        pageSize,
        searchText,
        sortBy,
    }: {
        pageIndex: number
        pageSize: number
        searchText: string
        sortBy: string
    }) => {
        const skip = pageIndex * pageSize

        const [contacts, total] = await prisma.$transaction([
            prisma.contact.findMany({
                orderBy: {
                    [sortBy]: 'asc',
                },
                skip,
                take: pageSize,
                where: {
                    OR: [
                        {
                            name: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                        {
                            email: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                        {
                            phone: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
            }),
            prisma.contact.count({
                where: {
                    OR: [
                        {
                            name: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                        {
                            email: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                        {
                            phone: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
            }),
        ])

        return { contacts, total }
    },
    createContact: async (data: ContactModel) => {
        return prisma.contact.create({
            data,
        })
    },
    updateContact: async (data: ContactModel) => {
        const { id, ...rest } = data
        return prisma.contact.update({
            data: rest,
            where: { id },
        })
    },
    deleteContacts: async (ids: string[]) =>
        prisma.contact.deleteMany({ where: { id: { in: ids } } }),
}
