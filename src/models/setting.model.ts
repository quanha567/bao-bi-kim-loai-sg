import { BaseModel } from './base.model'

export interface MenuSettingModel extends BaseModel {
    isChild: any
    menuSettings?: MenuSettingModel[]
    pageId?: string
}

export interface SettingModel extends BaseModel {
    address?: string
    email?: string
    fbLink?: string
    menus?: MenuSettingModel[]
    phoneNumber?: string
    youtubeLink?: string
    zaloLink?: string
}

export interface SettingRequestModel extends Omit<SettingModel, 'menus'> {
    menus?: string
}
