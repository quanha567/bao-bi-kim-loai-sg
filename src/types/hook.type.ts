export type GetOptionType<T> = {
    extraData?: (keyof T)[]
    isEnable?: boolean
    optionKey?: keyof T
}
