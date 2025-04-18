'use client'

import { Database, Loader } from 'lucide-react'
import { ReactNode } from 'react'
import { Path, useFormContext } from 'react-hook-form'

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Typography,
} from '@/components'

export type SelectOption = {
    [key: string]: unknown
    label: ReactNode
    value: string
}

interface FormSelectProps<T> {
    description?: ReactNode
    isLoading?: boolean
    isLoadingMore?: boolean
    isRequired?: boolean
    label: string
    name: Path<T>
    onLoadMore?: () => void
    onSearchChange?: (value: string) => void
    options?: SelectOption[]
    placeholder?: string
    searchable?: boolean
    searchPlaceholder?: string
    searchValue?: string
}

export const FormSelect = <TFormValues extends Record<string, unknown>>({
    name,
    label,
    description,
    isRequired,
    placeholder,
    options = [],
    searchValue,
    searchable,
    isLoading,
    isLoadingMore,
    onSearchChange,
    onLoadMore,
    searchPlaceholder,
}: FormSelectProps<TFormValues>) => {
    const form = useFormContext<TFormValues>()

    return (
        <FormField
            name={name}
            control={form.control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                        {isRequired ? <span className="font-bold text-red-500"> *</span> : ''}
                    </FormLabel>
                    <FormControl>
                        <Select value={field.value as string} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full" disabled={isLoading}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {searchable && (
                                    <Input
                                        value={searchValue}
                                        placeholder={searchPlaceholder}
                                        onChange={(e) => onSearchChange?.(e.target.value)}
                                    />
                                )}
                                {!options.length && (
                                    <div className="flex flex-col items-center justify-center gap-1 py-4">
                                        <Database size={24} />
                                        <Typography variant="link">Không có dữ liệu</Typography>
                                    </div>
                                )}
                                <SelectGroup
                                    className="max-h-44 overflow-y-auto"
                                    onScroll={(e) => {
                                        if (
                                            e.currentTarget.scrollHeight -
                                                e.currentTarget.scrollTop ===
                                            e.currentTarget.clientHeight
                                        ) {
                                            onLoadMore?.()
                                        }
                                    }}
                                >
                                    {options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                                {isLoadingMore && (
                                    <div className="flex justify-center py-1">
                                        <Loader className="animate-spin" />
                                    </div>
                                )}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

FormSelect.displayName = 'FormSelect'
