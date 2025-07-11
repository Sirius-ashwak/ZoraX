import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Plus, Search, Grid, List, Star, Users, TrendingUp } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { analytics } from '../services/analytics';
import { seoService } from '../services/seo';

// Set SEO meta for campaigns page
seoService.updateMeta({
  title: 'Browse NFT Campaigns | ZoraX',
  description: 'Discover amazing creator projects and support innovative NFT campaigns on ZoraX. Find your next favorite creator today.',
  keywords: ['NFT Campaigns', 'Creator Projects', 'Support Creators', 'Web3', 'Digital Art']
});

// Enhanced mock campaign data with realistic values
const mockCampaigns = [
  {
    id: 1,
    title: 'Cosmic Soundscape NFT Collection',
    description: 'A unique audio-visual experience combining ambient music with cosmic visuals, featuring 10 tracks and interactive elements',
    creator: 'cosmic.eth',
    creatorAddress: '0xa1b2c3d4e5f6789012345678901234567890abcd',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
    price: '0.05 ETH',
    totalSupply: 1000,
    minted: 856,
    supporters: 423,
    status: 'active',
    category: 'Music',
    createdAt: '2025-01-05',
    fundingGoal: '50 ETH',
    currentFunding: '42.8 ETH',
    progress: 85.6,
    featured: true
  },
  {
    id: 2,
    title: 'Digital Nomad Photography Series',
    description: 'Capturing remote work culture around the world through stunning photography across 25 countries and 100+ locations',
    creator: 'wanderer.eth',
    creatorAddress: '0xb2c3d4e5f6789012345678901234567890abcdef',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
    price: '0.08 ETH',
    totalSupply: 500,
    minted: 387,
    supporters: 298,
    status: 'active',
    category: 'Photography',
    createdAt: '2025-01-03',
    fundingGoal: '40 ETH',
    currentFunding: '30.96 ETH',
    progress: 77.4,
    featured: false
  },
  {
    id: 3,
    title: 'AI-Generated Art Experiments',
    description: 'Exploring the intersection of artificial intelligence and creative expression through 50 unique AI-generated masterpieces',
    creator: 'ai-artist.eth',
    creatorAddress: '0xc3d4e5f6789012345678901234567890abcdef12',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80',
    price: '0.15 ETH',
    totalSupply: 750,
    minted: 673,
    supporters: 445,
    status: 'active',
    category: 'Digital Art',
    createdAt: '2025-01-01',
    fundingGoal: '112.5 ETH',
    currentFunding: '100.95 ETH',
    progress: 89.7,
    featured: true
  },
  {
    id: 4,
    title: 'Sustainable Living Documentary',
    description: 'Educational documentary series about eco-friendly lifestyle choices featuring 12 episodes and sustainability experts',
    creator: 'green-living.eth',
    creatorAddress: '0xd4e5f6789012345678901234567890abcdef1234',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
    price: '0.03 ETH',
    totalSupply: 2000,
    minted: 1456,
    supporters: 678,
    status: 'active',
    category: 'Education',
    createdAt: '2024-12-28',
    fundingGoal: '60 ETH',
    currentFunding: '43.68 ETH',
    progress: 72.8,
    featured: false
  },
  {
    id: 5,
    title: 'Interstellar Gaming Universe',
    description: 'Complete game asset collection featuring spaceships, planets, and characters for indie game developers',
    creator: 'game-dev.eth',
    creatorAddress: '0xe5f6789012345678901234567890abcdef123456',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80',
    price: '0.12 ETH',
    totalSupply: 300,
    minted: 267,
    supporters: 189,
    status: 'active',
    category: 'Gaming',
    createdAt: '2024-12-20',
    fundingGoal: '36 ETH',
    currentFunding: '32.04 ETH',
    progress: 89.0,
    featured: true
  },
  {
    id: 6,
    title: 'Virtual Reality Art Gallery',
    description: 'Immersive VR experience showcasing digital art from emerging creators in a virtual space environment',
    creator: 'vr-curator.eth',
    creatorAddress: '0xf6789012345678901234567890abcdef1234567',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80',
    price: '0.20 ETH',
    totalSupply: 150,
    minted: 142,
    supporters: 98,
    status: 'active',
    category: 'VR/AR',
    createdAt: '2024-12-15',
    fundingGoal: '30 ETH',
    currentFunding: '28.4 ETH',
    progress: 94.7,
    featured: false
  },
  {
    id: 7,
    title: 'Educational Space Documentary',
    description: 'Comprehensive documentary series about space exploration featuring interviews with astronauts and scientists',
    creator: 'space-edu.eth',
    creatorAddress: '0xg789012345678901234567890abcdef12345678',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=400&q=80',
    price: '0.05 ETH',
    totalSupply: 1200,
    minted: 1200,
    supporters: 456,
    status: 'completed',
    category: 'Education',
    createdAt: '2024-12-10',
    fundingGoal: '60 ETH',
    currentFunding: '60 ETH',
    progress: 100.0,
    featured: true
  }
];

const categories = ['All', 'Music', 'Photography', 'Digital Art', 'Education', 'Gaming', 'Literature'];
const sortOptions = ['Latest', 'Popular', 'Trending', 'Ending Soon', 'Most Funded'];

export const CampaignsPage: React.FC = () => {
  const { isConnected } = useUser();
  const [campaigns] = useState(mockCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState(mockCampaigns);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('CampaignsPage: Initial campaigns loaded:', campaigns.length);
    console.log('CampaignsPage: Mock campaigns data:', mockCampaigns);
    
    let filtered = campaigns;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(campaign => campaign.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.creator.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort campaigns
    switch (sortBy) {
      case 'Popular':
        filtered.sort((a, b) => b.supporters - a.supporters);
        break;
      case 'Trending':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'Most Funded':
        filtered.sort((a, b) => parseFloat(b.currentFunding) - parseFloat(a.currentFunding));
        break;
      case 'Latest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    console.log('CampaignsPage: Filtered campaigns:', filtered.length);
    setFilteredCampaigns(filtered);
  }, [campaigns, selectedCategory, sortBy, searchQuery]);

  const CampaignCard: React.FC<{ campaign: typeof mockCampaigns[0] }> = ({ campaign }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {campaign.featured && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-sm font-medium">
          <Star className="inline w-4 h-4 mr-1" />
          Featured
        </div>
      )}
      
      <div className="relative">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://picsum.photos/400/300?random=${campaign.id}`;
          }}
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {campaign.status === 'active' ? 'Active' : campaign.status === 'completed' ? 'Completed' : 'Draft'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{campaign.category}</span>
          <span className="text-sm font-medium text-foreground">{campaign.price}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {campaign.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {campaign.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{campaign.progress.toFixed(1)}%</span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(campaign.progress, 100)}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              {campaign.supporters} supporters
            </div>
            <div className="text-muted-foreground">
              {campaign.minted}/{campaign.totalSupply} minted
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <Link 
            href={`/profile/${campaign.creatorAddress}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            by {campaign.creator}
          </Link>
          
          <Link 
            href={`/campaign/${campaign.id}`}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );

  const CampaignListItem: React.FC<{ campaign: typeof mockCampaigns[0] }> = ({ campaign }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex gap-6">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://picsum.photos/400/300?random=${campaign.id}`;
          }}
        />
        
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold text-foreground">{campaign.title}</h3>
                {campaign.featured && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{campaign.description}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">{campaign.price}</div>
              <div className="text-sm text-muted-foreground">{campaign.category}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Progress</div>
              <div className="font-medium">{campaign.progress.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Supporters</div>
              <div className="font-medium">{campaign.supporters}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Minted</div>
              <div className="font-medium">{campaign.minted}/{campaign.totalSupply}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Funding</div>
              <div className="font-medium">{campaign.currentFunding}</div>
            </div>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              style={{ width: `${Math.min(campaign.progress, 100)}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Link 
              href={`/profile/${campaign.creatorAddress}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              by {campaign.creator}
            </Link>
            
            <Link 
              href={`/campaign/${campaign.id}`}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              View Campaign
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">All Campaigns</h1>
            <p className="text-muted-foreground">
              Discover amazing creator projects and support innovative ideas
            </p>
          </div>
          
          {isConnected && (
            <Link 
              href="/create-campaign"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Campaign
            </Link>
          )}
        </div>

        {/* Filters and Search */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 2) {
                    analytics.track('campaign_search', { 
                      query: e.target.value,
                      category: selectedCategory 
                    });
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                analytics.track('campaign_filter', { 
                  filter: 'category',
                  value: e.target.value 
                });
              }}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Showing {filteredCampaigns.length} campaigns</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>{campaigns.filter(c => c.status === 'active').length} active campaigns</span>
            </div>
          </div>
        </div>

        {/* Campaigns Grid/List */}
        {filteredCampaigns.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }>
            {filteredCampaigns.map((campaign) => 
              viewMode === 'grid' ? (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ) : (
                <CampaignListItem key={campaign.id} campaign={campaign} />
              )
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or explore different categories
            </p>
            <Link 
              href="/campaigns"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              View All Campaigns
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};