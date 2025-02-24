import { ListCategory, ListProduct } from './components'
import { Typography } from '@/components'

import { API_URL } from '@/constants'
import { getApiUrl } from '@/lib'
import { CategoryModel } from '@/models'

const fetchCategories = (): Promise<CategoryModel[]> => {
    return fetch(getApiUrl(API_URL.CATEGORIES)).then((res) => res.json())
}

const ProductPage = async () => {
    const categories = await fetchCategories()

    return (
        <div className="container grid grid-cols-[300px_1fr] divide-x-[1px] py-10">
            <div className="space-y-4 pr-4">
                <ListCategory categories={categories} />
            </div>
            <div className="pl-4">
                <Typography as="h1" variant="h1" className="text-center">
                    Sản phẩm
                </Typography>
                <Typography className="mt-4 text-center">
                    Một số dòng sản phẩm nổi bật của công ty chúng tôi đang kinh doanh hiện nay trên
                    thị trường
                </Typography>
                <ListProduct categories={categories} />
            </div>
        </div>
    )
}

export default ProductPage
