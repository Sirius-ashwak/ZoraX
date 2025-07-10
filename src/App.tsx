import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectWallet } from './components/ConnectWallet';
import { Dashboard } from './pages/Dashboard';
import { Explore } from './pages/Explore';
import { Creators } from './pages/Creators';
import { Zap, Menu, X } from 'lucide-react';
import { Web3Provider } from './components/Web3Provider';
import { UserProvider, useUser } from './context/UserContext';
import { Layout } from './components/Layout';
import { Onboarding } from './pages/Onboarding';
import { onboardingUtils } from './utils/onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReputationProfile } from './pages/ReputationProfile';
import { Frame } from './pages/Frame';
import { SupporterDashboard } from './pages/SupporterDashboard';
import { Discover } from './pages/Discover';
import { Analytics } from './pages/Analytics';
import { AdminTools } from './pages/AdminTools';
import { Notifications } from './components/Notifications';

type Page = 'home' | 'explore' | 'dashboard' | 'creators';

// Simple error boundary component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Reload Page
      </button>
    </div>
  </div>
);

const Header = ({ 
  currentPage, 
  onNavigate, 
  isConnected 
}: { 
  currentPage: Page; 
  onNavigate: (page: Page) => void;
  isConnected: boolean;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <button 
              onClick={() => onNavigate('home')}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              ZoraX
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`transition-colors ${
                currentPage === 'home' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('explore')}
              className={`transition-colors ${
                currentPage === 'explore' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Explore
            </button>
            <button 
              onClick={() => onNavigate('creators')}
              className={`transition-colors ${
                currentPage === 'creators' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Creators
            </button>
            {isConnected && (
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Dashboard
              </button>
            )}
          </nav>
          
          <div className="hidden md:block flex items-center gap-4">
            <Notifications />
            <ConnectWallet />
          </div>
          
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <button 
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 ${
                currentPage === 'home' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => {
                onNavigate('explore');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 ${
                currentPage === 'explore' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              Explore
            </button>
            <button 
              onClick={() => {
                onNavigate('creators');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 ${
                currentPage === 'creators' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              Creators
            </button>
            {isConnected && (
              <button 
                onClick={() => {
                  onNavigate('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 ${
                  currentPage === 'dashboard' 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-600'
                }`}
              >
                Dashboard
              </button>
            )}
            <div className="pt-3 border-t border-gray-200">
              <ConnectWallet />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const HomePage = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    
    {/* Animated Background Elements */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    
    <div className="relative z-10 flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Monetize Your Work.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Prove Your Value.
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Launch Supporter Pass NFT campaigns on Optimism via Zora. Build your ZoraCred profile 
            and grow your onchain identity with every contribution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('explore')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Explore Campaigns
            </button>
            <button 
              onClick={() => onNavigate('creators')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 border border-white/20"
            >
              Discover Creators
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 border border-white/20"
            >
              Launch Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const { isConnected } = useAccount();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [error, setError] = useState<Error | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(!onboardingUtils.hasCompletedOnboarding());

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  // Simple error boundary
  if (error) {
    return <ErrorFallback error={error} />;
  }

  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'explore':
          return <Explore />;
        case 'creators':
          return <Creators />;
        case 'dashboard':
          return isConnected ? <Dashboard /> : (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center max-w-md mx-auto p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
                <p className="text-gray-600 mb-6">You need to connect your wallet to access the dashboard.</p>
                <ConnectWallet />
              </div>
            </div>
          );
        default:
          return <HomePage onNavigate={setCurrentPage} />;
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return null;
    }
  };

  try {
    return (
      <BrowserRouter>
        <Web3Provider>
          <UserProvider>
            <Layout>
              <Header 
                currentPage={currentPage} 
                onNavigate={setCurrentPage}
                isConnected={isConnected}
              />
              <main>
                <Routes>
                  <Route path="/" element={<Discover />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/creators" element={<Creators />} />
                  <Route path="/dashboard" element={isConnected ? <Dashboard /> : (
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                      <div className="text-center max-w-md mx-auto p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
                        <p className="text-gray-600 mb-6">You need to connect your wallet to access the dashboard.</p>
                        <ConnectWallet />
                      </div>
                    </div>
                  )} />
                  <Route path="/reputation" element={<ReputationProfile />} />
                  <Route path="/frame/:campaignId" element={<Frame />} />
                  <Route path="/supporter" element={<SupporterDashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/admin" element={<AdminTools />} />
                </Routes>
              </main>
            </Layout>
          </UserProvider>
        </Web3Provider>
      </BrowserRouter>
    );
  } catch (err) {
    setError(err instanceof Error ? err : new Error('Unknown error'));
    return null;
  }
}

export default App;