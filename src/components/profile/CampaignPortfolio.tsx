import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ExternalLink, 
  GitBranch, 
  Zap,
  CheckCircle,
  Clock,
  Pause,
  Grid3X3,
  List
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'active' | 'completed' | 'paused' | 'draft';
  earnings: number;
  supporters: number;
  minted: number;
  totalSupply: number;
  createdAt: string;
  endDate?: string;
  tags: string[];
  remixCount: number;
  zoraCoinsMinted: number;
}

interface CampaignPortfolioProps {
  campaigns: Campaign[];
  className?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Cosmic Sounddrop Vol.1',
    description: 'An immersive audio-visual journey through the cosmos featuring ethereal soundscapes and stunning visualizations',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
    status: 'completed',
    earnings: 12.8,
    supporters: 347,
    minted: 1000,
    totalSupply: 1000,
    createdAt: '2024-01-15',
    endDate: '2024-02-15',
    tags: ['Music', 'Audio', 'Space'],
    remixCount: 89,
    zoraCoinsMinted: 3450
  },
  {
    id: '2',
    title: 'Digital Nebula Collection',
    description: 'Abstract interpretations of stellar formations captured through generative art algorithms',
    thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    earnings: 8.7,
    supporters: 234,
    minted: 680,
    totalSupply: 1500,
    createdAt: '2024-02-01',
    endDate: '2024-03-01',
    tags: ['Art', 'Digital', 'Space'],
    remixCount: 56,
    zoraCoinsMinted: 2890
  },
  {
    id: '3',
    title: 'Stellar Portraits Series',
    description: 'Portrait collection inspired by celestial bodies, featuring unique astronomical themes',
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    earnings: 6.4,
    supporters: 156,
    minted: 445,
    totalSupply: 800,
    createdAt: '2024-02-10',
    endDate: '2024-03-10',
    tags: ['Portraits', 'Art', 'Collectibles'],
    remixCount: 31,
    zoraCoinsMinted: 1820
  },
  {
    id: '4',
    title: 'Cosmic Remix Experiment',
    description: 'Community-driven remixable content experiment pushing the boundaries of collaborative art',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80',
    status: 'paused',
    earnings: 4.2,
    supporters: 98,
    minted: 290,
    totalSupply: 1000,
    createdAt: '2024-01-20',
    tags: ['Experimental', 'Community', 'Remix'],
    remixCount: 127,
    zoraCoinsMinted: 1450
  },
  {
    id: '5',
    title: 'Interstellar Gaming Assets',
    description: 'Space-themed 3D models and textures for game developers and creators',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    earnings: 15.6,
    supporters: 412,
    minted: 850,
    totalSupply: 1200,
    createdAt: '2024-01-05',
    endDate: '2024-04-05',
    tags: ['Gaming', '3D', 'Assets', 'Space'],
    remixCount: 73,
    zoraCoinsMinted: 4120
  },
  {
    id: '6',
    title: 'Galactic Photography Series',
    description: 'Stunning astrophotography collection showcasing distant galaxies and star formations',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
    status: 'completed',
    earnings: 22.3,
    supporters: 567,
    minted: 1500,
    totalSupply: 1500,
    createdAt: '2023-12-01',
    endDate: '2024-01-01',
    tags: ['Photography', 'Space', 'Nature'],
    remixCount: 145,
    zoraCoinsMinted: 6780
  },
  {
    id: '7',
    title: 'AI-Generated Cosmic Landscapes',
    description: 'Machine learning-generated alien landscapes and otherworldly environments',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    earnings: 9.8,
    supporters: 289,
    minted: 520,
    totalSupply: 2000,
    createdAt: '2024-02-20',
    endDate: '2024-05-20',
    tags: ['AI', 'Landscapes', 'Digital'],
    remixCount: 62,
    zoraCoinsMinted: 2670
  },
  {
    id: '8',
    title: 'Space Odyssey Animation Pack',
    description: 'Animated sequences perfect for sci-fi projects and space-themed content',
    thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=400&q=80',
    status: 'draft',
    earnings: 0,
    supporters: 0,
    minted: 0,
    totalSupply: 500,
    createdAt: '2024-02-25',
    tags: ['Animation', 'Video', 'Sci-Fi'],
    remixCount: 0,
    zoraCoinsMinted: 0
  }
];

const StatusBadge: React.FC<{ status: Campaign['status'] }> = ({ status }) => {
  const configs = {
    active: { color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: CheckCircle, label: 'Active' },
    completed: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: CheckCircle, label: 'Completed' },
    paused: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Pause, label: 'Paused' },
    draft: { color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: Clock, label: 'Draft' }
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </div>
  );
};

const CampaignCard: React.FC<{ 
  campaign: Campaign; 
  index: number; 
  viewMode: 'grid' | 'list';
  onView: (campaign: Campaign) => void;
  onRemix: (campaign: Campaign) => void;
}> = ({ campaign, index, viewMode, onView, onRemix }) => {
  const progressPercent = (campaign.minted / campaign.totalSupply) * 100;

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="pica-card p-4 hover:border-accent/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="w-16 h-16 bg-secondary/50 rounded-lg flex-shrink-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold truncate group-hover:text-accent transition-colors">
                {campaign.title}
              </h3>
              <StatusBadge status={campaign.status} />
            </div>
            <p className="text-sm text-muted-foreground truncate mb-2">
              {campaign.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{campaign.earnings.toFixed(1)} ETH</span>
              <span>{campaign.supporters} supporters</span>
              <span>{campaign.minted}/{campaign.totalSupply} minted</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView(campaign)}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => onRemix(campaign)}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <GitBranch className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="pica-card overflow-hidden hover:border-accent/30 transition-all duration-300 group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-secondary/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
          <Zap className="w-12 h-12 text-accent" />
        </div>
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <motion.button
            onClick={() => onView(campaign)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <Play className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            onClick={() => onRemix(campaign)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <GitBranch className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={campaign.status} />
        </div>

        {/* Zora coins badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
          {campaign.zoraCoinsMinted} ⚡
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
          {campaign.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {campaign.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {campaign.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-secondary/50 rounded-md text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{campaign.minted}/{campaign.totalSupply}</span>
          </div>
          <div className="h-1.5 bg-secondary/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent/80"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-sm font-semibold">{campaign.earnings.toFixed(1)} ETH</div>
            <div className="text-xs text-muted-foreground">Earnings</div>
          </div>
          <div>
            <div className="text-sm font-semibold">{campaign.supporters}</div>
            <div className="text-xs text-muted-foreground">Supporters</div>
          </div>
          <div>
            <div className="text-sm font-semibold">{campaign.remixCount}</div>
            <div className="text-xs text-muted-foreground">Remixes</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CampaignPortfolio: React.FC<CampaignPortfolioProps> = ({ 
  campaigns = mockCampaigns,
  className 
}) => {
  const [filter, setFilter] = useState<'all' | Campaign['status']>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCampaigns = campaigns.filter(campaign => 
    filter === 'all' || campaign.status === filter
  );

  const handleViewCampaign = (campaign: Campaign) => {
    console.log('View campaign:', campaign.id);
    // In a real app, navigate to campaign details
  };

  const handleRemixCampaign = (campaign: Campaign) => {
    console.log('Remix campaign:', campaign.id);
    // In a real app, open remix interface
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Campaign Portfolio</h2>
          <p className="text-muted-foreground">
            Showcase of all your NFT campaigns and creative projects
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="all">All Campaigns</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>

          {/* View mode toggle */}
          <div className="flex bg-secondary/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-accent">{campaigns.length}</div>
          <div className="text-sm text-muted-foreground">Total Campaigns</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-green-400">
            {campaigns.filter(c => c.status === 'completed').length}
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-blue-400">
            {campaigns.reduce((sum, c) => sum + c.earnings, 0).toFixed(1)} ETH
          </div>
          <div className="text-sm text-muted-foreground">Total Earnings</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-xl font-semibold text-purple-400">
            {campaigns.reduce((sum, c) => sum + c.remixCount, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Remixes</div>
        </div>
      </div>

      {/* Campaigns Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filter}-${viewMode}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredCampaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              index={index}
              viewMode={viewMode}
              onView={handleViewCampaign}
              onRemix={handleRemixCampaign}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredCampaigns.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-muted-foreground">
            No campaigns found matching your criteria.
          </div>
        </motion.div>
      )}
    </div>
  );
};