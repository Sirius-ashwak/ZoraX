import React from 'react';
import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'font-heading px-5 py-2 rounded-lg transition-all duration-200 focus:outline-none',
        {
          'bg-accent text-text-primary shadow-glow hover:bg-accent-hover': variant === 'primary',
          'bg-bg-secondary text-accent border border-accent': variant === 'secondary',
          'bg-transparent border border-accent text-accent': variant === 'outline',
          'opacity-60 cursor-not-allowed': disabled || loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="animate-spin mr-2">⏳</span> : null}
      {children}
    </button>
  );
}; 