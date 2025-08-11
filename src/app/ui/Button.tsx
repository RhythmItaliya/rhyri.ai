'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
        const baseClasses =
            'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-colors';

        const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
            secondary:
                'bg-foreground/5 text-foreground hover:bg-foreground/10 focus:ring-primary-500',
            danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
        } as const;

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
        } as const;

        return (
            <button
                ref={ref}
                {...props}
                className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
