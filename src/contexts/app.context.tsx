'use client'

import { createContext, useContext } from 'react'

import { SettingRequestModel } from '@/models'

export const AppContextWrapper = createContext<null | SettingRequestModel>(null)

interface AppContextProps {
    children: React.ReactNode
    setting: SettingRequestModel
}

export const AppProvider = ({ children, setting }: AppContextProps) => {
    return (
        <AppContextWrapper.Provider value={{ ...setting }}>{children}</AppContextWrapper.Provider>
    )
}

export const useAppContext = (): SettingRequestModel => {
    const context = useContext(AppContextWrapper)

    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }

    return context
}
