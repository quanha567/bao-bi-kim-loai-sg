import { ProductItem, Typography } from '@/components'

import { HomeConfigModel, ProductModel } from '@/models'

type TopProductProps = Pick<HomeConfigModel, 'products'>

export const TopProduct = ({ products }: TopProductProps) => {
    if (!products?.length) return <></>

    return (
        <div className="container flex flex-col items-center py-4 lg:py-10">
            <div className="mb-5 h-12 w-[1px] bg-[#808080] lg:h-[120px]"></div>
            <Typography variant="h2" className="mb-2 font-normal">
                CHÀO MỪNG ĐẾN VỚI
            </Typography>
            <Typography as="h1" variant="h1" className="text-center">
                BAO BÌ KIM LOẠI SÀI GÒN SAMEPACK
            </Typography>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
                {(products as ProductModel[]).map((product) => (
                    <ProductItem key={product?.id} {...product} />
                ))}
            </div>
        </div>
    )
}
