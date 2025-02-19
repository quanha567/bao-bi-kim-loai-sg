import { prisma } from '@/db'
import { ProductModel } from '@/models'

export const productService = {
    checkIsExistSlug: async (slug: string) => !!prisma.product.count({ where: { slug } }),
    createProduct: async (data: ProductModel) => {
        const { category, ...rest } = data

        return prisma.product.create({
            data: {
                ...rest,
                image: typeof rest.image === 'string' ? rest.image : null,
                imageHover: typeof rest.imageHover === 'string' ? rest.imageHover : null,
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
        slug: string, // Để slug là optional
        category: string, // Để category là optional
    ) => {
        const skip = pageIndex * pageSize

        const whereCondition = {
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
            ...(slug ? { slug } : {}), // Nếu có slug thì lọc theo slug, nếu không thì bỏ qua
            ...(category ? { category: { slug: category } } : {}), // Nếu có category thì lọc, nếu không thì bỏ qua
        }

        const [products, total] = await prisma.$transaction([
            prisma.product.findMany({
                orderBy: {
                    [sortBy]: 'asc',
                },
                skip,
                take: pageSize,
                where: whereCondition,
                include: {
                    category: true,
                },
            }),
            prisma.product.count({
                where: whereCondition,
            }),
        ])

        return { products, total }
    },
    updateProduct: async (data: ProductModel) => {
        const { category, id, ...rest } = data

        return prisma.product.update({
            data: {
                ...rest,
                image: typeof rest.image === 'string' ? rest.image : null,
                imageHover: typeof rest.imageHover === 'string' ? rest.imageHover : null,
                category: {
                    connect: { id: category.id },
                },
            },
            where: { id },
        })
    },
    generateSlug: (name: string) => name.toLowerCase().replace(/\s+/g, '-'),
}
