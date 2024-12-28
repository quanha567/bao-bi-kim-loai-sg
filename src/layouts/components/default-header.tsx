import { HeaderBottom } from './header-bottom'
import { HeaderContact } from './header-contact'

export const DefaultHeader = () => {
    return (
        <header className="border-b bg-background">
            <HeaderContact />
            <HeaderBottom />
        </header>
    )
}
