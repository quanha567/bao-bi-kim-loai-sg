import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui'

interface CustomPaginationProps {
    currentPage: number
    onPageChange: (page: number) => void
    pageSize: number
    total: number
}

export const CustomPagination = ({
    currentPage = 1,
    pageSize = 10,
    total = 100,
    onPageChange,
}: CustomPaginationProps) => {
    const totalPages = Math.ceil(total / pageSize)

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages)
            } else if (totalPages - currentPage === 1) {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1)
            } else if (currentPage >= 3 && currentPage <= totalPages - 3) {
                pages.push(
                    1,
                    '...',
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    '...',
                    totalPages,
                )
            } else {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
            }
        }

        return pages
    }

    if (totalPages <= 1) {
        return null
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        isDisabled={currentPage === 1}
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                        className="flex items-center justify-center border bg-white hover:bg-primary hover:text-white"
                    />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                        {typeof page === 'number' ? (
                            <PaginationLink
                                href="#"
                                onClick={() => page !== currentPage && onPageChange(page)}
                                className={currentPage === page ? 'bg-primary text-white' : ''}
                            >
                                {page}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        isDisabled={currentPage === totalPages}
                        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                        className="flex items-center justify-center border bg-white hover:bg-primary hover:text-white"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
