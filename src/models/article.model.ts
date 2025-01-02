import { BaseModel } from './base.model'

export enum ArticleStatus {
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
}

export interface ArticleModel extends BaseModel {
    content: string
    slug: string
    status: ArticleStatus
    tags: string[]
    thumbnail?: string
    title: string
}
