import { BaseModel } from './base.model'

export enum ContactStatus {
    NEW = 'NEW',
    PROCESSING = 'PROCESSING',
    REPLIED = 'REPLIED',
    RESOLVED = 'RESOLVED',
}

export interface ContactModel extends BaseModel {
    email: string
    message: string
    name: string
    phone: string
    status: ContactStatus
}
