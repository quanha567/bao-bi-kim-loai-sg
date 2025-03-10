'use client'

import { Card, CardContent, CardHeader, CardTitle, FormUploadMultiple } from '@/components'

interface MyCustomerConfigProps {
    isLoading?: boolean
}

export const MyCustomerConfig = ({ isLoading }: MyCustomerConfigProps) => {
    return (
        <Card isLoading={isLoading}>
            <CardHeader>
                <CardTitle>Logo Khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
                <FormUploadMultiple isCompact name="customerLogos" />
            </CardContent>
        </Card>
    )
}
