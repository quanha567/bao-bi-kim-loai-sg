import { Button } from './ui'

interface FormSubmitProps {
    isLoading: boolean
    onSubmit: () => void
}

export const FormSubmit = ({ isLoading, onSubmit }: FormSubmitProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-end bg-white p-4 drop-shadow">
            <Button onClick={onSubmit} isLoading={isLoading}>
                Lưu thay đổi
            </Button>
        </div>
    )
}
