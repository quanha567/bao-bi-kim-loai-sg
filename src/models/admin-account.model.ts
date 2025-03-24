import { BaseModel } from './base.model'

export type AdminAccountCreateModal = Pick<
    AdminAccountModel,
    'email' | 'fullName' | 'passwordHash' | 'phoneNumber' | 'salt'
>

export interface AdminAccountCreateRequestModel
    extends Pick<AdminAccountCreateModal, 'email' | 'fullName' | 'phoneNumber'> {
    password: string
}

export interface AdminAccountModel extends BaseModel {
    email: string
    fullName: string
    id: string
    passwordHash: string
    phoneNumber: string
    salt: string
}
