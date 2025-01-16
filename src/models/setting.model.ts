import { BaseModel } from './base.model'
import { PageModel } from './page.model'

export interface MenuSettingModel extends BaseModel {
    menuSettingId?: string
    menuSettings?: MenuSettingModel[]
    page?: PageModel
    pageId?: string
    setting?: SettingModel
    settingId?: string
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
