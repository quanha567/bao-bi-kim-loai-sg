import Image from 'next/image'
import Link from 'next/link'

import { DEFAULT_PATH } from '@/constants'
import { ProductModel } from '@/models'

import { Typography } from './common'

type ProductItemProps = ProductModel

export const ProductItem = ({ name, image, slug }: ProductItemProps) => {
    return (
        <Link className="cursor-pointer space-y-1.5" href={`${DEFAULT_PATH.PRODUCT}/${slug}`}>
            <div className="overflow-hidden rounded-lg border bg-zinc-100 transition-all hover:scale-105">
                {image && <Image width={300} height={300} alt="product" src={String(image)} />}
            </div>
            <Typography variant="bold-lg" className="line-clamp-2 text-center">
                {name}
            </Typography>
        </Link>
    )
}
