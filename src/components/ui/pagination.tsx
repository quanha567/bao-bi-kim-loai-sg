import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { ButtonProps, buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
    ({ className, ...props }, ref) => (
        <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
    ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    {
        disabled?: boolean
    } & React.ComponentProps<'li'>
>(({ className, disabled, ...props }, ref) => (
    <li
        ref={ref}
        className={cn('', className, disabled ? 'cursor-not-allowed opacity-60' : '')}
        {...props}
    />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
    isActive?: boolean
} & Pick<ButtonProps, 'size'> &
    React.ComponentProps<'a'>

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
    <a
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            buttonVariants({
                size,
                variant: isActive ? 'outline' : 'ghost',
            }),
            className,
        )}
        {...props}
    />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        size="default"
        aria-label="Go to previous page"
        className={cn(
            'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
            className,
        )}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span>Trang trước</span>
    </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        size="default"
        aria-label="Go to next page"
        className={cn(
            'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
            className,
        )}
        {...props}
    >
        <span>Trang sau</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span
        aria-hidden
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
}
