'use client'

import { CloudDownload, CloudUpload, Eye, Trash2 } from 'lucide-react'
import {
    ChangeEvent,
    DragEvent,
    MouseEvent,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useFormContext } from 'react-hook-form'

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Progress,
} from '@/components'

import { useToast } from '@/hooks'

enum FileType {
    CSV = 'text/csv',
    EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    HTML = 'text/html',
    IMAGE = 'image/jpeg, 	image/png, 	image/gif',
    PDF = 'application/pdf',
    TEXT_PLAIN = 'text/plain',
    WORD = 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XML = 'application/xml',
    ZIP = 'application/zip',
}

interface FormUploadProps {
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

export const FormUpload = ({
    label,
    name,
    isCircle,
    className,
    resizeMode,
    isCompact,
    showPreview = true,
    acceptType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
    setDeleteImageIds,
    footerLabel,
    maxSize = Infinity,
    isRequired,
    description,
}: FormUploadProps) => {
    const uploadId = useId()

    const timer = useRef<any>(null)

    const prevProgress = useRef<number>(0)

    const fileUploadRef = useRef<HTMLInputElement>(null)

    const [currentProgress, setCurrentProgress] = useState<number>(0)

    const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false)

    const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false)

    const { control, setValue, watch } = useFormContext()

    const currentFile = watch(name)

    const { toast } = useToast()

    useEffect(() => {
        window.addEventListener('dragenter', handleDragFile)
        window.addEventListener('dragleave', handleDragFile)
        window.addEventListener('dragover', handleDragFile)
        window.addEventListener('drop', handleDropOnWindow)
        window.addEventListener('blur', handleDropOnWindow)

        return () => {
            window.removeEventListener('dragleave', handleDragFile)
            window.removeEventListener('dragenter', handleDragFile)
            window.removeEventListener('dragover', handleDragFile)
            window.addEventListener('drop', handleDropOnWindow)
            window.addEventListener('blur', handleDropOnWindow)
        }
    }, [])

    const handleDropOnWindow = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDraggingFile(false)
    }

    const fileUrl = useMemo(() => {
        try {
            return typeof currentFile === 'string'
                ? currentFile
                : currentFile instanceof Blob
                  ? URL.createObjectURL(currentFile)
                  : ''
        } catch (err: unknown) {
            console.log('🚀 -> fileUrl -> err:', err)
            return ''
        }
    }, [currentFile])

    const isVideoType = useMemo(() => {
        // Common video file extensions
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.flv']

        return (
            videoExtensions.some((extension) => fileUrl.endsWith(extension)) ||
            (currentFile as File)?.type?.startsWith('video/')
        )
    }, [fileUrl, JSON.stringify(currentFile)])

    const isYouTubeEmbedLink = useMemo(() => {
        const youtubeEmbedPattern =
            /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\/embed\/[a-zA-Z0-9_-]+(\?.*)?$/

        return youtubeEmbedPattern.test(fileUrl)
    }, [fileUrl])

    const uploadFile = (file?: Blob) => {
        console.log('🚀 -> uploadFile -> file:', file)
        if (currentFile) {
            setValue(name, null)
        }

        if (file && (file as File).size > maxSize) {
            const MAX_SIZE_MB = maxSize / 1024 / 1024

            console.log('🚀 -> uploadFile -> MAX_SIZE_MB:', MAX_SIZE_MB)

            toast({
                title: `Kích thước file hỗ trợ tối đa ${MAX_SIZE_MB}Mb!`,
                variant: 'warning',
            })

            return
        }

        timer.current = setInterval(() => {
            if (prevProgress.current < 100) {
                prevProgress.current += Math.ceil(Math.random() * 5 + currentProgress + 1)
                setCurrentProgress(prevProgress.current)

                return
            }

            if (file && fileUploadRef.current) {
                setValue(name, file, {
                    shouldDirty: true,
                })
                fileUploadRef.current.value = ''
                setCurrentProgress(0)
                prevProgress.current = 0
                clearInterval(timer.current)
            }
        }, 15)
    }

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        uploadFile(e.target.files?.[0])
        e.target.value = ''
        e.target.files = null
    }

    const handleClearFile = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDeleteImageIds && setDeleteImageIds()
        setValue(name, null, {
            shouldDirty: true,
        })
    }

    const handlePreviewFile = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsOpenPreview(true)
    }

    const handleDragFile = (e: any) => {
        console.log('dragenter')

        e.preventDefault()
        e.stopPropagation()

        if (
            (e.type === 'dragenter' || e.type === 'dragover') &&
            (e.clientX && e.clientY && e.screenX && e.screenY) > 0
        ) {
            setIsDraggingFile(true)
        }
    }

    const handleDropFile = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDraggingFile(false)

        const targetFile = e.dataTransfer.files?.[0]

        if (acceptType.includes(targetFile?.type)) {
            uploadFile(e.dataTransfer.files?.[0])
        } else {
            toast({
                title: 'Định dạng file không được hỗ trợ!',
                variant: 'warning',
            })
        }
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
                                <div
                                    className={`relative w-full ${
                                        isCircle ? 'pt-[100%]' : 'pt-[56.65%]'
                                    } ${className}`}
                                >
                                    <label
                                        htmlFor={uploadId}
                                        className="absolute bottom-0 left-0 right-0 top-0"
                                    >
                                        <div
                                            onDrop={handleDropFile}
                                            onDragOver={handleDragFile}
                                            onDragEnter={handleDragFile}
                                            onDragLeave={handleDragFile}
                                            className={`form-upload-container relative flex h-full w-full cursor-pointer select-none flex-col items-center justify-center overflow-hidden border-2 border-dashed border-zinc-300 p-1 text-zinc-300 transition-all hover:border-zinc-400 hover:text-zinc-400 ${
                                                error?.message &&
                                                '!border-danger hover:border-danger'
                                            } ${isCircle ? 'rounded-full' : 'rounded-lg'}`}
                                        >
                                            {fileUrl && !isDraggingFile && showPreview ? (
                                                <>
                                                    {isYouTubeEmbedLink ? (
                                                        <iframe
                                                            width="1280"
                                                            height="685"
                                                            src={fileUrl}
                                                            frameBorder="0"
                                                            allowFullScreen
                                                            referrerPolicy="strict-origin-when-cross-origin"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            className={`h-full w-full transition-all duration-500 hover:scale-110 ${
                                                                isCircle && 'rounded-full'
                                                            } ${
                                                                resizeMode || isCircle
                                                                    ? 'object-cover'
                                                                    : 'object-contain'
                                                            }`}
                                                        ></iframe>
                                                    ) : !isVideoType ? (
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
                                                    ) : (
                                                        <video
                                                            controls
                                                            autoPlay
                                                            className={`h-full w-full transition-all duration-500 hover:scale-110 ${
                                                                isCircle && 'rounded-full'
                                                            } ${
                                                                resizeMode || isCircle
                                                                    ? 'object-cover'
                                                                    : 'object-contain'
                                                            }`}
                                                        >
                                                            <source
                                                                src={fileUrl}
                                                                type="video/mp4"
                                                            />
                                                            Your browser does not support the video
                                                            tag.
                                                        </video>
                                                    )}
                                                    <div className="form-upload-action absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-2">
                                                        {!isVideoType && (
                                                            <div
                                                                onClick={handlePreviewFile}
                                                                className="h-7 w-7 rounded bg-white p-1 transition-all hover:scale-150 hover:bg-sky-500 hover:text-white"
                                                            >
                                                                <Eye className="h-full w-full" />
                                                            </div>
                                                        )}
                                                        <div
                                                            onClick={handleClearFile}
                                                            className="h-7 w-7 rounded bg-white p-1 transition-all hover:scale-150 hover:bg-red-500 hover:text-white"
                                                        >
                                                            <Trash2 className="h-full w-full" />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex w-full flex-col items-center py-2">
                                                    <div
                                                        className={`aspect-square ${
                                                            isCompact ? 'w-3/5' : 'w-1/2 md:w-[15%]'
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

                                                    {currentProgress ? (
                                                        <Progress
                                                            className="px-[10%]"
                                                            value={currentProgress}
                                                        />
                                                    ) : isCompact ? (
                                                        <></>
                                                    ) : (
                                                        <div className="hidden w-full max-w-[96px] rounded bg-zinc-200 p-[1%] text-center text-[10px] text-sm font-bold text-zinc-700 transition-all hover:bg-primary hover:text-white md:block md:text-xs lg:text-sm">
                                                            CHỌN FILE
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {isDraggingFile && (
                                                <div className="absolute bottom-0.5 left-0.5 right-0.5 top-0.5 flex flex-col items-center justify-center bg-white">
                                                    <div className="aspect-square w-[15%]">
                                                        <CloudDownload className="h-full w-full animate-bounce text-zinc-400" />
                                                    </div>
                                                    <p className="text-lg font-medium text-zinc-400">
                                                        Thả file vào đây
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id={uploadId}
                                        className="hidden"
                                        ref={fileUploadRef}
                                        onChange={handleUploadFile}
                                        accept={acceptType?.join(', ')}
                                    />
                                </div>
                                <span className="text-danger text-xs">{error?.message}</span>
                                {!showPreview && currentFile && (
                                    <div className="mt-2 flex items-center rounded border border-dashed border-zinc-200 p-1">
                                        {/* <SVG src={getFileIcon()} className="h-7 w-7" /> */}
                                        <p className="mx-2 line-clamp-1 flex-1 font-medium">
                                            {currentFile instanceof Blob
                                                ? (currentFile as any)?.name
                                                : typeof currentFile === 'string'
                                                  ? currentFile
                                                  : 'Unknown'}
                                        </p>
                                        <div
                                            onClick={handleClearFile}
                                            className="hover:bg-danger h-7 w-7 cursor-pointer rounded p-1.5 transition-all hover:scale-105 hover:text-white"
                                        >
                                            <Trash2 className="h-full w-full" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* {fileUrl ? (
                <ImagePreview
                    src={fileUrl}
                    visible={isOpenPreview}
                    onClose={() => setIsOpenPreview(false)}
                />
            ) : (
                <></>
            )} */}
            <div className={`text-center ${isCircle ? 'mt-3' : ''}`}>
                <span className="text-xs italic text-gray-600">{footerLabel}</span>
            </div>
        </div>
    )
}
