import { SettingResponseModel } from '@/models'

import { HeaderBottom } from './header-bottom'
import { HeaderContact } from './header-contact'

export type DefaultHeaderProps = SettingResponseModel

export const DefaultHeader = (props: DefaultHeaderProps) => {
    return (
        <header className="border-b bg-background">
            <HeaderContact {...props} />
            <HeaderBottom {...props} />
        </header>
    )
}
