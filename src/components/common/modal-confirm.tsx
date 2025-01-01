import { Trash2, TriangleAlert } from 'lucide-react'

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Typography,
} from '..'

interface ModalConfirmProps {
    isLoading?: boolean
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export const ModalConfirm = ({ isOpen, onClose, onConfirm, isLoading }: ModalConfirmProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="flex flex-col items-center">
                    <DialogTitle className="flex size-32 items-center justify-center rounded-full bg-orange-100">
                        <div className="flex size-20 items-center justify-center rounded-full bg-orange-500">
                            <TriangleAlert size={30} className="text-white" />
                        </div>
                    </DialogTitle>
                    <DialogDescription className="mt-4 text-lg font-bold">
                        Bao Bì Kim Loại Sài Gòn
                    </DialogDescription>
                </DialogHeader>
                <Typography className="text-center">
                    Bạn có chắc muốn xóa dữ liệu này không? Sau khi xóa dữ liệu sẽ không thể khôi
                    phục!
                </Typography>
                <DialogFooter className="grid grid-cols-2">
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={onConfirm} isLoading={isLoading} variant="destructive">
                        <Trash2 />
                        xóa
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
