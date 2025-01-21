import { BaseModel } from './base.model'
import { ProductModel } from './product.model'

export interface HomeConfigItemModel {
    image?: string
    orderNumber?: number
    title: string
}

export interface HomeConfigModel extends BaseModel {
    customerLogos: string[]
    doYouKnows?: HomeConfigItemModel[]
    extras?: HomeConfigItemModel[]
    products: ProductModel[]
    sliders: Blob[] | string[]
    successStories?: HomeConfigItemModel[]
}

export interface HomeConfigRequestModel
    extends Omit<HomeConfigModel, 'doYouKnows' | 'extras' | 'sliders' | 'successStories'> {
    doYouKnows: string
    extras: string
    sliders: string[]
    successStories: string
}
