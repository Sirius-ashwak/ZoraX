import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Zap, 
  Star, 
  Crown,
  Trophy,
  Target,
  Activity,
  Wallet,
  ArrowRight,
  BarChart3,
  Heart,
  Sparkles
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface UserRole {
  type: 'creator' | 'supporter' | 'admin' | 'new';
  campaigns: number;
  supporters: number;
  totalRaised: number;
  reputation: number;
}

const detectUserRole = async (address: string): Promise<UserRole> => {
  // Mock role detection - in real app, this would analyze blockchain data
  const mockRoles: UserRole[] = [
    { type: 'creator', campaigns: 5, supporters: 127, totalRaised: 12.5, reputation: 750 },
    { type: 'supporter', campaigns: 0, supporters: 0, totalRaised: 0, reputation: 200 },
    { type: 'new', campaigns: 0, supporters: 0, totalRaised: 0, reputation: 0 },
  ];
  
  return mockRoles[Math.floor(Math.random() * mockRoles.length)];
};

const CreatorDashboard = ({ userRole }: { userRole: UserRole }) => {
  const quickStats = [
    { icon: TrendingUp, label: 'Active Campaigns', value: userRole.campaigns.toString(), color: 'text-blue-400' },
    { icon: Users, label: 'Total Supporters', value: userRole.supporters.toString(), color: 'text-green-400' },
    { icon: Zap, label: 'ETH Raised', value: `${userRole.totalRaised}`, color: 'text-purple-400' },
    { icon: Crown, label: 'ZoraCred Score', value: userRole.reputation.toString(), color: 'text-yellow-400' },
  ];

  const recentCampaigns = [
    { id: 1, title: 'Cosmic Art Collection', status: 'Active', raised: '2.5 ETH', supporters: 42 },
    { id: 2, title: 'Space Exploration NFT', status: 'Completed', raised: '5.2 ETH', supporters: 89 },
    { id: 3, title: 'Digital Universe', status: 'Active', raised: '1.8 ETH', supporters: 23 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 glow-effect"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-cosmic text-3xl font-bold mb-2">Welcome back, Creator!</h1>
            <p className="text-muted-foreground">Ready to launch your next cosmic campaign?</p>
          </div>
          <Link
            to="/create"
            className="glass-button flex items-center gap-2 glow-effect"
          >
            <Plus className="w-5 h-5" />
            New Campaign
          </Link>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="floating-card"
          >
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Campaigns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Your Campaigns</h2>
          <Link to="/dashboard" className="text-primary hover:text-primary-hover flex items-center gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentCampaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <h3 className="font-medium">{campaign.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className={`cosmic-badge ${campaign.status === 'Active' ? 'cosmic-badge-success' : 'cosmic-badge-primary'}`}>
                    {campaign.status}
                  </span>
                  <span>{campaign.supporters} supporters</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{campaign.raised}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const SupporterDashboard = ({ userRole }: { userRole: UserRole }) => {
  const supportedCampaigns = [
    { id: 1, title: 'Cosmic Art Collection', creator: 'ArtistName', amount: '0.5 ETH', status: 'Active' },
    { id: 2, title: 'Space Exploration NFT', creator: 'SpaceCreator', amount: '1.2 ETH', status: 'Completed' },
  ];

  const trendingCampaigns = [
    { id: 1, title: 'Digital Universe', creator: 'CosmicCreator', raised: '8.5 ETH', supporters: 156 },
    { id: 2, title: 'Nebula Collection', creator: 'StarArtist', raised: '12.3 ETH', supporters: 234 },
    { id: 3, title: 'Galactic Adventures', creator: 'SpaceExplorer', raised: '5.7 ETH', supporters: 89 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 glow-effect"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-cosmic text-3xl font-bold mb-2">Welcome, Cosmic Supporter!</h1>
            <p className="text-muted-foreground">Discover amazing creators and support their journey</p>
          </div>
          <Link
            to="/explore"
            className="glass-button flex items-center gap-2 glow-effect"
          >
            <Star className="w-5 h-5" />
            Explore Campaigns
          </Link>
        </div>
      </motion.div>

      {/* Supporter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="floating-card"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-sm text-muted-foreground">Campaigns Supported</span>
          </div>
          <div className="text-2xl font-bold text-foreground">12</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="floating-card"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-muted-foreground">ZoraCred Score</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{userRole.reputation}</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="floating-card"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-muted-foreground">Total Contributed</span>
          </div>
          <div className="text-2xl font-bold text-foreground">3.7 ETH</div>
        </motion.div>
      </div>

      {/* Trending Campaigns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Trending Campaigns</h2>
          <Link to="/explore" className="text-primary hover:text-primary-hover flex items-center gap-2">
            Explore More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {trendingCampaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
              <div>
                <h3 className="font-medium">{campaign.title}</h3>
                <p className="text-sm text-muted-foreground">by {campaign.creator}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{campaign.raised}</div>
                <div className="text-sm text-muted-foreground">{campaign.supporters} supporters</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const NewUserOnboarding = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 glow-effect text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
          <Star className="w-10 h-10 text-white" />
        </div>
        <h1 className="heading-cosmic text-3xl font-bold mb-4">Welcome to the Cosmic Economy!</h1>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Zorax is where creators build reputation and launch amazing campaigns. Choose your path to get started.
        </p>
      </motion.div>

      {/* Path Selection */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="floating-card text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-4">I'm a Creator</h3>
          <p className="text-muted-foreground mb-6">
            Launch campaigns, build your reputation, and connect with supporters who believe in your vision.
          </p>
          <Link
            to="/create"
            className="glass-button w-full justify-center flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Campaign
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="floating-card text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-4">I'm a Supporter</h3>
          <p className="text-muted-foreground mb-6">
            Discover amazing creators, support their campaigns, and build your own cosmic reputation.
          </p>
          <Link
            to="/explore"
            className="glass-button w-full justify-center flex items-center gap-2"
          >
            <Star className="w-5 h-5" />
            Explore Campaigns
          </Link>
        </motion.div>
      </div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-8">What Makes Zorax Special</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">ZoraCred Reputation</h3>
            <p className="text-sm text-muted-foreground">Build trust through transparent on-chain reputation</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-medium mb-2">Cosmic Campaigns</h3>
            <p className="text-sm text-muted-foreground">Beautiful glassmorphism UI with smart contracts</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-medium mb-2">Community First</h3>
            <p className="text-sm text-muted-foreground">Connect creators with their most loyal supporters</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const SmartHub: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const { data: roleData, isLoading } = useQuery({
    queryKey: ['user-role', address],
    queryFn: () => detectUserRole(address!),
    enabled: !!address,
  });

  useEffect(() => {
    if (roleData) {
      setUserRole(roleData);
    }
  }, [roleData]);

  if (!isConnected) {
    return <NewUserOnboarding />;
  }

  if (isLoading || !userRole) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="glass-card p-8 text-center">
          <div className="w-8 h-8 mx-auto mb-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading your cosmic profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {userRole.type === 'creator' && <CreatorDashboard userRole={userRole} />}
      {userRole.type === 'supporter' && <SupporterDashboard userRole={userRole} />}
      {userRole.type === 'new' && <NewUserOnboarding />}
    </div>
  );
};