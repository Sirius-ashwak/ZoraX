import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    // Dynamically inject Google Fonts for Inter and Satoshi
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Satoshi:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-body">
      {children}
    </div>
  );
}; 