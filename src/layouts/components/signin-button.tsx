import { login } from '@/lib/auth'

export function SignIn() {
    return (
        <form action={login}>
            <button type="submit">Sign in</button>
        </form>
    )
}
