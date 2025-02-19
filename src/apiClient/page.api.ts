import { API_URL } from '@/constants'
import { PageModel } from '@/models'

import { apiClient } from '.'
import { BaseApi } from './base.api'

export class PageApi extends BaseApi<PageModel> {
    constructor() {
        super(apiClient, API_URL.PAGES)
    }
}

export const pageApi = new PageApi()
