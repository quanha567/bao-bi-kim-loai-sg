import { BaseModel } from './base.model'
import { ProductModel } from './product.model'

export interface CategoryModel extends BaseModel {
    name: string
    products: ProductModel[]
    slug: string
}
