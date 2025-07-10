import React from 'react';

export type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
};

export const Tag: React.FC<TagProps> = ({ children, className, ...props }) => (
  <span
    className={`inline-block bg-bg-secondary border border-accent text-accent px-2 py-0.5 rounded text-xs font-medium ${className ?? ''}`}
    {...props}
  >
    {children}
  </span>
); 