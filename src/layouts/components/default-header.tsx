import { HeaderBottom } from './header-bottom'
import { HeaderContact } from './header-contact'

export interface DefaultHeaderProps {
    address: string
    mail: string
    phoneNumber: string
}

export const DefaultHeader = (props: DefaultHeaderProps) => {
    return (
        <header className="border-b bg-background">
            <HeaderContact {...props} />
            <HeaderBottom />
        </header>
    )
}
