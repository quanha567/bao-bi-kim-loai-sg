import Image from 'next/image'

import ProductImg from '@/public/kem.png'

import { Typography } from './common'

export const ProductItem = () => {
    return (
        <div className="cursor-pointer space-y-1.5">
            <div className="overflow-hidden rounded-lg border bg-foreground transition-all hover:scale-105">
                <Image alt="product" src={ProductImg} />
            </div>
            <Typography variant="bold-lg" className="text-center">
                Thùng tròn
            </Typography>
        </div>
    )
}
