import { prisma } from '@/db'
import { SettingRequestModel } from '@/models'

export const settingService = {
    getSetting: async () => {
        return await prisma.setting.findFirst()
    },
    createOrUpdateSetting: async (data: SettingRequestModel) => {
        if (data?.id) {
            const { id, ...rest } = data
            console.log('createOrUpdateSetting:  rest:', rest)
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
