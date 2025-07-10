import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Star, Crown, Gift, MessageCircle, Calendar, TrendingUp,
  Search, Filter, Download, Mail, Award, Heart, ExternalLink
} from 'lucide-react';
import { Link } from 'wouter';

// Mock supporter data
const mockSupporters = [
  {
    id: 1,
    address: '0xa1b2c3d4e5f6789012345678901234567890abcd',
    ensName: 'cosmic-supporter.eth',
    avatar: '/api/placeholder/40/40',
    totalSupported: 2.45,
    campaignsSupported: 8,
    firstSupport: '2024-12-15',
    lastSupport: '2025-01-07',
    tier: 'legendary',
    badges: ['early-supporter', 'top-contributor', 'loyal-fan'],
    favorite: true,
    totalInteractions: 156,
    referrals: 12
  },
  {
    id: 2,
    address: '0xb2c3d4e5f6789012345678901234567890abcdef',
    ensName: 'art-lover.eth',
    avatar: '/api/placeholder/40/40',
    totalSupported: 1.87,
    campaignsSupported: 5,
    firstSupport: '2025-01-01',
    lastSupport: '2025-01-06',
    tier: 'gold',
    badges: ['art-enthusiast', 'consistent-supporter'],
    favorite: false,
    totalInteractions: 89,
    referrals: 7
  },
  {
    id: 3,
    address: '0xc3d4e5f6789012345678901234567890abcdef12',
    ensName: 'music-fan.eth',
    avatar: '/api/placeholder/40/40',
    totalSupported: 1.23,
    campaignsSupported: 6,
    firstSupport: '2024-12-20',
    lastSupport: '2025-01-05',
    tier: 'silver',
    badges: ['music-lover', 'community-builder'],
    favorite: true,
    totalInteractions: 67,
    referrals: 3
  },
  {
    id: 4,
    address: '0xd4e5f6789012345678901234567890abcdef1234',
    ensName: 'early-adopter.eth',
    avatar: '/api/placeholder/40/40',
    totalSupported: 0.95,
    campaignsSupported: 3,
    firstSupport: '2025-01-03',
    lastSupport: '2025-01-04',
    tier: 'bronze',
    badges: ['newcomer'],
    favorite: false,
    totalInteractions: 34,
    referrals: 1
  }
];

const supporterTiers = {
  legendary: { color: 'from-purple-500 to-pink-500', icon: Crown, minSupport: 2.0 },
  gold: { color: 'from-yellow-500 to-orange-500', icon: Star, minSupport: 1.0 },
  silver: { color: 'from-gray-400 to-gray-600', icon: Award, minSupport: 0.5 },
  bronze: { color: 'from-orange-600 to-red-600', icon: Heart, minSupport: 0.1 }
};

const badgeInfo = {
  'early-supporter': { label: 'Early Supporter', color: 'bg-blue-500' },
  'top-contributor': { label: 'Top Contributor', color: 'bg-purple-500' },
  'loyal-fan': { label: 'Loyal Fan', color: 'bg-green-500' },
  'art-enthusiast': { label: 'Art Enthusiast', color: 'bg-pink-500' },
  'consistent-supporter': { label: 'Consistent', color: 'bg-indigo-500' },
  'music-lover': { label: 'Music Lover', color: 'bg-red-500' },
  'community-builder': { label: 'Community Builder', color: 'bg-yellow-500' },
  'newcomer': { label: 'Newcomer', color: 'bg-gray-500' }
};

export const SupportersPage: React.FC = () => {
  const [supporters, setSupporters] = useState(mockSupporters);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [sortBy, setSortBy] = useState('totalSupported');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredSupporters = supporters
    .filter(supporter => {
      if (showFavoritesOnly && !supporter.favorite) return false;
      if (selectedTier !== 'all' && supporter.tier !== selectedTier) return false;
      if (searchQuery) {
        return supporter.ensName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               supporter.address.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'totalSupported':
          return b.totalSupported - a.totalSupported;
        case 'campaignsSupported':
          return b.campaignsSupported - a.campaignsSupported;
        case 'lastSupport':
          return new Date(b.lastSupport).getTime() - new Date(a.lastSupport).getTime();
        case 'interactions':
          return b.totalInteractions - a.totalInteractions;
        default:
          return 0;
      }
    });

  const toggleFavorite = (supporterId: number) => {
    setSupporters(prev => 
      prev.map(supporter => 
        supporter.id === supporterId 
          ? { ...supporter, favorite: !supporter.favorite }
          : supporter
      )
    );
  };

  const SupporterCard: React.FC<{ supporter: typeof mockSupporters[0] }> = ({ supporter }) => {
    const tierInfo = supporterTiers[supporter.tier as keyof typeof supporterTiers];
    const TierIcon = tierInfo.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={supporter.avatar}
                alt={supporter.ensName}
                className="w-12 h-12 rounded-full"
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${tierInfo.color} flex items-center justify-center`}>
                <TierIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{supporter.ensName}</h3>
                <button
                  onClick={() => toggleFavorite(supporter.id)}
                  className={`transition-colors ${
                    supporter.favorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${supporter.favorite ? 'fill-current' : ''}`} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                {supporter.address.slice(0, 6)}...{supporter.address.slice(-4)}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">{supporter.totalSupported} ETH</div>
            <div className="text-sm text-muted-foreground capitalize">{supporter.tier} Tier</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <div className="text-muted-foreground">Campaigns Supported</div>
            <div className="font-medium text-foreground">{supporter.campaignsSupported}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Interactions</div>
            <div className="font-medium text-foreground">{supporter.totalInteractions}</div>
          </div>
          <div>
            <div className="text-muted-foreground">First Support</div>
            <div className="font-medium text-foreground">
              {new Date(supporter.firstSupport).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Last Support</div>
            <div className="font-medium text-foreground">
              {new Date(supporter.lastSupport).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-muted-foreground mb-2">Badges</div>
          <div className="flex flex-wrap gap-2">
            {supporter.badges.map((badge, index) => {
              const badgeConfig = badgeInfo[badge as keyof typeof badgeInfo];
              return (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs text-white font-medium ${badgeConfig.color}`}
                >
                  {badgeConfig.label}
                </span>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Link
            href={`/profile/${supporter.address}`}
            className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center text-sm font-medium"
          >
            View Profile
          </Link>
          
          <button className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </button>
          
          <button className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
            <Gift className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  const stats = {
    totalSupporters: supporters.length,
    totalSupported: supporters.reduce((sum, s) => sum + s.totalSupported, 0),
    averageSupport: supporters.reduce((sum, s) => sum + s.totalSupported, 0) / supporters.length,
    topTierCount: supporters.filter(s => s.tier === 'legendary').length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Supporters</h1>
            <p className="text-muted-foreground">
              Manage your supporter community and build lasting relationships
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Mail className="w-4 h-4" />
              Send Update
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Supporters</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.totalSupporters}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Total Supported</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.totalSupported.toFixed(2)} ETH</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">Average Support</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.averageSupport.toFixed(3)} ETH</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-muted-foreground">Legendary Tier</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.topTierCount}</div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search supporters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Tiers</option>
              <option value="legendary">Legendary</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="totalSupported">Total Supported</option>
              <option value="campaignsSupported">Campaigns Supported</option>
              <option value="lastSupport">Last Support</option>
              <option value="interactions">Interactions</option>
            </select>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="favorites-only"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary/20"
              />
              <label htmlFor="favorites-only" className="text-sm font-medium text-foreground">
                Favorites only
              </label>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredSupporters.length} supporters
          </div>
        </div>

        {/* Supporters Grid */}
        {filteredSupporters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupporters.map((supporter) => (
              <SupporterCard key={supporter.id} supporter={supporter} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No supporters found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or explore different filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTier('all');
                setShowFavoritesOnly(false);
              }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};