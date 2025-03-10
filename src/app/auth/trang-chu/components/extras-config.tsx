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

interface ExtrasProps {
    isLoading?: boolean
}

export const Extras = ({ isLoading }: ExtrasProps) => {
    const { control } = useFormContext()
    const {
        fields: extras,
        append: appendExtras,
        remove: removeExtras,
    } = useFieldArray({
        control,
        name: 'extras',
    })

    const handleAppendExtras = () => {
        appendExtras({
            title: '',
            image: null,
        })
    }

    const handleRemoveExtras = (index: number) => {
        removeExtras(index)
    }

    return (
        <Card isLoading={isLoading}>
            <CardHeader>
                <CardTitle>Hình ảnh khác</CardTitle>
            </CardHeader>
            <CardContent>
                {extras?.map((field, index) => (
                    <div key={field?.id} className="flex items-center gap-2">
                        <div className="mt-2.5 size-32">
                            <FormUpload isCompact label="Hình ảnh" name={`extras.${index}.image`} />
                        </div>
                        <div className="flex-1">
                            <FormTextarea label="Tiêu đề" name={`extras.${index}.title`} />
                        </div>
                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleRemoveExtras(index)}
                        >
                            <Trash2Icon />
                        </Button>
                    </div>
                ))}
                <Button size="sm" onClick={handleAppendExtras}>
                    Thêm
                </Button>
            </CardContent>
        </Card>
    )
}
