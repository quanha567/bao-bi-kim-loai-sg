'use client'

import { ColumnType, CustomTable } from '@/components'

import { useGetContacts, useSearch } from '@/hooks'
import { ContactModel } from '@/models'

const AdminCategoryPage = () => {
    const { pageIndex, pageSize, searchText, handlePaginationChange } = useSearch({})

    const {
        data: contacts,
        isLoading: isLoadingContacts,
        refetch: refetchContacts,
    } = useGetContacts({
        pageIndex,
        pageSize,
        searchText,
    })

    const columns: ColumnType<ContactModel> = [
        {
            key: 'name',
            label: 'Họ và tên',
            render: (data) => data.name,
        },
        {
            key: 'email',
            label: 'Email liên lạc',
            render: (data) => data.email || '---',
        },
        {
            key: 'phone',
            label: 'Số điện thoại',
            render: (data) => data.phone || '---',
        },
        {
            key: 'message',
            label: 'Nội dung',
            render: (data) => data.message || '---',
        },
    ]

    return (
        <>
            <CustomTable
                rowKey="id"
                columns={columns}
                data={contacts?.data || []}
                onRefresh={refetchContacts}
                tableName="Danh sách liên hệ"
                isLoading={isLoadingContacts}
                pageSize={contacts?.pageSize || 0}
                pageIndex={contacts?.pageIndex || 0}
                totalPages={contacts?.totalPages || 0}
                onPaginationChange={handlePaginationChange}
                totalElements={contacts?.totalElements || 0}
            />
        </>
    )
}

export default AdminCategoryPage
