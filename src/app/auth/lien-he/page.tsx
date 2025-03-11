'use client'

import {
    ColumnType,
    CustomTable,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components'

import { CONTACT_STATUS_NAMES, CONTACT_STATUS_OPTIONS } from '@/constants'
import { useGetContacts, useSearch, useToast, useUpdateContact } from '@/hooks'
import { ContactModel, ContactStatus } from '@/models'

const AdminCategoryPage = () => {
    const { pageIndex, pageSize, searchText, handlePaginationChange } = useSearch({})

    const { mutate: updateContact, isPending: isUpdatingContact } = useUpdateContact()

    const { toast } = useToast()

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
        {
            key: 'status',
            label: 'Trạng thái',
            render: (data) => (
                <Select
                    value={data.status}
                    onValueChange={(value) =>
                        handleChangeContactStatus(data, value as ContactStatus)
                    }
                >
                    <SelectTrigger
                        className={`w-[180px] bg-primary text-white ${CONTACT_STATUS_NAMES[data.status].color}`}
                    >
                        <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        {CONTACT_STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ),
        },
    ]

    const handleChangeContactStatus = (data: ContactModel, status: ContactStatus) => {
        updateContact(
            { ...data, status },
            {
                onSuccess: async () => {
                    await refetchContacts()
                    toast({
                        title: 'Cập nhật trạng thái liên hệ thành công!',
                        variant: 'success',
                    })
                },
                onError: (error) => {
                    toast({
                        title: 'Có lỗi xảy ra vui lòng thử lại sau!',
                        variant: 'destructive',
                    })
                    console.log('🚀 -> handleChangeContactStatus -> error:', error)
                },
            },
        )
    }

    return (
        <>
            <CustomTable
                rowKey="id"
                columns={columns}
                data={contacts?.data || []}
                onRefresh={refetchContacts}
                tableName="Danh sách liên hệ"
                pageSize={contacts?.pageSize || 0}
                pageIndex={contacts?.pageIndex || 0}
                totalPages={contacts?.totalPages || 0}
                onPaginationChange={handlePaginationChange}
                totalElements={contacts?.totalElements || 0}
                isLoading={isLoadingContacts || isUpdatingContact}
            />
        </>
    )
}

export default AdminCategoryPage
