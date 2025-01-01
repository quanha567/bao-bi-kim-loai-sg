import { prisma } from '@/db'
import { ProductModel } from '@/models'

export const productService = {
    checkIsExistSlug: async (slug: string) => !!prisma.product.count({ where: { slug } }),
    createProduct: async (data: ProductModel) => {
        const { category, ...rest } = data

        return prisma.product.create({
            data: {
                ...rest,
                category: {
                    connect: { id: category.id },
                },
            },
        })
    },
    deleteProducts: async (ids: string[]) =>
        prisma.product.deleteMany({ where: { id: { in: ids } } }),
    getProducts: async (
        pageIndex: number,
        pageSize: number,
        searchText: string,
        sortBy: string,
    ) => {
        const skip = pageIndex * pageSize

        const [categories, total] = await prisma.$transaction([
            prisma.product.findMany({
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
                            category: {
                                name: {
                                    contains: searchText,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    ],
                },
            }),
            prisma.product.count({
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
    updateProduct: async (data: ProductModel) => {
        const { category, ...rest } = data

        return prisma.product.update({
            data: {
                ...rest,
                category: {
                    connect: { id: category.id },
                },
            },
            where: { id: data.id },
        })
    },
    generateSlug: (name: string) => name.toLowerCase().replace(/\s+/g, '-'),
}
