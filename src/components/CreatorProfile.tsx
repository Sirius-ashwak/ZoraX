import React, { useState } from 'react';
import { Star, TrendingUp, Users, Award, Calendar, MapPin, Globe, Edit, Share2, Copy, Zap, Check, X } from 'lucide-react';
import { useCreatorProfile as useCredVaultProfile } from '../hooks/useCredVault';
import { useCreatorProfile } from '../hooks/useZoraCred';
import { AURA_CONFIGS, getAuraStyles, AuraLevel } from '../types/zoracred';
import { motion } from 'framer-motion';
import { UniswapIntegrationSection } from './UniswapIntegrationSection';
import { UniswapBadge } from './UniswapBadge';

interface CreatorProfileProps {
  address: string;
}

export const CreatorProfile: React.FC<CreatorProfileProps> = ({ address }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Use both hooks for complete profile data
  const { data: credVaultProfile, isLoading: credVaultLoading } = useCredVaultProfile(address);
  const { data: zoraCredProfile, isLoading: zoraCredLoading } = useCreatorProfile(address as `0x${string}`);
  
  const isLoading = credVaultLoading || zoraCredLoading;

  // Enhanced profile data combining both sources
  const profile = React.useMemo(() => {
    if (zoraCredProfile) {
      return {
        ...zoraCredProfile,
        // Override with CredVault data if available
        name: credVaultProfile?.[0] || zoraCredProfile.name || 'Anonymous Creator',
        bio: credVaultProfile?.[1] || zoraCredProfile.bio || 'Building the future of Web3 and creating amazing experiences for the community.',
        avatar: credVaultProfile?.[2] || zoraCredProfile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
        credVaultData: credVaultProfile ? {
          totalRaised: (Number(credVaultProfile[3]) / 1e18).toString(),
          campaignCount: Number(credVaultProfile[4]),
          reputationScore: 100, // Default since not in blockchain data
        } : null,
      };
    }
    
    // Fallback to mock data if no ZoraCred profile yet
    return {
      address,
      name: credVaultProfile?.[0] || 'Anonymous Creator',
      bio: credVaultProfile?.[1] || 'Building the future of Web3 and creating amazing experiences for the community.',
      avatar: credVaultProfile?.[2] || `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
      auraLevel: AuraLevel.SPARK,
      metrics: {
        totalContracts: 0,
        totalMints: 0,
        totalVolume: { eth: '0', usd: '0' },
        uniqueSupporters: 0,
        averageMintPrice: '0',
        firstCampaignDate: new Date(),
        successfulCampaigns: 0,
        activeContracts: 0,
      },
      campaigns: [],
      joinedAt: new Date(Date.now() - 86400 * 30 * 1000), // 30 days ago
      lastActivityAt: new Date(),
      credVaultData: credVaultProfile ? {
        totalRaised: (Number(credVaultProfile[3]) / 1e18).toString(),
        campaignCount: Number(credVaultProfile[4]),
        reputationScore: 100, // Default since not in blockchain data
      } : null,
    };
  }, [credVaultProfile, zoraCredProfile, address]);

  const auraConfig = AURA_CONFIGS[profile.auraLevel];
  const auraStyles = getAuraStyles(profile.auraLevel);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name}'s ZoraCred Profile`,
          text: `Check out ${profile.name}'s creator profile on CredVault`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
        <div className="bg-gray-200 h-32"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const joinDate = new Date(profile.joinedAt).toLocaleDateString();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        style={profile.auraLevel !== AuraLevel.SPARK ? auraStyles : {}}
      >
        {/* Header with Aura Effect */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-6 py-8 text-white relative overflow-hidden">
          {/* Aura Animation */}
          {profile.auraLevel !== AuraLevel.SPARK && (
            <div 
              className="absolute inset-0 opacity-20 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${auraConfig.glowColor} 0%, transparent 70%)`,
              }}
            />
          )}
          
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center p-1"
                  style={profile.auraLevel !== AuraLevel.SPARK ? {
                    boxShadow: `0 0 20px ${auraConfig.glowColor}`,
                  } : {}}
                >
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <UniswapBadge variant="profile" />
                  </div>
                  <p className="text-purple-100 mb-2">{profile.bio}</p>
                  <div className="flex items-center space-x-4 text-sm text-purple-100">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Aura Level Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
            >
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: auraConfig.color }}
              />
              <Star className="w-5 h-5" style={{ color: auraConfig.color }} />
              <span className="font-semibold text-white">{auraConfig.name} Aura</span>
              <span className="text-sm text-purple-100">
                ({profile.metrics.uniqueSupporters} supporters)
              </span>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {profile.credVaultData?.totalRaised || profile.metrics.totalVolume.eth} ETH
              </p>
              <p className="text-sm text-gray-600">Total Volume</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{profile.metrics.uniqueSupporters}</p>
              <p className="text-sm text-gray-600">Supporters</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {profile.credVaultData?.campaignCount || profile.metrics.totalContracts}
              </p>
              <p className="text-sm text-gray-600">Campaigns</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{profile.metrics.totalMints}</p>
              <p className="text-sm text-gray-600">Total Mints</p>
            </motion.div>
          </div>

          {/* ZoraCred Aura Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden rounded-lg mb-8"
            style={{
              background: `linear-gradient(135deg, ${auraConfig.color}20 0%, ${auraConfig.color}10 100%)`,
              border: `1px solid ${auraConfig.color}30`,
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">ZoraCred Aura</h3>
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${auraConfig.color}20`,
                    color: auraConfig.color,
                  }}
                >
                  {auraConfig.name} Level
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{auraConfig.description}</p>
              
              {/* Aura Progress */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Supporters: {profile.metrics.uniqueSupporters}</span>
                  <span>Next level: {AURA_CONFIGS[Object.values(AuraLevel)[Math.min(Object.values(AuraLevel).indexOf(profile.auraLevel) + 1, Object.values(AuraLevel).length - 1)]].minSupporters}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((profile.metrics.uniqueSupporters / auraConfig.minSupporters) * 100, 100)}%`,
                      backgroundColor: auraConfig.color,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Uniswap Integration Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <UniswapIntegrationSection 
              contractAddress={address}
              showPreview={true}
            />
          </motion.div>

          {/* Campaigns Grid */}
          {profile.campaigns.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.campaigns.slice(0, 6).map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                      <img 
                        src={campaign.imageUrl} 
                        alt={campaign.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1 truncate">{campaign.name}</h4>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{campaign.totalMints} mints</span>
                      <span>{campaign.priceETH} ETH</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Social Links & Integrations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.farcaster && (
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium">Farcaster</span>
                  </div>
                  <span className="text-sm text-blue-600">{profile.farcaster}</span>
                </div>
              )}
              
              {profile.twitter && (
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Twitter</span>
                  </div>
                  <span className="text-sm text-blue-600">{profile.twitter}</span>
                </div>
              )}
              
              {profile.website && (
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Website</span>
                  </div>
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Visit →
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-3"
          >
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
              Update Profile
            </button>
            <button 
              onClick={handleShare}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button 
              onClick={handleCopyLink}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors flex items-center space-x-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowShareModal(false)}></div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Share Profile</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                  <span className="text-gray-900">{copied ? 'Copied to clipboard!' : 'Copy profile link'}</span>
                </button>
                
                <a
                  href={`https://twitter.com/intent/tweet?text=Check out ${profile.name}'s ZoraCred profile on CredVault&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Share on Twitter</span>
                </a>
                
                <a
                  href={`https://warpcast.com/~/compose?text=Check out ${profile.name}'s ZoraCred profile on CredVault ${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-900">Share on Farcaster</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};
