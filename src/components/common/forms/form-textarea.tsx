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
    Textarea,
} from '@/components/ui'

interface FormTextareaProps<T> {
    description?: ReactNode
    isRequired?: boolean
    label: string
    name: Path<T>
    placeholder?: string
}

export const FormTextarea = <TFormValues extends Record<string, unknown>>({
    name,
    label,
    description,
    isRequired,
    placeholder,
}: FormTextareaProps<TFormValues>) => {
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
                        <Textarea
                            placeholder={placeholder}
                            {...field}
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

FormTextarea.displayName = 'FormTextarea'
