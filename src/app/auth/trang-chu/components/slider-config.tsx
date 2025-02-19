'use client'

import { Card, CardContent, CardHeader, CardTitle, FormUploadMultiple } from '@/components'

export const SliderConfig = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cấu hình Slider</CardTitle>
            </CardHeader>
            <CardContent>
                <FormUploadMultiple isCompact name="sliders" />
            </CardContent>
        </Card>
    )
}
