import { prisma } from '@/db'
import { SettingModel } from '@/models'

export const settingService = {
    getSetting: async () => {
        return await prisma.setting.findFirst()
    },
    createOrUpdateSetting: async (data: SettingModel) => {
        if (data?.id) {
            const { id, ...rest } = data
            // Ensure the ID is valid before updating
            return await prisma.setting.update({
                where: { id },
                data: rest,
            })
        }

        // Handle create case
        return await prisma.setting.create({
            data, // Ensure `data` has required fields for creation
        })
    },
    deleteSetting: async () => prisma.setting.deleteMany(),
}
