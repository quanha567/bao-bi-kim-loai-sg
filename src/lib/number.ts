/**
 * Formats a Vietnamese phone number to start with '0': 0xxx xxx xxx.
 * @param phoneNumber The input phone number (string).
 * @returns The formatted phone number or an error message if invalid.
 */
export const formatVietnamesePhoneNumber = (phoneNumber?: string): string => {
    if (!phoneNumber) return ''

    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '')

    // Validate length (9 or 10 digits after removing prefix)
    if (cleaned.length < 9 || cleaned.length > 11) {
        return 'Invalid phone number length'
    }

    // Standardize to 0 format
    if (cleaned.startsWith('84')) {
        return `0${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
    } else if (cleaned.startsWith('0')) {
        return `${cleaned.slice(0, 1)}${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
    } else if (cleaned.length === 9 || cleaned.length === 10) {
        // Assume the input number doesn't have any prefix
        return `0${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
    }

    return 'Invalid phone number format'
}
