import { BaseModel } from './base.model'

export enum PageType {
    ARTICLE = 'ARTICLE',
    CATEGORY = 'CATEGORY',
    CUSTOM = 'CUSTOM',
    PRODUCT = 'PRODUCT',
}

export interface PageModel extends BaseModel {
    name: string
    targetId?: string
    type: PageType
}
