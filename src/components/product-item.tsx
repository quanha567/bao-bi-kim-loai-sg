import Image from 'next/image'

import { ProductModel } from '@/models'

import { Typography } from './common'

type ProductItemProps = ProductModel

export const ProductItem = ({ name, image }: ProductItemProps) => {
    return (
        <div className="cursor-pointer space-y-1.5">
            <div className="overflow-hidden rounded-lg border bg-zinc-100 transition-all hover:scale-105">
                {image && <Image width={300} height={300} alt="product" src={String(image)} />}
            </div>
            <Typography variant="bold-lg" className="text-center">
                {name}
            </Typography>
        </div>
    )
}
