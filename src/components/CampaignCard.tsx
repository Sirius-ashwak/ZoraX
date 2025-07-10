import React, { useEffect, useState } from 'react';
import { Users, Clock, TrendingUp, Eye, Heart } from 'lucide-react';
import { useCampaign } from '../hooks/useCredVault';
import { SupportModal } from './SupportModal';
import { ShareOnFarcaster } from './ShareOnFarcaster';
import { UniswapBadge } from './UniswapBadge';
import { getTotalSupply, getMintedAddresses, listenToMints } from '../services/zoraContractService';

interface CampaignCardProps {
  campaignId: number;
  isOwner?: boolean;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaignId, isOwner = false }) => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const { data: campaign, isLoading, error } = useCampaign(campaignId);
  const [supply, setSupply] = useState<number | null>(null);
  const [minters, setMinters] = useState<string[]>([]);
  const [lastMint, setLastMint] = useState<{ from: string; to: string; tokenId: string } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const total = await getTotalSupply();
      setSupply(Number(total));
      const addresses = await getMintedAddresses();
      setMinters(addresses);
    }
    fetchStats();
  }, []);

  useEffect(() => {
    function handleMint({ from, to, tokenId }: any) {
      setLastMint({ from, to, tokenId: tokenId.toString() });
      setSupply((prev) => (prev !== null ? prev + 1 : null));
      setMinters((prev) => [...prev, to]);
    }
    listenToMints(handleMint);
    // Cleanup: remove listener if needed
    // return () => contract.off('Transfer', handleMint);
  }, []);

  // Mock data for campaigns that don't exist on-chain yet
  const mockCampaigns = {
    1: {
      title: "Digital Art Collection: Onchain Memories",
      description: "Creating a unique collection of digital art pieces that capture the essence of Web3 culture.",
      imageUri: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      goalAmount: "5.0",
      raisedAmount: "3.2",
      supporterCount: 47,
      endTime: Date.now() / 1000 + 86400 * 15,
      creator: "0x1234...5678",
      isActive: true,
    },
    2: {
      title: "Music Album: Sounds of Tomorrow",
      description: "Producing an experimental electronic music album exploring AI and human creativity.",
      imageUri: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      goalAmount: "2.5",
      raisedAmount: "2.8",
      supporterCount: 32,
      endTime: Date.now() / 1000 + 86400 * 5,
      creator: "0x2345...6789",
      isActive: true,
    },
    3: {
      title: "Interactive Web3 Game Development",
      description: "Building an innovative blockchain-based game with NFT rewards.",
      imageUri: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
      goalAmount: "10.0",
      raisedAmount: "7.3",
      supporterCount: 89,
      endTime: Date.now() / 1000 + 86400 * 25,
      creator: "0x3456...7890",
      isActive: true,
    },
  };

  // Use mock data if campaign doesn't exist on-chain
  const mockData = mockCampaigns[campaignId as keyof typeof mockCampaigns];
  
  if (isLoading) {
    return (
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse"
        data-testid="campaign-loading"
      >
        <div className="aspect-video bg-gray-200"></div>
        <div className="p-6">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || (!campaign && !mockData)) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 text-center">
          <p className="text-gray-500">Campaign not found</p>
        </div>
      </div>
    );
  }

  // Extract data with proper type handling
  const title = campaign ? campaign[0] : mockData?.title || 'Unknown Campaign';
  const description = campaign ? campaign[1] : mockData?.description || 'No description available';
  const imageUri = campaign ? campaign[2] : mockData?.imageUri || '';
  const goalAmount = campaign ? `${Number(campaign[3]) / 1e18}` : mockData?.goalAmount || '0';
  const raisedAmount = campaign ? `${Number(campaign[4]) / 1e18}` : mockData?.raisedAmount || '0';
  const deadline = campaign ? Number(campaign[5]) : mockData?.endTime || Date.now() / 1000;
  const isActive = campaign ? campaign[7] : mockData?.isActive || false;
  const supporterCount = mockData?.supporterCount || 0;

  const progress = (parseFloat(raisedAmount) / parseFloat(goalAmount)) * 100;
  const timeLeft = Math.max(0, deadline - Date.now() / 1000);
  const daysLeft = Math.floor(timeLeft / (24 * 60 * 60));

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group"
        data-testid="campaign-card"
      >
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
          {imageUri ? (
            <img 
              src={imageUri} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <TrendingUp className="w-12 h-12 text-blue-400" />
            </div>
          )}
          
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {isActive ? 'Active' : 'Completed'}
            </span>
          </div>

          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-2">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-white text-sm font-medium">
                  {Math.round(progress)}% funded
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Creator Info */}
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${campaign ? campaign[6] : mockData?.creator}`}
              alt="Creator"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Creator
              </p>
              <p className="text-xs text-gray-500 truncate">
                {campaign ? `${campaign[6].slice(0, 6)}...${campaign[6].slice(-4)}` : mockData?.creator}
              </p>
            </div>
            <button 
              onClick={() => {
                // Navigate to creator profile - for now just log
                console.log('View profile:', campaign ? campaign[6] : mockData?.creator);
              }}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              View Profile
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{raisedAmount} ETH raised</span>
              <span>{goalAmount} ETH goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{supporterCount} supporters</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>
                {daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}
              </span>
            </div>
          </div>

          {/* Compatibility Badge */}
          <div className="mb-4">
            <UniswapBadge variant="campaign" />
          </div>

          {/* Mint Stats */}
          <div className="mt-4 p-3 bg-bg-primary rounded-lg">
            <div className="font-bold text-accent mb-1">Mint Stats</div>
            <div>Total Supply: {supply !== null ? supply : 'Loading...'}</div>
            <div>Unique Minters: {minters.length}</div>
            {lastMint && (
              <div className="mt-1 text-xs text-accent">
                Last Mint: Token #{lastMint.tokenId} to {lastMint.to}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {!isOwner && isActive && (
              <button
                onClick={() => setShowSupportModal(true)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>Support</span>
              </button>
            )}
            
            <button
              onClick={() => {
                // Handle view details
                console.log('View details for campaign', campaignId);
              }}
              className={`${
                isOwner || !isActive 
                  ? 'flex-1' 
                  : 'px-4'
              } bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2`}
            >
              <Eye className="w-4 h-4" />
              <span>View</span>
            </button>
          </div>

          {/* Share on Farcaster */}
          <div className="mt-3">
            <ShareOnFarcaster
              campaignId={campaignId.toString()}
              campaignTitle={title}
              creatorName={campaign ? `${campaign[6].slice(0, 6)}...${campaign[6].slice(-4)}` : mockData?.creator || 'Anonymous'}
              variant="compact"
            />
          </div>
        </div>
      </div>

      {/* Support Modal */}
      {showSupportModal && (
        <SupportModal
          isOpen={showSupportModal}
          onClose={() => setShowSupportModal(false)}
          campaignId={campaignId}
          campaignTitle={title}
        />
      )}
    </>
  );
};
