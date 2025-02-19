import { prisma } from '@/db'
import { MenuSettingModel } from '@/models'

export const menuSettingService = {
    createMenuSetting: async (data: MenuSettingModel) => {
        const { setting, ...restData } = data

        return await prisma.menuSetting.create({
            data: {
                ...restData,
                ...(setting ? { setting: { connect: { id: setting.id } } } : {}),
            },
        })
    },
}
