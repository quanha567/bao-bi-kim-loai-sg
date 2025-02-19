import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, milliSeconds: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, milliSeconds)

        return () => {
            clearTimeout(handler)
        }
    }, [value, milliSeconds])

    return debouncedValue
}
