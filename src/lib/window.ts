// utils/openLink.ts
export const openLink = (type: 'mail' | 'maps' | 'phone', value?: string) => {
    if (!value) return

    switch (type) {
        case 'mail':
            window.open(`mailto:${value}`, '_blank')
            break
        case 'maps':
            window.open(`https://www.google.com/maps?q=${encodeURIComponent(value)}`, '_blank')
            break
        case 'phone':
            window.open(`tel:${value}`, '_blank')
            break
        default:
            console.warn('Unsupported type')
    }
}

export const getLink = (type: 'mail' | 'maps' | 'phone', value?: string): string => {
    if (!value) return '#'

    switch (type) {
        case 'mail':
            return `mailto:${value}`
        case 'maps':
            return `https://www.google.com/maps?q=${encodeURIComponent(value)}`
        case 'phone':
            return `tel:${value}`
        default:
            return '#'
    }
}
