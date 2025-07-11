import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Users, Zap, TrendingUp, Wallet, Settings, Bell } from 'lucide-react';
import { ModernDashboard } from './ModernDashboard';

// Mock function to determine user role - in production, this would check blockchain data
const getUserRole = async (address: string): Promise<'creator' | 'supporter' | 'new'> => {
  // First check localStorage for saved preference
  const savedRole = localStorage.getItem(`zorax_role_${address}`);
  if (savedRole === 'creator' || savedRole === 'supporter') {
    return savedRole as 'creator' | 'supporter';
  }

  // Check if user has created campaigns (creator)
  // Check if user has supported campaigns (supporter)
  // Return 'new' if neither
  
  // For demo purposes, we'll simulate this
  const mockCreators = ['0x1234', '0x5678']; // These would be actual addresses that have created campaigns
  const mockSupporters = ['0xabcd', '0xefgh']; // These would be actual addresses that have supported campaigns
  
  if (mockCreators.some(addr => address.toLowerCase().includes(addr))) {
    return 'creator';
  }
  if (mockSupporters.some(addr => address.toLowerCase().includes(addr))) {
    return 'supporter';
  }
  return 'new';
};

// Function to save user role preference
const saveUserRole = (address: string, role: 'creator' | 'supporter') => {
  localStorage.setItem(`zorax_role_${address}`, role);
};

interface SupporterDashboardModernProps {}

const SupporterDashboardModern: React.FC<SupporterDashboardModernProps> = () => {
  const { address } = useAccount();
  const [supportedCampaigns] = useState([
    {
      id: '1',
      title: 'Stellar Journey NFT Collection',
      creator: 'SpaceArtist.eth',
      contribution: '1.2 ETH',
      nftsOwned: 3,
      imageUrl: 'https://picsum.photos/400/300?random=1',
      status: 'active',
      updates: 5,
      lastUpdate: '2 days ago'
    },
    {
      id: '2', 
      title: 'Neo Digital Art Series',
      creator: 'FutureCreator.eth',
      contribution: '0.8 ETH',
      nftsOwned: 2,
      imageUrl: 'https://picsum.photos/400/300?random=2',
      status: 'completed',
      updates: 12,
      lastUpdate: '1 week ago'
    }
  ]);

  const [nftCollection] = useState([
    { id: '1', name: 'Stellar Ship #42', rarity: 'Rare', value: '0.5 ETH', campaign: 'Stellar Journey NFT' },
    { id: '2', name: 'Cosmic Explorer #13', rarity: 'Epic', value: '0.8 ETH', campaign: 'Stellar Journey NFT' },
    { id: '3', name: 'Future Art #7', rarity: 'Common', value: '0.2 ETH', campaign: 'Neo Digital Art Series' }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Supporter Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Your supporter hub'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Role Switch */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-500">Supporter</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <a href="/creator-dashboard" className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Switch to Creator</p>
                      <p className="text-xs text-muted-foreground">Manage campaigns</p>
                    </div>
                  </a>
                </div>
              </div>
              
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Supporter Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card/50 border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Wallet className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-foreground">Total Contributed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">2.0 ETH</p>
            <p className="text-sm text-muted-foreground">Across {supportedCampaigns.length} campaigns</p>
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm font-medium text-foreground">NFTs Owned</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{nftCollection.length}</p>
            <p className="text-sm text-muted-foreground">Total value: 1.5 ETH</p>
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm font-medium text-foreground">Portfolio Value</span>
            </div>
            <p className="text-2xl font-bold text-foreground">3.5 ETH</p>
            <p className="text-sm text-green-500">+0.3 ETH (9.4%)</p>
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-foreground">Supporter Level</span>
            </div>
            <p className="text-2xl font-bold text-foreground">Silver</p>
            <p className="text-sm text-muted-foreground">Unlock Gold at 5 ETH</p>
          </div>
        </div>

        {/* Supported Campaigns */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Supported Campaigns</h2>
          <div className="grid gap-6">
            {supportedCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/50 border border-border rounded-xl p-6 hover:bg-card/80 transition-colors"
              >
                <div className="flex gap-4">
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                        <p className="text-sm text-muted-foreground">by {campaign.creator}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        campaign.status === 'active' 
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Your contribution:</span>
                        <p className="font-semibold text-foreground">{campaign.contribution}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">NFTs owned:</span>
                        <p className="font-semibold text-foreground">{campaign.nftsOwned}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Latest update:</span>
                        <p className="font-semibold text-foreground">{campaign.lastUpdate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* NFT Collection */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Your NFT Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nftCollection.map((nft) => (
              <div key={nft.id} className="bg-card/50 border border-border rounded-xl p-6">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{nft.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rarity:</span>
                    <span className={`font-medium ${
                      nft.rarity === 'Epic' ? 'text-purple-500' :
                      nft.rarity === 'Rare' ? 'text-blue-500' : 'text-green-500'
                    }`}>{nft.rarity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Value:</span>
                    <span className="font-medium text-foreground">{nft.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From:</span>
                    <span className="font-medium text-foreground text-xs">{nft.campaign}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SmartDashboardProps {}

export const SmartDashboard: React.FC<SmartDashboardProps> = () => {
  const { address, isConnected } = useAccount();
  const [userRole, setUserRole] = useState<'creator' | 'supporter' | 'new' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      getUserRole(address).then(role => {
        setUserRole(role);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [address]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show browse mode if no wallet connected
  if (!isConnected) {
    return <ModernDashboard />;
  }

  // Show role selection for new users
  if (userRole === 'new') {
    const handleRoleSelection = (role: 'creator' | 'supporter') => {
      if (address) {
        saveUserRole(address, role);
      }
      setUserRole(role);
    };

    const handleSkipForNow = () => {
      // Let users browse in creator mode without saving preference
      setUserRole('creator');
    };

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Welcome to ZoraX!</h1>
              <p className="text-muted-foreground mb-2">
                Choose how you'd like to get started on the platform
              </p>
              <p className="text-sm text-muted-foreground">
                You can always switch between modes later
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-xl p-8 hover:bg-card/80 transition-colors cursor-pointer group"
                   onClick={() => handleRoleSelection('creator')}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">I'm a Creator</h3>
                    <p className="text-muted-foreground">
                      Launch campaigns, build community, and raise funds for your projects
                    </p>
                  </div>
                  <div className="text-xs text-purple-500 font-medium">
                    Recommended for artists & builders
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-8 hover:bg-card/80 transition-colors cursor-pointer group"
                   onClick={() => handleRoleSelection('supporter')}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">I'm a Supporter</h3>
                    <p className="text-muted-foreground">
                      Discover amazing projects, collect NFTs, and support creators
                    </p>
                  </div>
                  <div className="text-xs text-blue-500 font-medium">
                    Recommended for collectors & investors
                  </div>
                </div>
              </div>
            </div>

            {/* Skip for now option */}
            <div className="pt-4 border-t border-border">
              <button 
                onClick={handleSkipForNow}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors underline-offset-4 hover:underline"
              >
                Skip for now - just let me browse
              </button>
              <p className="text-xs text-muted-foreground mt-2">
                You can choose your role anytime from the dashboard
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on role
  if (userRole === 'creator') {
    return <ModernDashboard />;
  } else if (userRole === 'supporter') {
    return <SupporterDashboardModern />;
  }

  // Fallback to creator dashboard
  return <ModernDashboard />;
};
