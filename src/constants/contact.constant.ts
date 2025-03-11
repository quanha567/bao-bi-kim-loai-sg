import { SelectOption } from '@/components'

import { ContactStatus } from '@/models'

export const CONTACT_STATUS_NAMES: Record<
    ContactStatus,
    {
        color: string
        label: string
    }
> = {
    NEW: {
        label: 'Mới',
        color: 'bg-blue-500',
    },
    PROCESSING: { label: 'Đang xử lý', color: 'bg-orange-500' },
    REPLIED: { label: 'Đã trả lời', color: 'bg-green-500' },
    RESOLVED: { label: 'Đã giải quyết', color: 'bg-green-500' },
}

export const CONTACT_STATUS_OPTIONS: SelectOption[] = Object.entries(CONTACT_STATUS_NAMES).map(
    ([key, value]) => ({
        label: value.label,
        value: key,
        color: value.color,
    }),
)
