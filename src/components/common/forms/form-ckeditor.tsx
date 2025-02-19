'use client'

import { ReactNode } from 'react'
import { Path, useFormContext } from 'react-hook-form'

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css'

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui'

interface FormCkeditorProps<T> {
    description?: ReactNode
    isRequired?: boolean
    label: string
    name: Path<T>
    placeholder?: string
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: ['right', 'center', 'justify'] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
    ],
}

export const FormCkeditor = <TFormValues extends Record<string, unknown>>({
    name,
    label,
    description,
    isRequired,
    placeholder,
}: FormCkeditorProps<TFormValues>) => {
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
                        <ReactQuill
                            placeholder={placeholder}
                            {...field}
                            theme="snow"
                            modules={modules}
                            value={field.value as string}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

FormCkeditor.displayName = 'FormCkeditor'
