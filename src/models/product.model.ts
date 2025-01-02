import { CategoryModel } from './category.model'

export interface ProductModel {
    category: CategoryModel
    id: string
    image?: Blob | string
    imageHover?: string
    images?: string[]
    name: string
    slug: string
}
