'use client'

import { Card, CardContent, CardHeader, CardTitle, FormUploadMultiple } from '@/components'

export const MyCustomerConfig = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Logo Khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
                <FormUploadMultiple isCompact name="customerLogos" />
            </CardContent>
        </Card>
    )
}
