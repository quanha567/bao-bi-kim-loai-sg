import { prisma } from '@/db'
import { SettingModel } from '@/models'

export const settingService = {
    getSetting: async () => {
        return await prisma.setting.findFirst()
    },
    createOrUpdateSetting: async (data: SettingModel) => {
        if (data.id) {
            // Ensure the ID is valid before updating
            return await prisma.setting.update({
                where: { id: data.id },
                data: {
                    ...data,
                    updatedAt: new Date(),
                }, // Ensure `data` has the correct shape
            })
        }

        // Handle create case
        return await prisma.setting.create({
            data, // Ensure `data` has required fields for creation
        })
    },
    deleteSetting: async () => prisma.setting.deleteMany(),
}
