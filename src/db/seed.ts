import { prisma } from './connection'

async function main() {
    const category = await prisma.category.create({
        data: {
            name: 'Thùng tròn',
            slug: 'thung-tron',
        },
    })

    console.log({ category })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
