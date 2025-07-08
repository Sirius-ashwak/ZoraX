import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Share2, Eye, Settings, TrendingUp } from 'lucide-react';
import { FramePreview } from './FramePreview';
import { FrameAnalytics } from './FrameAnalytics';
import { ShareOnFarcaster } from './ShareOnFarcaster';
import { CopyFrameUrl } from './CopyFrameUrl';

interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  creator: string;
  price: string;
  totalSupply?: number;
  minted?: number;
}

interface FrameManagementProps {
  campaigns?: Campaign[];
}

export const FrameManagement: React.FC<FrameManagementProps> = ({ campaigns = [] }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'preview' | 'analytics' | 'share'>('overview');
  const [frameUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (campaigns.length > 0 && !selectedCampaign) {
      setSelectedCampaign(campaigns[0]);
    }
  }, [campaigns, selectedCampaign]);

  const mockCampaigns: Campaign[] = campaigns.length > 0 ? campaigns : [
    {
      id: '1',
      title: 'Digital Art Collection: Onchain Memories',
      description: 'Creating a unique collection of digital art pieces that capture the essence of Web3 culture.',
      imageUri: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800',
      creator: 'ArtistDAO',
      price: '0.01',
      totalSupply: 1000,
      minted: 150
    },
    {
      id: '2',
      title: 'Music Album: Sounds of Tomorrow',
      description: 'Producing an experimental electronic music album exploring AI and human creativity.',
      imageUri: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
      creator: 'MusicMaker',
      price: '0.05',
      totalSupply: 500,
      minted: 280
    }
  ];

  const displayCampaigns = campaigns.length > 0 ? campaigns : mockCampaigns;
  const currentCampaign = selectedCampaign || displayCampaigns[0];

  if (!currentCampaign) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center">
          <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Campaigns Found</h3>
          <p className="text-gray-600">Create your first campaign to start sharing Farcaster Frames</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'preview', label: 'Frame Preview', icon: Eye },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'share', label: 'Share Frame', icon: Share2 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Farcaster Frame Management</h2>
            <p className="text-gray-600 mt-1">Create and manage interactive Frames for your campaigns</p>
          </div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Campaign Selector */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Select Campaign:</label>
          <select
            value={currentCampaign.id}
            onChange={(e) => {
              const campaign = displayCampaigns.find(c => c.id === e.target.value);
              setSelectedCampaign(campaign || null);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {displayCampaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
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

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Frame Views</p>
                      <p className="text-3xl font-bold text-gray-900">1,248</p>
                      <p className="text-sm text-green-600">+12% this week</p>
                    </div>
                    <Eye className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Mints from Frames</p>
                      <p className="text-3xl font-bold text-gray-900">23</p>
                      <p className="text-sm text-green-600">+5 today</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-3xl font-bold text-gray-900">1.8%</p>
                      <p className="text-sm text-green-600">Above average</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ShareOnFarcaster
                    campaignId={currentCampaign.id}
                    campaignTitle={currentCampaign.title}
                    creatorName={currentCampaign.creator}
                    variant="button"
                  />
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Preview Frame</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'preview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FramePreview
                campaignId={currentCampaign.id}
                campaignTitle={currentCampaign.title}
                campaignImage={currentCampaign.imageUri}
                creatorName={currentCampaign.creator}
                mintPrice={currentCampaign.price}
                totalSupply={currentCampaign.totalSupply}
              />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FrameAnalytics campaignId={currentCampaign.id} />
            </motion.div>
          )}

          {activeTab === 'share' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <ShareOnFarcaster
                campaignId={currentCampaign.id}
                campaignTitle={currentCampaign.title}
                creatorName={currentCampaign.creator}
                variant="button"
              />
              
              {frameUrls[currentCampaign.id] && (
                <CopyFrameUrl
                  frameUrl={frameUrls[currentCampaign.id]}
                  campaignTitle={currentCampaign.title}
                />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
