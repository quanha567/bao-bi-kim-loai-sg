'use client'

import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        defaultVariants: {
            size: 'default',
            variant: 'default',
        },
        variants: {
            size: {
                default: 'h-9 px-4 py-2',
                icon: 'h-9 w-9',
                lg: 'h-10 rounded-md px-8',
                sm: 'h-8 rounded-md px-3 text-xs',
            },
            variant: {
                default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                outline:
                    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
            },
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { asChild = false, className, size, variant, disabled, isLoading, children, ...props },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(buttonVariants({ className, size, variant }))}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin text-muted" />}
                {children}
            </Comp>
        )
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
