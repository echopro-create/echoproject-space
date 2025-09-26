// app/components/UI/Button.tsx
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    disabled,
    ...props 
  }, ref) => {

    // Базовые стили для всех кнопок (A11y: минимальная высота 44px)
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed';

    // Размеры
    const sizeStyles = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base min-h-[44px]', // Min-h 44px для A11y
      lg: 'h-14 px-6 text-lg min-h-[44px]',
    }[size];

    // Варианты
    const variantStyles = {
      primary: 'bg-accent text-white hover:bg-opacity-90 active:bg-opacity-80',
      secondary: 'bg-white text-primary-text border border-border-light hover:bg-gray-50 active:bg-gray-100',
      ghost: 'bg-transparent text-accent hover:bg-accent/10 active:bg-accent/20',
    }[variant];

    return (
      <button
        ref={ref}
        className={twMerge(baseStyles, sizeStyles, variantStyles, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : children}
      </button>
    );
  }
);
Button.displayName = 'Button';