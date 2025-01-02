import axios from 'axios'

import { ImageModel } from '@/models'

export const imageService = {
    async uploadImage(file: File): Promise<ImageModel> {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('fileName', file.name)

            const response = await axios.post(
                'https://upload.imagekit.io/api/v2/files/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Basic ${process.env.IMAGE_KIT_PRIVATE_KEY}`,
                    },
                },
            )

            return response.data
        } catch (err) {
            console.error(err)
            throw new Error('Failed to upload image')
        }
    },
}
