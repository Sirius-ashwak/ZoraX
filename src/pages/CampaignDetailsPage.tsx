import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, ExternalLink, Users, Clock, Target, Heart } from 'lucide-react';
import { analytics } from '../services/analytics';
import { seoService } from '../services/seo';
import { LoadingSpinner } from '../components/Loading';
import { WalletStatus } from '../components/WalletStatus';
import { useUser } from '../context/UserContext';

interface CampaignDetailsPageProps {
  params?: { id: string };
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  creatorAddress: string;
  creatorName: string;
  creatorAvatar: string;
  targetAmount: number;
  raisedAmount: number;
  supporterCount: number;
  deadline: string;
  mintPrice: number;
  totalSupply: number;
  remainingSupply: number;
  category: string;
  tags: string[];
  createdAt: string;
}

export const CampaignDetailsPage: React.FC<CampaignDetailsPageProps> = ({ params }) => {
  const urlParams = useParams();
  const campaignId = params?.id || urlParams.id;
  const [, setLocation] = useLocation();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useUser();

  useEffect(() => {
    if (!campaignId) return;

    const loadCampaign = async () => {
      try {
        setLoading(true);
        // Track page view
        analytics.trackPageView();
        
        // Mock campaign data for now - in production this would fetch from API
        const mockCampaign: Campaign = {
          id: campaignId,
          title: "Cosmic Travelers NFT Collection",
          description: "An immersive journey through space and time, featuring unique cosmic travelers exploring distant galaxies. Each NFT represents a different character with their own backstory and special abilities in the Cosmic Travelers universe.",
          imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=80",
          creatorAddress: "0xa1b2c3d4e5f6789012345678901234567890abcd",
          creatorName: "Cosmic Creator",
          creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
          targetAmount: 50,
          raisedAmount: 32.5,
          supporterCount: 247,
          deadline: "2024-12-31",
          mintPrice: 0.08,
          totalSupply: 1000,
          remainingSupply: 753,
          category: "Art",
          tags: ["Space", "SciFi", "PFP", "Utility"],
          createdAt: "2024-01-15"
        };

        setCampaign(mockCampaign);

        // Set SEO meta tags
        seoService.setCampaignMeta(mockCampaign as any);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load campaign');
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [campaignId]);

  const handleMint = async () => {
    if (!campaign) return;
    
    try {
      analytics.track('mint_attempt', { campaignId: campaign.id });
      // In production, this would integrate with wallet and contract
      alert('Minting functionality coming soon!');
    } catch (error) {
      console.error('Mint failed:', error);
    }
  };

  const handleShare = async () => {
    if (!campaign) return;
    
    try {
      await navigator.share({
        title: campaign.title,
        text: campaign.description.slice(0, 100) + '...',
        url: window.location.href,
      });
      analytics.track('campaign_shared', { campaignId: campaign.id });
    } catch (error) {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href);
      analytics.track('campaign_url_copied', { campaignId: campaign.id });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Error Loading Campaign</h1>
        <p className="text-muted-foreground mb-8">{error}</p>
        <button 
          onClick={() => setLocation('/campaigns')}
          className="pica-button"
        >
          Back to Campaigns
        </button>
      </div>
    </div>
  );
  if (!campaign) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Campaign Not Found</h1>
        <p className="text-muted-foreground mb-8">The campaign you're looking for doesn't exist.</p>
        <button 
          onClick={() => setLocation('/campaigns')}
          className="pica-button"
        >
          Back to Campaigns
        </button>
      </div>
    </div>
  );

  const progressPercentage = (campaign.raisedAmount / campaign.targetAmount) * 100;
  const mintedPercentage = ((campaign.totalSupply - campaign.remainingSupply) / campaign.totalSupply) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => setLocation('/campaigns')}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaigns
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Campaign Image and Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-6">
              {/* Campaign Image */}
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={campaign.imageUrl}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                  {campaign.category}
                </span>
                {campaign.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Creator Info */}
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30">
                <img
                  src={campaign.creatorAvatar}
                  alt={campaign.creatorName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-foreground">{campaign.creatorName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {campaign.creatorAddress.slice(0, 6)}...{campaign.creatorAddress.slice(-4)}
                  </p>
                </div>
                <button
                  onClick={() => setLocation(`/profile/${campaign.creatorAddress}`)}
                  className="ml-auto text-accent hover:text-accent/80"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Campaign Info and Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {campaign.title}
                  </h1>
                  <p className="text-muted-foreground">
                    Campaign #{campaign.id}
                  </p>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {campaign.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center text-accent mb-2">
                    <Target className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Funding Progress</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{campaign.raisedAmount} ETH</span>
                      <span>{campaign.targetAmount} ETH</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {progressPercentage.toFixed(1)}% funded
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center text-accent mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Supporters</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {campaign.supporterCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total supporters
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center text-accent mb-2">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Mint Progress</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{campaign.totalSupply - campaign.remainingSupply}</span>
                      <span>{campaign.totalSupply}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${mintedPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {campaign.remainingSupply} remaining
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center text-accent mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Deadline</span>
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Campaign ends
                  </p>
                </div>
              </div>

              {/* Mint Section */}
              <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Mint NFT</h3>
                    <p className="text-sm text-muted-foreground">
                      Support this creator and get an exclusive NFT
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {campaign.mintPrice} ETH
                    </div>
                    <p className="text-xs text-muted-foreground">per NFT</p>
                  </div>
                </div>
                
                {!isConnected ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      Connect your wallet to mint this NFT
                    </p>
                    <WalletStatus showConnectButton={true} />
                  </div>
                ) : (
                  <button
                    onClick={handleMint}
                    className="w-full pica-button"
                    disabled={campaign.remainingSupply === 0}
                  >
                    {campaign.remainingSupply === 0 ? 'Sold Out' : 'Mint NFT'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
