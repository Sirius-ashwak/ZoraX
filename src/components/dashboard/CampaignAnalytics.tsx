import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter,
  MoreVertical,
  ExternalLink,
  Copy,
  Eye,
  Users,
  Zap,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'draft' | 'paused';
  createdAt: string;
  endDate: string;
  totalSupply: number;
  minted: number;
  revenue: number;
  views: number;
  uniqueCollectors: number;
  conversionRate: number;
  imageUrl: string;
  description: string;
  tags: string[];
}

// Mock campaign data
const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Cosmic Art Collection',
    status: 'active',
    createdAt: '2024-01-15',
    endDate: '2024-02-15',
    totalSupply: 1000,
    minted: 756,
    revenue: 12.45,
    views: 8923,
    uniqueCollectors: 234,
    conversionRate: 8.5,
    imageUrl: '/api/placeholder/400/300',
    description: 'A mesmerizing collection of cosmic-inspired digital art pieces.',
    tags: ['Art', 'Space', 'Digital']
  },
  {
    id: '2',
    title: 'Space Exploration NFT',
    status: 'completed',
    createdAt: '2023-12-10',
    endDate: '2024-01-10',
    totalSupply: 500,
    minted: 500,
    revenue: 8.73,
    views: 12456,
    uniqueCollectors: 189,
    conversionRate: 15.2,
    imageUrl: '/api/placeholder/400/300',
    description: 'Journey through the cosmos with this exclusive space collection.',
    tags: ['Space', 'Exploration', 'Science']
  },
  {
    id: '3',
    title: 'Digital Cosmos Series',
    status: 'active',
    createdAt: '2024-01-20',
    endDate: '2024-03-20',
    totalSupply: 750,
    minted: 423,
    revenue: 6.21,
    views: 5674,
    uniqueCollectors: 156,
    conversionRate: 7.3,
    imageUrl: '/api/placeholder/400/300',
    description: 'Abstract interpretations of cosmic phenomena.',
    tags: ['Abstract', 'Cosmos', 'Digital']
  },
  {
    id: '4',
    title: 'Stellar Portraits',
    status: 'draft',
    createdAt: '2024-01-25',
    endDate: '2024-04-25',
    totalSupply: 300,
    minted: 0,
    revenue: 0,
    views: 234,
    uniqueCollectors: 0,
    conversionRate: 0,
    imageUrl: '/api/placeholder/400/300',
    description: 'Portrait series inspired by stellar formations.',
    tags: ['Portraits', 'Stars', 'Art']
  }
];

interface CampaignAnalyticsProps {
  className?: string;
}

const StatusBadge: React.FC<{ status: Campaign['status'] }> = ({ status }) => {
  const configs = {
    active: { color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: CheckCircle, label: 'Active' },
    completed: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: CheckCircle, label: 'Completed' },
    draft: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Clock, label: 'Draft' },
    paused: { color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: AlertCircle, label: 'Paused' }
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

const CampaignCard: React.FC<{ campaign: Campaign; index: number }> = ({ campaign, index }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const progressPercent = (campaign.minted / campaign.totalSupply) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="pica-card p-6 hover:border-accent/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-secondary/50 rounded-lg flex items-center justify-center">
            <Zap className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
              {campaign.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {campaign.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {campaign.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-secondary/50 rounded-md text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <StatusBadge status={campaign.status} />
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[150px]"
                >
                  <div className="p-1">
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-secondary/50 rounded-md">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-secondary/50 rounded-md">
                      <ExternalLink className="w-4 h-4" />
                      Open Frame
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-secondary/50 rounded-md">
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{campaign.minted} / {campaign.totalSupply}</span>
        </div>
        <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent/80"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          />
        </div>
        <div className="text-right text-xs text-muted-foreground mt-1">
          {progressPercent.toFixed(1)}% minted
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold">{campaign.revenue.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">ETH Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">{campaign.views.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Views</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">{campaign.uniqueCollectors}</div>
          <div className="text-xs text-muted-foreground">Collectors</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">{campaign.conversionRate.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground">Conversion</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
          <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const CampaignAnalytics: React.FC<CampaignAnalyticsProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Campaign['status']>('all');
  const [sortBy, setSortBy] = useState<'created' | 'revenue' | 'minted' | 'views'>('created');

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.revenue - a.revenue;
        case 'minted':
          return b.minted - a.minted;
        case 'views':
          return b.views - a.views;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header & Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-2">Campaign Analytics</h2>
          <p className="text-muted-foreground">
            Detailed performance metrics for all your NFT campaigns
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-secondary/30 border border-border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="created">Sort by Created</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="minted">Sort by Minted</option>
            <option value="views">Sort by Views</option>
          </select>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="pica-card p-4 text-center">
          <div className="text-2xl font-semibold text-accent">{campaigns.length}</div>
          <div className="text-sm text-muted-foreground">Total Campaigns</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-2xl font-semibold text-green-400">
            {campaigns.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-muted-foreground">Active Campaigns</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-2xl font-semibold text-blue-400">
            {campaigns.reduce((sum, c) => sum + c.revenue, 0).toFixed(2)} ETH
          </div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-2xl font-semibold text-purple-400">
            {campaigns.reduce((sum, c) => sum + c.minted, 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Mints</div>
        </div>
      </motion.div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign, index) => (
          <CampaignCard key={campaign.id} campaign={campaign} index={index} />
        ))}
      </div>

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