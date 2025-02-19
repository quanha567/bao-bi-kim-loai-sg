import { prisma } from '@/db'
import { MenuSettingCreateInput, MenuSettingModel } from '@/models'

export const menuService = {
    createMenu: async (data: MenuSettingModel) => {
        const createData: MenuSettingCreateInput = {
            ...data,
            setting: data.setting ?? undefined, // Ensure setting is undefined if not provided
        }
        return prisma.menuSetting.create({ data: createData })
    },
}
