import { BaseModel } from './base.model'

export interface MenuSettingModel extends BaseModel {
    footerMenu: string
    headerMenu: string
}

export interface SettingModel extends BaseModel {
    address?: string
    email?: string
    fbLink?: string
    phoneNumber?: string
    youtubeLink?: string
    zaloLink?: string
}
