import { LoaderIcon } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}>
            <LoaderIcon size={50} className="animate-spin text-white" />
        </div>
    )
}

export default Loading
