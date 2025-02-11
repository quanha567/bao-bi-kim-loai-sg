import Link from 'next/link'

import { Typography } from '@/components'

import { DEFAULT_PATH } from '@/constants'
import { CategoryModel } from '@/models'

interface ListCategoryProps {
    categories: CategoryModel[]
}

export const ListCategory = ({ categories = [] }: ListCategoryProps) => {
    return (
        <div>
            <div className="mb-2 w-fit border-b border-[#808080] pb-1">
                <Typography as="h3" variant="bold-lg">
                    Danh mục sản phẩm
                </Typography>
            </div>
            <div className="flex flex-col">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        className={`py-1 hover:underline`}
                        href={`${DEFAULT_PATH.PRODUCT}?category=${category.slug}`}
                    >
                        <Typography as="span" variant="link" className="!text-current">
                            {category.name} ({category.products?.length || 0})
                        </Typography>
                    </Link>
                ))}
            </div>
        </div>
    )
}
