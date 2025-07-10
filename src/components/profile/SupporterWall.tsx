import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Medal, 
  Award, 
  TrendingUp,
  Users,
  Eye,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';

interface Supporter {
  id: string;
  address: string;
  ensName?: string;
  avatar?: string;
  tier: 'gold' | 'silver' | 'bronze' | 'supporter';
  totalSupported: number;
  campaignsSupported: number;
  firstSupportDate: string;
  lastActive: string;
  isTopBacker: boolean;
  badges: string[];
}

interface SupporterWallProps {
  supporters: Supporter[];
  showAll?: boolean;
  className?: string;
}

// Mock supporter data
const mockSupporters: Supporter[] = [
  {
    id: '1',
    address: '0xa1b2c3d4e5f6789012345678901234567890abcd',
    ensName: 'cosmic.eth',
    avatar: '/api/placeholder/40/40',
    tier: 'gold',
    totalSupported: 5.8,
    campaignsSupported: 8,
    firstSupportDate: '2023-11-15',
    lastActive: '2024-02-10',
    isTopBacker: true,
    badges: ['Early Supporter', 'Top Backer']
  },
  {
    id: '2',
    address: '0xb2c3d4e5f6789012345678901234567890abcdef',
    ensName: 'stellar.eth',
    tier: 'silver',
    totalSupported: 3.2,
    campaignsSupported: 5,
    firstSupportDate: '2023-12-01',
    lastActive: '2024-02-08',
    isTopBacker: false,
    badges: ['Loyal Supporter']
  },
  {
    id: '3',
    address: '0xc3d4e5f6789012345678901234567890abcdef12',
    ensName: 'nebula.eth',
    tier: 'bronze',
    totalSupported: 1.8,
    campaignsSupported: 3,
    firstSupportDate: '2024-01-10',
    lastActive: '2024-02-05',
    isTopBacker: false,
    badges: ['New Supporter']
  },
  {
    id: '4',
    address: '0xd4e5f6789012345678901234567890abcdef1234',
    tier: 'supporter',
    totalSupported: 0.9,
    campaignsSupported: 2,
    firstSupportDate: '2024-01-20',
    lastActive: '2024-02-03',
    isTopBacker: false,
    badges: []
  },
  {
    id: '5',
    address: '0xe5f6789012345678901234567890abcdef123456',
    ensName: 'galaxy.eth',
    tier: 'gold',
    totalSupported: 4.5,
    campaignsSupported: 6,
    firstSupportDate: '2023-10-30',
    lastActive: '2024-02-01',
    isTopBacker: true,
    badges: ['Early Supporter', 'Community Builder']
  },
  {
    id: '6',
    address: '0xf6789012345678901234567890abcdef12345678',
    tier: 'silver',
    totalSupported: 2.1,
    campaignsSupported: 4,
    firstSupportDate: '2024-01-05',
    lastActive: '2024-01-30',
    isTopBacker: false,
    badges: ['Active Supporter']
  }
];

const TierIcon: React.FC<{ tier: Supporter['tier'] }> = ({ tier }) => {
  const configs = {
    gold: { icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    silver: { icon: Medal, color: 'text-gray-300', bg: 'bg-gray-300/10' },
    bronze: { icon: Award, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    supporter: { icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' }
  };

  const config = configs[tier];
  const Icon = config.icon;

  return (
    <div className={`p-1 rounded-full ${config.bg}`}>
      <Icon className={`w-3 h-3 ${config.color}`} />
    </div>
  );
};

const SupporterCard: React.FC<{ 
  supporter: Supporter; 
  index: number; 
  onClick: (supporter: Supporter) => void;
}> = ({ supporter, index, onClick }) => {
  const displayName = supporter.ensName || 
    `${supporter.address.slice(0, 6)}...${supporter.address.slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      onClick={() => onClick(supporter)}
      className="pica-card p-4 cursor-pointer hover:border-accent/30 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-secondary/50 overflow-hidden">
            {supporter.avatar ? (
              <img 
                src={supporter.avatar} 
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Tier badge */}
          <div className="absolute -bottom-1 -right-1">
            <TierIcon tier={supporter.tier} />
          </div>
        </div>

        {/* Name and tier */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium truncate group-hover:text-accent transition-colors">
              {displayName}
            </h4>
            {supporter.isTopBacker && (
              <Crown className="w-3 h-3 text-yellow-400" />
            )}
          </div>
          <p className="text-xs text-muted-foreground capitalize">
            {supporter.tier} Supporter
          </p>
        </div>

        {/* External link */}
        <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-secondary/50 rounded transition-all">
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-center mb-3">
        <div>
          <div className="text-sm font-semibold">{supporter.totalSupported.toFixed(1)} ETH</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div>
          <div className="text-sm font-semibold">{supporter.campaignsSupported}</div>
          <div className="text-xs text-muted-foreground">Campaigns</div>
        </div>
      </div>

      {/* Badges */}
      {supporter.badges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {supporter.badges.slice(0, 2).map((badge) => (
            <span 
              key={badge}
              className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium"
            >
              {badge}
            </span>
          ))}
          {supporter.badges.length > 2 && (
            <span className="px-2 py-1 bg-secondary/50 text-muted-foreground rounded-md text-xs">
              +{supporter.badges.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Last active */}
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Last active: {new Date(supporter.lastActive).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
};

const TopSupporterSpotlight: React.FC<{ supporter: Supporter }> = ({ supporter }) => {
  const displayName = supporter.ensName || 
    `${supporter.address.slice(0, 6)}...${supporter.address.slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pica-card p-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/5" />
      
      <div className="relative z-10 flex items-center gap-4">
        {/* Avatar with glow */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-secondary/50 overflow-hidden ring-2 ring-yellow-400/30">
            {supporter.avatar ? (
              <img 
                src={supporter.avatar} 
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="absolute -top-1 -right-1 p-1 bg-yellow-400 rounded-full">
            <Crown className="w-4 h-4 text-black" />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold">{displayName}</h3>
            <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-medium">
              Top Backer
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-2">
            Supporting since {new Date(supporter.firstSupportDate).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-yellow-400 font-semibold">
              {supporter.totalSupported.toFixed(1)} ETH contributed
            </span>
            <span className="text-muted-foreground">
              {supporter.campaignsSupported} campaigns backed
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SupporterWall: React.FC<SupporterWallProps> = ({
  supporters = mockSupporters,
  showAll = false,
  className
}) => {
  const [viewAll, setViewAll] = useState(showAll);
  
  const sortedSupporters = [...supporters].sort((a, b) => {
    if (a.isTopBacker && !b.isTopBacker) return -1;
    if (!a.isTopBacker && b.isTopBacker) return 1;
    return b.totalSupported - a.totalSupported;
  });

  const displayedSupporters = viewAll ? sortedSupporters : sortedSupporters.slice(0, 6);
  const topSupporter = sortedSupporters.find(s => s.isTopBacker);

  const handleSupporterClick = (supporter: Supporter) => {
    console.log('View supporter profile:', supporter.id);
    // In a real app, navigate to supporter profile or show modal
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Supporter Wall</h2>
          <p className="text-muted-foreground">
            Community members who believe in your creative journey
          </p>
        </div>
        
        {supporters.length > 6 && (
          <button
            onClick={() => setViewAll(!viewAll)}
            className="text-accent hover:text-accent/80 text-sm font-medium"
          >
            {viewAll ? 'Show Less' : `View All ${supporters.length}`}
          </button>
        )}
      </div>

      {/* Top Supporter Spotlight */}
      {topSupporter && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            Top Supporter Spotlight
          </h3>
          <TopSupporterSpotlight supporter={topSupporter} />
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-accent">{supporters.length}</div>
          <div className="text-sm text-muted-foreground">Total Supporters</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-yellow-400">
            {supporters.reduce((sum, s) => sum + s.totalSupported, 0).toFixed(1)} ETH
          </div>
          <div className="text-sm text-muted-foreground">Total Support</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-green-400">
            {supporters.filter(s => s.isTopBacker).length}
          </div>
          <div className="text-sm text-muted-foreground">Top Backers</div>
        </div>
      </div>

      {/* Supporter Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          Community Supporters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedSupporters.map((supporter, index) => (
            <SupporterCard
              key={supporter.id}
              supporter={supporter}
              index={index}
              onClick={handleSupporterClick}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="pica-card p-6 text-center"
      >
        <h3 className="text-lg font-semibold mb-2">Join the Community</h3>
        <p className="text-muted-foreground mb-4">
          Support this creator and become part of their creative journey
        </p>
        <button className="pica-button">
          Become a Supporter
        </button>
      </motion.div>
    </div>
  );
};