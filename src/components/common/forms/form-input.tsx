'use client'

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
} from '@/components/ui'

interface FormInputProps<T> {
    description?: ReactNode
    isRequired?: boolean
    label: string
    name: Path<T>
    placeholder?: string
    type?: string
}

export const FormInput = <TFormValues extends Record<string, unknown>>({
    name,
    label,
    description,
    isRequired,
    placeholder,
    type,
}: FormInputProps<TFormValues>) => {
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
                        <Input
                            placeholder={placeholder}
                            {...field}
                            type={type}
                            value={field.value as number | readonly string[] | string | undefined}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

FormInput.displayName = 'FormInput'
