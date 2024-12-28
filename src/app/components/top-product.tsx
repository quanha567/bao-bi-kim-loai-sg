import { ProductItem, Typography } from '@/components'

export const TopProduct = () => {
    return (
        <div className="container flex flex-col items-center py-10">
            <div className="mb-5 h-[120px] w-[1px] bg-[#808080]"></div>
            <Typography variant="h2" className="mb-2 font-normal">
                CHÀO MỪNG ĐẾN VỚI
            </Typography>
            <Typography as="h1" variant="h1">
                BAO BÌ KIM LOẠI SÀI GÒN SAMEPACK
            </Typography>
            <div className="mt-6 grid grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                    <ProductItem key={index} />
                ))}
            </div>
        </div>
    )
}
