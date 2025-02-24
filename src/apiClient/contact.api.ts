import { API_URL } from '@/constants'
import { ContactModel } from '@/models'

const apiClient = (await import('./index')).apiClient

import { BaseApi } from './base.api'

class ContactApi extends BaseApi<ContactModel> {
    constructor() {
        super(apiClient, API_URL.CONTACTS)
    }
}

export const contactApi = new ContactApi()
