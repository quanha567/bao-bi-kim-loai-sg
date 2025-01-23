'use client'

import { ChevronDown, LoaderIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import {
    Badge,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    SelectOption,
} from '@/components'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib'

interface ISelectProps {
    description?: string
    isLoading?: boolean
    isRequired?: boolean
    label?: string
    name: string
    options: SelectOption[]
    placeholder: string
}

export const FormMultipleSelect = ({
    placeholder,
    options: values,
    name,
    label,
    isRequired,
    description,
    isLoading,
}: ISelectProps) => {
    const { control, setValue, watch } = useFormContext()

    const selectedItems = watch(name) || []

    const handleSelectChange = (value: string) => {
        if (!selectedItems.includes(value)) {
            setValue(name, [...selectedItems, value])
        } else {
            const referencedArray = [...selectedItems]
            const indexOfItemToBeRemoved = referencedArray.indexOf(value)
            referencedArray.splice(indexOfItemToBeRemoved, 1)
            setValue(name, referencedArray)
        }
    }

    const isOptionSelected = (value: string): boolean => {
        return selectedItems.includes(value) ? true : false
    }

    const selectedOptions = selectedItems.map((item: string) => {
        return values.filter((value) => value.value === item).map((value) => value.label)
    })

    return (
        <>
            <FormField
                name={name}
                control={control}
                render={() => (
                    <FormItem className="relative">
                        <FormLabel>
                            {label}
                            {isRequired ? <span className="font-bold text-red-500"> *</span> : ''}
                        </FormLabel>
                        <FormControl>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    asChild
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            'flex w-full',
                                            isLoading ? 'cursor-not-allowed' : '',
                                        )}
                                    >
                                        <span className="flex flex-1 gap-1 overflow-hidden">
                                            {selectedOptions?.map((item: string, index: number) => (
                                                <Badge key={index} variant="secondary">
                                                    {item}
                                                </Badge>
                                            ))}
                                        </span>
                                        {isLoading ? (
                                            <LoaderIcon className="size-4 animate-spin" />
                                        ) : (
                                            <ChevronDown className="size-4" />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[500px]"
                                    onCloseAutoFocus={(e) => e.preventDefault()}
                                >
                                    {values.map(
                                        (value: ISelectProps['options'][0], index: number) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={index}
                                                    onSelect={(e) => e.preventDefault()}
                                                    checked={isOptionSelected(value.value)}
                                                    onCheckedChange={() =>
                                                        handleSelectChange(value.value)
                                                    }
                                                >
                                                    {value.label}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        },
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </FormControl>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
