import { BaseModel } from './base.model'

export interface SettingModel extends BaseModel {
    address?: string
    email?: string
    fbLink?: string
    phoneNumber?: string
    youtubeLink?: string
    zaloLink?: string
}
