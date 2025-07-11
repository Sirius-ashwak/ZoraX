import React from 'react';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div
    className={`bg-bg-secondary text-text-primary rounded-xl shadow-cosmic p-6 ${className ?? ''}`}
    {...props}
  >
    {children}
  </div>
); 