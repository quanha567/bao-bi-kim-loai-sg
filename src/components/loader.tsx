export function Loader() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div aria-hidden="true" className="flex items-center justify-center">
                <div className="size-10 animate-spin rounded-full border-4 border-white border-t-transparent dark:invert" />
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
