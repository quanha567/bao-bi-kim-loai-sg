import Link from 'next/link'

import { Typography } from '@/components'

import { DEFAULT_PATH } from '@/constants'

export const ProductBreadcrumb = () => {
    return (
        <div className="flex items-center gap-2">
            <Link href="/">
                <Typography as="span" variant="link" className="cursor-pointer">
                    Trang chủ
                </Typography>
            </Link>
            <Typography as="span" variant="link" className="cursor-pointer">
                /
            </Typography>
            <Link href={DEFAULT_PATH.PRODUCT}>
                <Typography as="span" variant="link" className="cursor-pointer">
                    Danh mục sản phẩm
                </Typography>
            </Link>
        </div>
    )
}
