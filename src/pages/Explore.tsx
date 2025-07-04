import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Target } from 'lucide-react';
import { CampaignCard } from '../components/CampaignCard';
import { SupportModal } from '../components/SupportModal';
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
    raisedAmount: "1.6",
    supporterCount: 23,
    endTime: Date.now() / 1000 - 86400 * 2, // Completed 2 days ago
    creator: "0x4567...8901",
    isActive: false,
  },
];

export function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'ending'>('trending');
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const { data: totalCampaigns } = useTotalCampaigns();

  const filteredCampaigns = mockCampaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'active' && campaign.isActive) ||
                           (filterBy === 'completed' && !campaign.isActive);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return (parseFloat(b.raisedAmount) / parseFloat(b.goalAmount)) - 
                 (parseFloat(a.raisedAmount) / parseFloat(a.goalAmount));
        case 'newest':
          return b.id - a.id;
        case 'ending':
          return a.endTime - b.endTime;
        default:
          return 0;
      }
    });

  const handleSupport = (campaignId: number) => {
    setSelectedCampaign(campaignId);
    setShowSupportModal(true);
  };

  const handleViewDetails = (campaignId: number) => {
    // Navigate to campaign details page
    console.log('View details for campaign:', campaignId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Campaigns</h1>
            <p className="text-gray-600">
              Discover and support amazing creators building the future onchain
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Campaigns</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="ending">Ending Soon</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {totalCampaigns?.toString() || '4'}
            </div>
            <div className="text-sm text-gray-500">Total Campaigns</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15.9</div>
            <div className="text-sm text-gray-500">ETH Raised</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-500">Active Campaigns</div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onSupport={handleSupport}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>

      {/* Support Modal */}
      {selectedCampaign && (
        <SupportModal
          isOpen={showSupportModal}
          onClose={() => {
            setShowSupportModal(false);
            setSelectedCampaign(null);
          }}
          campaignId={selectedCampaign}
          campaignTitle={mockCampaigns.find(c => c.id === selectedCampaign)?.title || ''}
          onSuccess={() => {
            // Refresh data or show success message
            console.log('Support successful!');
          }}
        />
      )}
    </div>
  );
}