'use client'

import { Card, CardContent, CardHeader, CardTitle, FormUpload } from '@/components'

export const SliderConfig = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cấu hình Slider</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <FormUpload isCompact key={index} name={`sliders.${index}`} />
                ))}
            </CardContent>
        </Card>
    )
}
