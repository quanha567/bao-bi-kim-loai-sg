import { Skeleton } from './ui'

export const ProductSkeleton = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
        </div>
    )
}
