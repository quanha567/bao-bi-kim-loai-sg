import { PageType } from '@/models'

export const PAGE_TYPE_NAMES: Record<PageType, string> = {
    ARTICLE: 'Bài viết',
    CATEGORY: 'Danh mục',
    CUSTOM: 'Tùy chỉnh',
    PRODUCT: 'Sản phẩm',
}

export const PAGE_TYPE_OPTIONS = Object.entries(PAGE_TYPE_NAMES).map(([value, label]) => ({
    label,
    value,
}))
