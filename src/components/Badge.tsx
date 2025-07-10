import React from 'react';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({ children, className, ...props }) => (
  <span
    className={`inline-block bg-accent text-text-primary px-3 py-1 rounded-full text-xs font-semibold shadow-glow ${className ?? ''}`}
    {...props}
  >
    {children}
  </span>
); 