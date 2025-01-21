import { prisma } from '@/db'
import { HomeConfigRequestModel } from '@/models'

export const homeConfigService = {
    getHomeConfig: async () => {
        return await prisma.homeConfig.findFirst()
    },
    createOrUpdateHomeConfig: async (data: HomeConfigRequestModel) => {
        console.log('createOrUpdateHomeConfig:  data:', data)
        if (data?.id) {
            const { id, ...rest } = data
            // Ensure the ID is valid before updating
            return await prisma.homeConfig.update({
                where: { id },
                data: {
                    ...rest,
                    products: {
                        set: data.products.map((product) => ({ id: product.id })),
                    },
                },
            })
        }

        // Handle create case
        return await prisma.homeConfig.create({
            data: {
                ...data,
                products: {
                    create:
                        data.products?.map((product) => ({
                            id: product.id,
                            name: product.name,
                            slug: product.slug,
                            category: {
                                connect: { id: product.category.id },
                            },
                        })) || [],
                },
            }, // Ensure `data` has required fields for creation
        })
    },
    deleteSetting: async () => prisma.homeConfig.deleteMany(),
}
