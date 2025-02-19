import { BaseModel } from './base.model'

export interface ContactModel extends BaseModel {
    email: string
    message: string
    name: string
    phone: string
}
