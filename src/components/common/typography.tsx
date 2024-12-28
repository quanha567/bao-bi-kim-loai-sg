import { cn } from '@/lib/utils'

const variants = {
    'bold-lg': 'font-bold text-lg',
    'bold-uppercase': 'text-sm font-bold uppercase leading-[20px]',
    caption: 'text-xs leading-[16px]',
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    p: 'text-base',
    'regular-sm': 'text-sm leading-[22px]',
    span: 'text-base',
}

const colors = {
    default: 'text-[#494949]',
}

type TypographyProps = {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
    className?: string
    color?: keyof typeof colors
    variant?: keyof typeof variants
} & React.PropsWithChildren

export const Typography = ({
    as = 'p', // Default to <p> if no variant is provided
    children,
    className,
    color = 'default',
    variant = 'span',
}: TypographyProps) => {
    // Define the element dynamically based on the variant
    const Component = as

    return <Component className={cn(variants[variant], className)}>{children}</Component>
}
