import { ArticleModel } from './article.model'
import { CategoryModel } from './category.model'

export interface LayoutResponseModel {
    articles: ArticleModel[]
    categories: CategoryModel[]
}
