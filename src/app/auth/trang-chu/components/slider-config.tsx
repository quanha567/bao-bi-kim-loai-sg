'use client'

import { Card, CardContent, CardHeader, CardTitle, FormUploadMultiple } from '@/components'

interface SliderConfigProps {
    isLoading?: boolean
}

export const SliderConfig = ({ isLoading }: SliderConfigProps) => {
    return (
        <Card isLoading={isLoading}>
            <CardHeader>
                <CardTitle>Cấu hình Slider</CardTitle>
            </CardHeader>
            <CardContent>
                <FormUploadMultiple isCompact name="sliders" />
            </CardContent>
        </Card>
    )
}
