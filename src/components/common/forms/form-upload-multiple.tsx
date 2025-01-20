'use client'

import { CloudUpload, Eye, Trash2 } from 'lucide-react'
import { ChangeEvent, DragEvent, MouseEvent, useId, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import Image from 'next/image'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components'

import { useToast } from '@/hooks'

interface FormUploadMultipleProps {
    acceptType?: string[]
    className?: string
    description?: string
    footerLabel?: string
    isCircle?: boolean
    isCompact?: boolean
    isRequired?: boolean
    label?: string
    maxSize?: number
    name: string
    resizeMode?: 'object-contain' | 'object-cover' | 'object-fill'
    setDeleteImageIds?: () => void
    showPreview?: boolean
}

export const FormUploadMultiple = ({
    label,
    name,
    isCircle,
    resizeMode,
    isCompact,
    acceptType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
    setDeleteImageIds,
    footerLabel,
    maxSize = Infinity,
    isRequired,
    description,
}: FormUploadMultipleProps) => {
    const uploadId = useId()

    const fileUploadRef = useRef<HTMLInputElement>(null)

    const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false)

    const { control, setValue, watch } = useFormContext()

    const currentFiles = watch(name)

    const { toast } = useToast()

    const [filePreviewUrl, setFilePreviewUrl] = useState<string>()

    const fileUrls = useMemo(() => {
        try {
            return Array.isArray(currentFiles) && currentFiles.length > 0
                ? currentFiles.map((file) =>
                      typeof file === 'string'
                          ? file
                          : file instanceof Blob
                            ? URL.createObjectURL(file)
                            : '',
                  )
                : []
        } catch (err: unknown) {
            console.log('🚀 -> fileUrl -> err:', err)
            return []
        }
    }, [currentFiles])

    const uploadFile = (file?: Blob | Blob[]) => {
        const MAX_SIZE_MB = maxSize / 1024 / 1024
        if (Array.isArray(file) && file.length > 0) {
            const acceptedFiles = file.filter(
                (f) => acceptType.includes(f.type) && f.size <= maxSize,
            )

            if (file && fileUploadRef.current) {
                setValue(name, [...(currentFiles || []), ...acceptedFiles], {
                    shouldDirty: true,
                })
                fileUploadRef.current.value = ''
            }
        } else {
            if (file && (file as File).size > maxSize) {
                console.log('🚀 -> uploadFile -> MAX_SIZE_MB:', MAX_SIZE_MB)

                toast({
                    title: `Kích thước file hỗ trợ tối đa ${MAX_SIZE_MB}Mb!`,
                    variant: 'warning',
                })

                return
            }

            if (file && fileUploadRef.current) {
                setValue(name, [...(currentFiles || []), file], {
                    shouldDirty: true,
                })
                fileUploadRef.current.value = ''
            }
        }
    }

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        uploadFile(Array.from(e.target.files || []))
        e.target.value = ''
        e.target.files = null
    }

    const handleClearFile = (e: MouseEvent<HTMLDivElement>, index: number) => {
        e.preventDefault()
        setDeleteImageIds && setDeleteImageIds()
        setValue(name, currentFiles?.filter((_: any, i: number) => i !== index) || [], {
            shouldDirty: true,
        })
    }

    const handlePreviewFile = (e: MouseEvent<HTMLDivElement>, fileUrl: string) => {
        e.preventDefault()
        setFilePreviewUrl(fileUrl)
        setIsOpenPreview(true)
    }

    const handlePreventDragImage = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div>
            <FormField
                name={name}
                control={control}
                render={({ fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>
                            {label}
                            {isRequired ? <span className="font-bold text-red-500"> *</span> : ''}
                        </FormLabel>
                        <FormControl>
                            <div>
                                <input
                                    multiple
                                    type="file"
                                    id={uploadId}
                                    className="hidden"
                                    ref={fileUploadRef}
                                    onChange={handleUploadFile}
                                    accept={acceptType?.join(', ')}
                                />
                                <label htmlFor={uploadId}>
                                    <div className="flex w-full flex-wrap gap-2">
                                        {fileUrls?.map((fileUrl, index) => (
                                            <div
                                                key={index}
                                                className={`form-upload-container relative flex aspect-video h-full flex-[150px] cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-zinc-300 p-1 text-zinc-300 transition-all hover:border-zinc-400 hover:text-zinc-400 ${
                                                    error?.message &&
                                                    '!border-danger hover:border-danger'
                                                }`}
                                            >
                                                <>
                                                    <img
                                                        src={fileUrl}
                                                        alt="Upload Image"
                                                        onDragStart={handlePreventDragImage}
                                                        className={`h-full w-full transition-all duration-500 hover:scale-110 ${
                                                            isCircle && 'rounded-full'
                                                        } ${
                                                            resizeMode || isCircle
                                                                ? 'object-cover'
                                                                : 'object-contain'
                                                        }`}
                                                    />
                                                    <div className="form-upload-action absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-2">
                                                        <div
                                                            className="h-7 w-7 rounded bg-white p-1 transition-all hover:scale-150 hover:bg-sky-500 hover:text-white"
                                                            onClick={(e) =>
                                                                handlePreviewFile(e, fileUrl)
                                                            }
                                                        >
                                                            <Eye className="h-full w-full" />
                                                        </div>
                                                        <div
                                                            className="h-7 w-7 rounded bg-white p-1 transition-all hover:scale-150 hover:bg-red-500 hover:text-white"
                                                            onClick={(e) =>
                                                                handleClearFile(e, index)
                                                            }
                                                        >
                                                            <Trash2 className="h-full w-full" />
                                                        </div>
                                                    </div>
                                                </>
                                            </div>
                                        ))}

                                        <div className="flex aspect-video flex-[150px] cursor-pointer flex-col items-center rounded-lg border-2 border-dashed py-2 text-zinc-400">
                                            <div
                                                className={`aspect-square ${
                                                    isCompact ? 'w-2/5' : 'w-1/2 md:w-[15%]'
                                                }`}
                                            >
                                                <CloudUpload className="h-full w-full" />
                                            </div>
                                            {!isCompact && (
                                                <>
                                                    <p className="hidden text-center text-[10px] text-current md:block md:text-xs lg:text-sm">
                                                        Kéo và thả file vào đây
                                                    </p>
                                                    <div className="relative mx-auto my-[4%] hidden h-[1px] w-2/5 bg-current md:block">
                                                        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] md:text-xs">
                                                            hoặc
                                                        </span>
                                                    </div>
                                                </>
                                            )}

                                            {isCompact ? (
                                                <></>
                                            ) : (
                                                <div className="hidden w-full max-w-[120px] rounded bg-zinc-200 p-[1%] text-center text-[10px] text-sm font-bold text-zinc-700 transition-all hover:bg-primary hover:text-white md:block md:text-xs lg:text-sm">
                                                    CHỌN FILE
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </label>
                                <span className="text-danger text-xs">{error?.message}</span>
                            </div>
                        </FormControl>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className={`text-center ${isCircle ? 'mt-3' : ''}`}>
                <span className="text-xs italic text-gray-600">{footerLabel}</span>
            </div>
            <Dialog open={isOpenPreview} onOpenChange={() => setIsOpenPreview(false)}>
                <DialogContent className="p-8">
                    <DialogHeader>
                        <DialogTitle>Preview</DialogTitle>
                    </DialogHeader>
                    {filePreviewUrl && (
                        <Image width={500} height={500} alt="Preview" src={filePreviewUrl} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
