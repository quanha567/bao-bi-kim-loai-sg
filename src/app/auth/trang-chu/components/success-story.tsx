import { Trash2Icon } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    FormTextarea,
    FormUpload,
} from '@/components'

interface SuccessStoryProps {
    isLoading?: boolean
}

export const SuccessStory = ({ isLoading }: SuccessStoryProps) => {
    const { control } = useFormContext()
    const {
        fields: successStories,
        append: appendSuccessStory,
        remove: removeSuccessStory,
    } = useFieldArray({
        control,
        name: 'successStories',
    })

    const handleAppendSuccessStory = () => {
        appendSuccessStory({
            title: '',
            image: null,
        })
    }

    const handleRemoveSuccessStory = (index: number) => {
        removeSuccessStory(index)
    }

    return (
        <Card isLoading={isLoading}>
            <CardHeader>
                <CardTitle>Câu chuyện thành công</CardTitle>
            </CardHeader>
            <CardContent>
                {successStories?.map((field, index) => (
                    <div key={field?.id} className="flex items-center gap-2">
                        <div className="mt-2.5 size-32">
                            <FormUpload
                                isCompact
                                label="Hình ảnh"
                                name={`successStories.${index}.image`}
                            />
                        </div>
                        <div className="flex-1">
                            <FormTextarea label="Tiêu đề" name={`successStories.${index}.title`} />
                        </div>
                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleRemoveSuccessStory(index)}
                        >
                            <Trash2Icon />
                        </Button>
                    </div>
                ))}
                <Button size="sm" onClick={handleAppendSuccessStory}>
                    Thêm
                </Button>
            </CardContent>
        </Card>
    )
}
