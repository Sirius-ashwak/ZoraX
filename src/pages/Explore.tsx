import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Target, Heart } from 'lucide-react';
import { CampaignCard } from '../components/CampaignCard';
import { useTotalCampaigns } from '../hooks/useCredVault';

// Mock data for demonstration
const mockCampaigns = [
  {
    id: 1,
    title: "Digital Art Collection: Onchain Memories",
    description: "Creating a unique collection of digital art pieces that capture the essence of Web3 culture and onchain experiences.",
    imageUri: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    goalAmount: "5.0",
    raisedAmount: "3.2",
    supporterCount: 47,
    endTime: Date.now() / 1000 + 86400 * 15, // 15 days from now
    creator: "0x1234...5678",
    isActive: true,
  },
  {
    id: 2,
    title: "Music Album: Sounds of Tomorrow",
    description: "Producing an experimental electronic music album exploring the intersection of AI and human creativity.",
    imageUri: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
    goalAmount: "2.5",
    raisedAmount: "2.8",
    supporterCount: 32,
    endTime: Date.now() / 1000 + 86400 * 5, // 5 days from now
    creator: "0x2345...6789",
    isActive: true,
  },
  {
    id: 3,
    title: "Interactive Web3 Game Development",
    description: "Building an innovative blockchain-based game that rewards players with NFTs and tokens for their achievements.",
    imageUri: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    goalAmount: "10.0",
    raisedAmount: "7.3",
    supporterCount: 89,
    endTime: Date.now() / 1000 + 86400 * 25, // 25 days from now
    creator: "0x3456...7890",
    isActive: true,
  },
  {
    id: 4,
    title: "Educational Content Series",
    description: "Creating comprehensive video tutorials about DeFi, NFTs, and Web3 development for beginners.",
    imageUri: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    goalAmount: "1.5",
    raisedAmount: "1.8",
    supporterCount: 24,
    endTime: Date.now() / 1000 + 86400 * 8, // 8 days from now
    creator: "0x4567...8901",
    isActive: true,
  },
  {
    id: 5,
    title: "Sustainable Tech Innovation",
    description: "Developing eco-friendly blockchain solutions and carbon-neutral smart contracts for environmental protection.",
    imageUri: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
    goalAmount: "7.0",
    raisedAmount: "4.1",
    supporterCount: 63,
    endTime: Date.now() / 1000 + 86400 * 20, // 20 days from now
    creator: "0x5678...9012",
    isActive: true,
  },
  {
    id: 6,
    title: "Community Podcast Production",
    description: "Launching a weekly podcast featuring interviews with Web3 builders, creators, and innovators in the space.",
    imageUri: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
    goalAmount: "3.0",
    raisedAmount: "1.2",
    supporterCount: 18,
    endTime: Date.now() / 1000 + 86400 * 30, // 30 days from now
    creator: "0x6789...0123",
    isActive: true,
  },
];

type SortOption = 'trending' | 'recent' | 'ending-soon' | 'goal-amount';
type FilterOption = 'all' | 'art' | 'music' | 'gaming' | 'education' | 'tech';

export const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);

  const { data: totalCampaigns } = useTotalCampaigns();

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    
    // Simple category filtering based on keywords
    const categoryKeywords = {
      art: ['art', 'digital', 'creative'],
      music: ['music', 'album', 'sound'],
      gaming: ['game', 'gaming', 'interactive'],
      education: ['educational', 'tutorial', 'learning'],
      tech: ['tech', 'blockchain', 'innovation']
    };
    
    const keywords = categoryKeywords[filterBy] || [];
    const matchesCategory = keywords.some(keyword => 
      campaign.title.toLowerCase().includes(keyword) || 
      campaign.description.toLowerCase().includes(keyword)
    );
    
    return matchesSearch && matchesCategory;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.supporterCount - a.supporterCount;
      case 'recent':
        return b.id - a.id;
      case 'ending-soon':
        return a.endTime - b.endTime;
      case 'goal-amount':
        return parseFloat(b.goalAmount) - parseFloat(a.goalAmount);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Campaigns
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Support creators, earn exclusive NFTs, and be part of innovative projects shaping the future.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <div className="text-sm text-gray-600">
                {sortedCampaigns.length} campaigns found
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="trending">Trending</option>
                <option value="recent">Most Recent</option>
                <option value="ending-soon">Ending Soon</option>
                <option value="goal-amount">Goal Amount</option>
              </select>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-wrap gap-2">
                {(['all', 'art', 'music', 'gaming', 'education', 'tech'] as FilterOption[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterBy(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterBy === filter
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sortedCampaigns.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find more campaigns.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaignId={campaign.id}
                isOwner={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Load More */}
      {sortedCampaigns.length > 0 && (
        <div className="text-center pb-16">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
            Load More Campaigns
          </button>
        </div>
      )}
    </div>
  );
};
