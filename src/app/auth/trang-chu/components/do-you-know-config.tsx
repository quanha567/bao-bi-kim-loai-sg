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

interface DoYouKnowConfigProps {
    isLoading?: boolean
}

export const DoYouKnowConfig = ({ isLoading }: DoYouKnowConfigProps) => {
    const { control } = useFormContext()
    const {
        fields: doYouKnows,
        append: appendDoYouKnow,
        remove: removeDoYouKnow,
    } = useFieldArray({
        control,
        name: 'doYouKnows',
    })

    const handleAppendDoYouKnow = () => {
        appendDoYouKnow({
            title: '',
            image: null,
        })
    }

    const handleRemoveDoYouKnow = (index: number) => {
        removeDoYouKnow(index)
    }

    return (
        <Card isLoading={isLoading}>
            <CardHeader>
                <CardTitle>Bạn có biết</CardTitle>
            </CardHeader>
            <CardContent>
                {doYouKnows?.map((field, index) => (
                    <div key={field?.id} className="flex items-center gap-2">
                        <div className="mt-2.5 size-32">
                            <FormUpload
                                isCompact
                                label="Hình ảnh"
                                name={`doYouKnows.${index}.image`}
                            />
                        </div>
                        <div className="flex-1">
                            <FormTextarea label="Tiêu đề" name={`doYouKnows.${index}.title`} />
                        </div>
                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleRemoveDoYouKnow(index)}
                        >
                            <Trash2Icon />
                        </Button>
                    </div>
                ))}
                <Button size="sm" onClick={handleAppendDoYouKnow}>
                    Thêm
                </Button>
            </CardContent>
        </Card>
    )
}
