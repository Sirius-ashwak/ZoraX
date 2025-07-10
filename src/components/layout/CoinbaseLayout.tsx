import { CoinbaseSidebar } from './CoinbaseSidebar';
import { CoinbaseHeader } from './CoinbaseHeader';

interface CoinbaseLayoutProps {
  children: React.ReactNode;
}

export const CoinbaseLayout = ({ children }: CoinbaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <CoinbaseSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <CoinbaseHeader />
        
        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};