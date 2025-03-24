import { cn } from '@/lib'

interface LoaderProps {
    className?: string
}

export function Loader({ className }: LoaderProps) {
    return (
        <div
            className={cn(
                'absolute inset-0 flex items-center justify-center bg-black/30',
                className,
            )}
        >
            <div aria-hidden="true" className="flex items-center justify-center">
                <div className="size-10 animate-spin rounded-full border-4 border-white border-t-transparent dark:invert" />
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
