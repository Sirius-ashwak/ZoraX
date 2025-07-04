import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Plus, TrendingUp, Users, Star, Eye, Settings } from 'lucide-react';
import { ConnectWallet } from '../components/ConnectWallet';
import { CreateCampaignModal } from '../components/CreateCampaignModal';
import { CampaignCard } from '../components/CampaignCard';
import { CreatorProfile } from '../components/CreatorProfile';
import { useCreatorProfile, useCreatorCampaigns, useTotalCampaigns } from '../hooks/useCredVault';

export function Dashboard() {
  const { address, isConnected } = useAccount();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'profile'>('campaigns');
  
  const { data: profile } = useCreatorProfile(address || '');
  const { data: campaignIds } = useCreatorCampaigns(address || '');
  const { data: totalCampaigns } = useTotalCampaigns();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Creator Dashboard</h1>
          <p className="text-gray-600 mb-8">Connect your wallet to access your dashboard</p>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'campaigns'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Campaigns
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Profile
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ConnectWallet />
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'campaigns' ? (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Raised</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {profile ? parseFloat(profile.totalRaised).toFixed(2) : '0.00'} ETH
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Supporters</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {profile?.totalSupporters || 0}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Campaigns</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {profile?.campaignCount || 0}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Reputation</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {profile?.reputationScore || 100}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Campaigns */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Campaigns</h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Create New
                </button>
              </div>
              
              {campaignIds && campaignIds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Campaign cards would be rendered here */}
                  <div className="text-center py-12 text-gray-500">
                    Campaign cards will be displayed here
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
                  <p className="text-gray-600 mb-4">
                    Create your first campaign to start building your onchain reputation
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Create Campaign
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Profile Tab */
          <div className="max-w-4xl mx-auto">
            {profile && address ? (
              <CreatorProfile
                address={address}
                profile={profile}
                campaigns={[]}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Not Found</h3>
                <p className="text-gray-600 mb-4">
                  Create your first campaign to generate your ZoraCred profile
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Campaign
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          // Refresh data
          window.location.reload();
        }}
      />
    </div>
  );
}