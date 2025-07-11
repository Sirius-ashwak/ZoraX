import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, Share2, ExternalLink } from 'lucide-react';

import { CreatorIdentityPanel } from '../components/profile/CreatorIdentityPanel';
import { ZoraCreditScore } from '../components/profile/ZoraCreditScore';
import { CampaignPortfolio } from '../components/profile/CampaignPortfolio';
import { SupporterWall } from '../components/profile/SupporterWall';
import { ReputationBadges } from '../components/profile/ReputationBadges';
import { ActivityFeed } from '../components/profile/ActivityFeed';
import { RemixTreeViewer } from '../components/profile/RemixTreeViewer';
import { ProfileEditModal } from '../components/profile/ProfileEditModal';
import { useUser } from '../context/UserContext';

interface ZoraCreditProfileProps {
  address?: string;
}

// Mock profile data
const mockProfileData = {
  ensName: 'cosmic.eth',
  address: '0xa1b2c3d4e5f6789012345678901234567890abcd',
  displayName: 'Cosmic Creator',
  bio: 'Digital artist exploring the intersection of technology and cosmic phenomena. Creating immersive NFT experiences that bridge the gap between art and science.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  coverImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=80',
  reputationScore: 847,
  isVerified: true,
  followers: 1247,
  following: 89,
  socialLinks: {
    farcaster: 'https://warpcast.com/cosmic',
    lens: 'https://hey.xyz/u/cosmic',
    github: 'https://github.com/cosmic-creator',
    mirror: 'https://mirror.xyz/cosmic.eth',
    website: 'https://cosmic-art.xyz'
  }
};

export const ZoraCreditProfile: React.FC<ZoraCreditProfileProps> = ({ 
  address: propAddress 
}) => {
  const [, setLocation] = useLocation();
  const { address: userAddress, isConnected } = useUser();
  const [profileData, setProfileData] = useState(mockProfileData);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'activity' | 'badges' | 'remix'>('overview');
  const [showEditModal, setShowEditModal] = useState(false);

  // Use prop address or extract from URL or use connected address
  const profileAddress = propAddress || userAddress || mockProfileData.address;
  const isOwner = isConnected && userAddress?.toLowerCase() === profileAddress?.toLowerCase();

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      setProfileData(mockProfileData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [profileAddress]);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = (updatedData: any) => {
    setProfileData(prev => ({
      ...prev,
      ...updatedData
    }));
    setShowEditModal(false);
    console.log('Profile updated:', updatedData);
  };

  const handleGoBack = () => {
    setLocation('/dashboard');
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'campaigns' as const, label: 'Campaigns' },
    { id: 'activity' as const, label: 'Activity' },
    { id: 'badges' as const, label: 'Badges' },
    { id: 'remix' as const, label: 'Remix Tree' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-6 animate-pulse">
            <div className="h-64 bg-secondary/30 rounded-lg" />
            <div className="h-48 bg-secondary/30 rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-secondary/30 rounded-lg" />
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-secondary/30 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return <CampaignPortfolio campaigns={[]} />;
      case 'activity':
        return <ActivityFeed activities={[]} />;
      case 'badges':
        return <ReputationBadges badges={[]} />;
      case 'remix':
        return (
          <RemixTreeViewer 
            originalCampaign={{
              id: 'cosmic-sounddrop-1',
              title: 'Cosmic Sounddrop Vol.1',
              creator: profileData.displayName
            }}
          />
        );
      default:
        return (
          <div className="space-y-8">
            {/* ZoraCred Score */}
            <ZoraCreditScore address={profileAddress} />
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <CampaignPortfolio campaigns={[]} />
                <ActivityFeed activities={[]} showAll={false} />
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                <SupporterWall supporters={[]} />
                <ReputationBadges badges={[]} showProgress />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            <div className="flex items-center gap-3">
              <button className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Identity Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CreatorIdentityPanel
            data={profileData}
            isOwner={isOwner}
            onEdit={handleEditProfile}
            className="pica-card overflow-hidden"
          />
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex space-x-1 bg-secondary/30 p-1 rounded-lg"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeProfileTab"
                  className="absolute inset-0 bg-accent rounded-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* Embedable Widget CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pica-card p-6 text-center"
        >
          <h3 className="text-lg font-semibold mb-2">Share Your ZoraCred Profile</h3>
          <p className="text-muted-foreground mb-4">
            Embed your profile widget on other platforms or share your custom domain
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="pica-button">
              Get Embed Code
            </button>
            <button className="px-4 py-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors">
              Custom Domain
            </button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            zoracred.xyz/{profileData.ensName || 'your-name'}
          </div>
        </motion.div>
      </div>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <ProfileEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
          initialData={{
            displayName: profileData.displayName,
            bio: profileData.bio,
            avatar: profileData.avatar,
            coverImage: profileData.coverImage,
            socialLinks: profileData.socialLinks
          }}
        />
      )}
    </div>
  );
};