import { ListCategory } from './components'
import {
    Checkbox,
    ProductItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Typography,
} from '@/components'

import { categoryApi } from '@/apiClient'

const categories = [
    {
        name: 'Thùng, lon tròn sơn hóa chất',
        quantity: 6,
    },
    {
        name: 'Thùng, lon vuông sơn hóa chất',
        quantity: 6,
    },
    {
        name: 'Thùng, lon hóa chất khác',
        quantity: 6,
    },
    {
        name: 'Hộp bánh kẹo tròn',
        quantity: 6,
    },
    {
        name: 'Hộp bánh kẹo vuông, chữ nhật',
        quantity: 6,
    },
    {
        name: 'Hộp mỹ nghệ',
        quantity: 6,
    },
    {
        name: 'Lon sữa',
        quantity: 6,
    },
    {
        name: 'Hộp trà',
        quantity: 6,
    },
    {
        name: 'Nắp nút các loại',
        quantity: 6,
    },
]

const v = [0.5, 1, 5, 20]
const sizes = ['Ø 190×225', 'Ø 155×170', 'Ø 110×100', 'Ø 100×75']

const ProductPage = async () => {
    const categories = await categoryApi.getAll()
    return (
        <div className="container grid grid-cols-[300px_1fr] divide-x-[1px] py-10">
            <div className="space-y-4 pr-4">
                <ListCategory categories={categories} />
                <div>
                    <div className="mb-2 w-fit border-b border-[#808080] pb-1">
                        <Typography as="h3" variant="bold-lg">
                            Dung tích
                        </Typography>
                    </div>
                    <div>
                        {v.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 py-1">
                                <Checkbox id={String(item)} />
                                <label htmlFor={String(item)}>
                                    <Typography as="span" variant="link">
                                        {item} Lít
                                    </Typography>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>{' '}
                <div>
                    <div className="mb-2 w-fit border-b border-[#808080] pb-1">
                        <Typography as="h3" variant="bold-lg">
                            Kích thước
                        </Typography>
                    </div>
                    <div>
                        {sizes.map((size, index) => (
                            <div key={index} className="flex items-center space-x-2 py-1">
                                <Checkbox id={size} />
                                <label htmlFor={size}>
                                    <Typography as="span" variant="link">
                                        {size}
                                    </Typography>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pl-4">
                <Typography as="h1" variant="h1" className="text-center">
                    Sản phẩm
                </Typography>
                <Typography className="mt-4 text-center">
                    Một số dòng sản phẩm nổi bật của công ty chúng tôi đang kinh doanh hiện nay trên
                    thị trường
                </Typography>
                <div className="mt-6">
                    <div className="space-y-2">
                        <Typography as="h5" variant="h5">
                            THÙNG, LON TRÒN SƠN HÓA CHẤT
                        </Typography>
                        <div className="flex items-center justify-between">
                            <Typography>Sản phẩm (10)</Typography>
                            <Select>
                                <SelectTrigger className="w-[180px] bg-white">
                                    <SelectValue placeholder="Sắp xếp theo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Bán chạy nhất</SelectItem>
                                    <SelectItem value="dark">Phổ biến nhất</SelectItem>
                                    <SelectItem value="system">Mới nhất</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {Array.from({ length: 10 }, (_, index) => (
                            <ProductItem key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
