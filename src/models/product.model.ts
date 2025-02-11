import { CategoryModel } from './category.model'

export interface ProductModel {
    category: CategoryModel
    description?: string
    id: string
    image?: Blob | string
    imageHover?: Blob | string
    images?: string[]
    name: string
    slug: string
}
