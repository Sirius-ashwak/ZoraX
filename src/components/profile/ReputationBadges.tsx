import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Crown, 
  Star, 
  TrendingUp,
  Users,
  GitBranch,
  Zap,
  Target,
  Shield,
  Flame,
  Calendar,
  Trophy,
  Info,
  Lock,
  CheckCircle
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: 'achievement' | 'milestone' | 'social' | 'creative' | 'community';
  earnedAt?: string;
  progress?: {
    current: number;
    target: number;
    unit: string;
  };
  requirements: string[];
  isEarned: boolean;
  isVisible: boolean;
}

interface ReputationBadgesProps {
  badges: Badge[];
  showProgress?: boolean;
  className?: string;
}

// Mock badges data
const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Top 10 Creator of the Month',
    description: 'Ranked in the top 10 creators by total volume this month',
    icon: Crown,
    rarity: 'legendary',
    category: 'achievement',
    earnedAt: '2024-02-01',
    requirements: ['Rank in top 10 by volume', 'Maintain position for 7+ days'],
    isEarned: true,
    isVisible: true
  },
  {
    id: '2',
    name: 'Most Remixed Campaign',
    description: 'Created a campaign that became the most remixed this quarter',
    icon: GitBranch,
    rarity: 'epic',
    category: 'creative',
    earnedAt: '2024-01-15',
    requirements: ['Campaign receives 50+ remixes', 'Remix depth of 3+ levels'],
    isEarned: true,
    isVisible: true
  },
  {
    id: '3',
    name: 'Verified Artist',
    description: 'Verified status based on Zora + Farcaster trust graph',
    icon: Shield,
    rarity: 'rare',
    category: 'social',
    earnedAt: '2023-12-10',
    requirements: ['Verified ENS', 'Active Farcaster presence', 'Community vouching'],
    isEarned: true,
    isVisible: true
  },
  {
    id: '4',
    name: '1K Supporters Club',
    description: 'Reached 1,000 unique supporters across all campaigns',
    icon: Users,
    rarity: 'rare',
    category: 'milestone',
    earnedAt: '2024-02-05',
    requirements: ['1,000 unique supporters', 'Multiple successful campaigns'],
    isEarned: true,
    isVisible: true
  },
  {
    id: '5',
    name: 'Early Adopter',
    description: 'Joined ZoraX in the first month of launch',
    icon: Star,
    rarity: 'uncommon',
    category: 'milestone',
    earnedAt: '2023-10-15',
    requirements: ['Register within first month', 'Launch at least one campaign'],
    isEarned: true,
    isVisible: true
  },
  {
    id: '6',
    name: 'Community Builder',
    description: 'Actively engaged in helping other creators succeed',
    icon: Flame,
    rarity: 'epic',
    category: 'community',
    earnedAt: '2024-01-20',
    requirements: ['Mentor 5+ creators', '100+ community interactions'],
    isEarned: true,
    isVisible: true
  },
  {
    id: '7',
    name: 'Consistency Champion',
    description: 'Launched campaigns for 6 consecutive months',
    icon: Calendar,
    rarity: 'rare',
    category: 'achievement',
    progress: {
      current: 4,
      target: 6,
      unit: 'months'
    },
    requirements: ['6 consecutive months of campaigns', 'Minimum engagement threshold'],
    isEarned: false,
    isVisible: true
  },
  {
    id: '8',
    name: 'Revenue Milestone',
    description: 'Earned over 100 ETH in total campaign revenue',
    icon: Target,
    rarity: 'legendary',
    category: 'milestone',
    progress: {
      current: 67,
      target: 100,
      unit: 'ETH'
    },
    requirements: ['100 ETH total revenue', 'Across multiple campaigns'],
    isEarned: false,
    isVisible: true
  },
  {
    id: '9',
    name: 'Innovation Award',
    description: 'Created groundbreaking campaign format',
    icon: Trophy,
    rarity: 'legendary',
    category: 'creative',
    requirements: ['Introduce new campaign type', 'Community adoption', 'Platform recognition'],
    isEarned: false,
    isVisible: false
  }
];

const getRarityConfig = (rarity: Badge['rarity']) => {
  const configs = {
    common: { 
      color: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
      glow: 'group-hover:shadow-gray-400/20'
    },
    uncommon: { 
      color: 'text-green-400 bg-green-400/10 border-green-400/20',
      glow: 'group-hover:shadow-green-400/20'
    },
    rare: { 
      color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      glow: 'group-hover:shadow-blue-400/20'
    },
    epic: { 
      color: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      glow: 'group-hover:shadow-purple-400/20'
    },
    legendary: { 
      color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      glow: 'group-hover:shadow-yellow-400/20'
    }
  };
  return configs[rarity];
};

const BadgeCard: React.FC<{ 
  badge: Badge; 
  index: number;
  onClick: (badge: Badge) => void;
}> = ({ badge, index, onClick }) => {
  const rarityConfig = getRarityConfig(badge.rarity);
  const Icon = badge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      onClick={() => onClick(badge)}
      className={`pica-card p-4 cursor-pointer transition-all duration-300 group ${
        badge.isEarned ? 'hover:border-accent/30' : 'opacity-60'
      } ${rarityConfig.glow} hover:shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${rarityConfig.color} ${
          badge.isEarned ? '' : 'grayscale'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex items-center gap-1">
          {badge.isEarned ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : badge.isVisible ? (
            <Info className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Lock className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Badge Info */}
      <h3 className={`font-semibold text-sm mb-2 ${
        badge.isEarned ? 'group-hover:text-accent' : ''
      } transition-colors`}>
        {badge.name}
      </h3>
      
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {badge.description}
      </p>

      {/* Progress Bar (if not earned) */}
      {!badge.isEarned && badge.progress && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {badge.progress.current}/{badge.progress.target} {badge.progress.unit}
            </span>
          </div>
          <div className="h-1.5 bg-secondary/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r from-accent to-accent/80`}
              initial={{ width: 0 }}
              animate={{ 
                width: `${(badge.progress.current / badge.progress.target) * 100}%` 
              }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Rarity & Category */}
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${rarityConfig.color}`}>
          {badge.rarity}
        </span>
        {badge.earnedAt && (
          <span className="text-xs text-muted-foreground">
            {new Date(badge.earnedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const BadgeDetailModal: React.FC<{
  badge: Badge;
  isOpen: boolean;
  onClose: () => void;
}> = ({ badge, isOpen, onClose }) => {
  const rarityConfig = getRarityConfig(badge.rarity);
  const Icon = badge.icon;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="pica-card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-lg ${rarityConfig.color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1">{badge.name}</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${rarityConfig.color}`}>
              {badge.rarity} • {badge.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4">{badge.description}</p>

        {/* Progress (if applicable) */}
        {!badge.isEarned && badge.progress && (
          <div className="mb-4">
            <h3 className="font-medium text-sm mb-2">Progress</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Current</span>
              <span className="font-medium">
                {badge.progress.current}/{badge.progress.target} {badge.progress.unit}
              </span>
            </div>
            <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-accent/80"
                style={{ 
                  width: `${(badge.progress.current / badge.progress.target) * 100}%` 
                }}
              />
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="mb-4">
          <h3 className="font-medium text-sm mb-2">Requirements</h3>
          <ul className="space-y-1">
            {badge.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  badge.isEarned ? 'text-green-400' : 'text-muted-foreground'
                }`} />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Earned Date */}
        {badge.earnedAt && (
          <div className="text-center text-sm text-muted-foreground">
            Earned on {new Date(badge.earnedAt).toLocaleDateString()}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const ReputationBadges: React.FC<ReputationBadgesProps> = ({
  badges = mockBadges,
  showProgress = true,
  className
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [filter, setFilter] = useState<'all' | 'earned' | 'progress'>('all');

  const filteredBadges = badges.filter(badge => {
    if (!badge.isVisible) return false;
    if (filter === 'earned') return badge.isEarned;
    if (filter === 'progress') return !badge.isEarned && badge.progress;
    return true;
  });

  const earnedCount = badges.filter(b => b.isEarned).length;
  const totalVisible = badges.filter(b => b.isVisible).length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Reputation Badges</h2>
          <p className="text-muted-foreground">
            Achievements and milestones earned through your creator journey
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress indicator */}
          <div className="text-sm text-muted-foreground">
            {earnedCount}/{totalVisible} earned
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="all">All Badges</option>
            <option value="earned">Earned</option>
            <option value="progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-accent">{earnedCount}</div>
          <div className="text-sm text-muted-foreground">Badges Earned</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-yellow-400">
            {badges.filter(b => b.rarity === 'legendary' && b.isEarned).length}
          </div>
          <div className="text-sm text-muted-foreground">Legendary</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-purple-400">
            {badges.filter(b => b.rarity === 'epic' && b.isEarned).length}
          </div>
          <div className="text-sm text-muted-foreground">Epic</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-blue-400">
            {badges.filter(b => !b.isEarned && b.progress).length}
          </div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBadges.map((badge, index) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            index={index}
            onClick={setSelectedBadge}
          />
        ))}
      </div>

      {filteredBadges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-muted-foreground">
            No badges found matching your criteria.
          </div>
        </motion.div>
      )}

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <BadgeDetailModal
            badge={selectedBadge}
            isOpen={!!selectedBadge}
            onClose={() => setSelectedBadge(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};