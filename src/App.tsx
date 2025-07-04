import React, { useState } from 'react';
import { 
  Zap, 
  Users, 
  TrendingUp, 
  Shield, 
  Coins, 
  Star,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Award,
  Globe,
  Sparkles,
  Heart,
  Vote,
  Eye,
  Lock,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { Web3Provider } from './components/Web3Provider';
import { ConnectWallet } from './components/ConnectWallet';
import { Dashboard } from './pages/Dashboard';
import { Explore } from './pages/Explore';

type Page = 'home' | 'explore' | 'dashboard';

const Header = ({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (page: Page) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <button 
              onClick={() => onNavigate('home')}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              CredVault
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('explore')}
              className={`transition-colors ${currentPage === 'explore' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Explore
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`transition-colors ${currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Dashboard
            </button>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <ConnectWallet />
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => {
                  onNavigate('explore');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left transition-colors ${currentPage === 'explore' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Explore
              </button>
              <button 
                onClick={() => {
                  onNavigate('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left transition-colors ${currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Dashboard
              </button>
              <div className="pt-4 border-t border-gray-200">
                <ConnectWallet />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 mr-2" />
          Built on Zora Protocol + Optimism
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Monetize your work.
          <br />
          <span className="text-blue-600">Prove your value.</span>
          <br />
          <span className="text-purple-600">Grow your onchain identity.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Launch supporter NFT campaigns to raise funds while automatically building a verifiable 
          reputation profile that showcases your earnings, engagement, and campaign success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
          >
            Start Your Campaign
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button 
            onClick={() => onNavigate('explore')}
            className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Explore Campaigns
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          One Platform, Two Powerful Benefits
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Combine direct creator funding with automatic reputation building to unlock new opportunities
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">For Creators</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Launch supporter NFT campaigns to raise funds directly</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Automatically generate ZoraCred profiles showing earnings & engagement</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Offer exclusive perks like early access and token-gated content</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Build portable, verifiable reputation across Web3</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">For Supporters</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Back creators early and unlock exclusive perks</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Influence projects through voting and feedback</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Build your own supporter history and earn recognition</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Get a stake in creator journeys and potential returns</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Reputation Scoring</h4>
          <p className="text-gray-600">Real onchain metrics: revenue, mints, engagement, and campaign success</p>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Token-Gated Access</h4>
          <p className="text-gray-600">Exclusive content, early access, and special perks for supporters</p>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Vote className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Community Voting</h4>
          <p className="text-gray-600">Supporters influence project direction and creator decisions</p>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Simple steps to launch your campaign and build your onchain reputation
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">1</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Campaign</h3>
          <p className="text-gray-600">Set up your supporter NFT campaign with perks and funding goals</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">2</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Mint & Distribute</h3>
          <p className="text-gray-600">Supporters mint NFTs on Zora Protocol and receive exclusive access</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">3</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Reputation</h3>
          <p className="text-gray-600">Earnings and engagement automatically update your ZoraCred profile</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">4</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow & Scale</h3>
          <p className="text-gray-600">Use your verified reputation to attract more supporters and opportunities</p>
        </div>
      </div>
    </div>
  </section>
);

const Partners = () => (
  <section id="partners" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built on Best-in-Class Infrastructure</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leveraging the most trusted protocols and platforms in Web3
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Zora Protocol</h3>
          <p className="text-sm text-gray-600">NFT minting and indexing infrastructure</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Farcaster</h3>
          <p className="text-sm text-gray-600">Campaign discovery and social features</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Optimism</h3>
          <p className="text-sm text-gray-600">Low-cost, scalable blockchain deployment</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Uniswap</h3>
          <p className="text-sm text-gray-600">Optional token trading and liquidity</p>
        </div>
      </div>
    </div>
  </section>
);

const CTA = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Onchain Identity?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
        Join thousands of creators who are already monetizing their work and building verifiable reputation onchain.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center"
        >
          Launch Your First Campaign
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <button 
          onClick={() => onNavigate('explore')}
          className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          Explore Campaigns
          <ExternalLink className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CredVault</span>
          </div>
          <p className="text-gray-400">
            Build trust, prove impact, and own your creative identity onchain.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Platform</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Launch Campaign</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Browse Creators</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Reputation Scoring</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; 2024 CredVault. All rights reserved. Built with ❤️ for creators.</p>
      </div>
    </div>
  </footer>
);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'explore':
        return <Explore />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Features />
            <HowItWorks />
            <Partners />
            <CTA onNavigate={setCurrentPage} />
            <Footer />
          </>
        );
    }
  };

  return (
    <Web3Provider>
      <div className="min-h-screen bg-white">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        {renderPage()}
      </div>
    </Web3Provider>
  );
}

export default App;