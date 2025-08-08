'use client';
import { ButtonHTMLAttributes } from 'react';

const variants: Record<string, string> = {
     blue: 'bg-blue-600 text-white',
     red: 'bg-red-600 text-white',
     gray: 'bg-gray-200 text-black',
};

export default function Button({
     variant = 'blue',
     className = '',
     children,
     ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'blue' | 'red' | 'gray' }) {
     const isLoading =
          props.disabled && (props['aria-busy'] === true || props['aria-busy'] === 'true');
     return (
          <button
               {...props}
               className={
                    variants[variant] +
                    ' px-3 py-1 rounded flex items-center justify-center gap-2 ' +
                    className
               }
          >
               {isLoading && (
                    <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
               )}
               {children}
          </button>
     );
}
