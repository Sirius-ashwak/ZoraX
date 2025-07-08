import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Plus, Wallet, TrendingUp, Users, Calendar, Share2 } from 'lucide-react';
import { useCampaigns } from '../hooks/useCampaigns';
import { Campaign } from '../services/campaignService';
import { FrameManagement } from './FrameManagement';

interface CreatorDashboardProps {
  onCreateCampaign: () => void;
}

const EmptyState: React.FC<{ onCreateCampaign: () => void }> = ({ onCreateCampaign }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
      <Plus className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-2">No campaigns yet</h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Start your creator journey by launching your first NFT campaign. Build your community and monetize your passion.
    </p>
    <button
      onClick={onCreateCampaign}
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
    >
      Create Your First Campaign
    </button>
  </motion.div>
);

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
  >
    <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-500 relative overflow-hidden">
      {campaign.imageIPFSHash ? (
        <img
          src={`/api/uploads/${campaign.imageIPFSHash}`}
          alt={campaign.nftName}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white text-lg font-medium opacity-75">
            {campaign.nftName}
          </span>
        </div>
      )}
      <div className="absolute top-3 right-3">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          campaign.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : campaign.status === 'deploying'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.nftName}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            0 {/* TODO: Get actual mint count from contract */}
          </div>
          <div className="text-sm text-gray-500">Mints</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {campaign.supply}
          </div>
          <div className="text-sm text-gray-500">Supply</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {campaign.priceETH}Ξ
          </div>
          <div className="text-sm text-gray-500">Price</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {new Date(campaign.createdAt).toLocaleDateString()}
        </span>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View Details
        </button>
      </div>
    </div>
  </motion.div>
);

const StatsCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}> = ({ title, value, icon, change, changeType = 'neutral' }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm ${
            changeType === 'positive' ? 'text-green-600' : 
            changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change}
          </p>
        )}
      </div>
      <div className="text-gray-400">
        {icon}
      </div>
    </div>
  </div>
);

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ onCreateCampaign }) => {
  const { isConnected, address } = useAccount();
  const { campaigns, loading, error } = useCampaigns();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'frames'>('campaigns');

  const stats = {
    totalCampaigns: campaigns.length,
    totalVolume: 0, // TODO: Calculate from contract data
    totalSupporters: 0, // TODO: Calculate from contract data
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
  };

  const tabs = [
    { id: 'campaigns', label: 'Campaigns', icon: Calendar },
    { id: 'frames', label: 'Farcaster Frames', icon: Share2 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading campaigns: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Creator Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! Manage your campaigns and track your success.
              </p>
              {address && (
                <div className="flex items-center space-x-2 mt-2">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500 font-mono">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={onCreateCampaign}
              className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Campaign</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatsCard
            title="Total Campaigns"
            value={stats.totalCampaigns.toString()}
            icon={<Calendar className="w-8 h-8" />}
          />
          <StatsCard
            title="Total Volume"
            value={`${stats.totalVolume.toFixed(2)}Ξ`}
            icon={<TrendingUp className="w-8 h-8" />}
          />
          <StatsCard
            title="Total Supporters"
            value={stats.totalSupporters.toString()}
            icon={<Users className="w-8 h-8" />}
          />
          <StatsCard
            title="Active Campaigns"
            value={stats.activeCampaigns.toString()}
            icon={<Plus className="w-8 h-8" />}
          />
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'campaigns' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Campaigns</h2>
              {campaigns.length > 0 && (
                <button
                  onClick={onCreateCampaign}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Create New
                </button>
              )}
            </div>

            {campaigns.length === 0 ? (
              <EmptyState onCreateCampaign={onCreateCampaign} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'frames' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FrameManagement 
              campaigns={campaigns.map(c => ({
                id: c.id.toString(),
                title: c.nftName,
                description: c.description,
                imageUri: c.imageIPFSHash ? `/api/uploads/${c.imageIPFSHash}` : '',
                creator: c.creator || 'Unknown Creator',
                price: c.priceETH,
                totalSupply: c.supply,
                minted: 0 // TODO: Get actual minted count
              }))}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};
