import React, { useState } from 'react';
import { X, Heart, Star, Crown } from 'lucide-react';
import { useSupportCampaign } from '../hooks/useCredVault';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: number;
  campaignTitle: string;
  onSuccess: () => void;
}

const supportTiers = [
  {
    id: 1,
    name: 'Bronze Supporter',
    amount: '0.01',
    icon: Heart,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    perks: ['Supporter badge', 'Campaign updates', 'Community access'],
  },
  {
    id: 2,
    name: 'Silver Supporter',
    amount: '0.1',
    icon: Star,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    perks: ['All Bronze perks', 'Early access', 'Exclusive content', 'Voting rights'],
  },
  {
    id: 3,
    name: 'Gold Supporter',
    amount: '1.0',
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    perks: ['All Silver perks', 'Direct creator access', 'Special recognition', 'Revenue sharing'],
  },
];

export function SupportModal({ isOpen, onClose, campaignId, campaignTitle, onSuccess }: SupportModalProps) {
  const [selectedTier, setSelectedTier] = useState(supportTiers[0]);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  
  const amount = isCustom ? customAmount : selectedTier.amount;
  const tokenUri = `https://credvault.app/metadata/${campaignId}/${Date.now()}`;
  
  const { write: supportCampaign, isLoading } = useSupportCampaign(campaignId, amount, tokenUri);

  const handleSupport = async () => {
    try {
      await supportCampaign?.();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error supporting campaign:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Support Campaign</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaignTitle}</h3>
            <p className="text-gray-600">
              Choose your support level and mint a Supporter Pass NFT to unlock exclusive perks.
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {supportTiers.map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedTier.id === tier.id && !isCustom;
              
              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    setSelectedTier(tier);
                    setIsCustom(false);
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? `${tier.borderColor} ${tier.bgColor}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${tier.color}`} />
                      <div>
                        <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                        <p className="text-sm text-gray-600">{tier.amount} ETH</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {tier.perks.map((perk, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {/* Custom Amount */}
            <div
              onClick={() => setIsCustom(true)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isCustom
                  ? 'border-purple-200 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Amount</h4>
                    <p className="text-sm text-gray-600">Choose your own support level</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  isCustom ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`}>
                  {isCustom && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
              </div>
              
              {isCustom && (
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter amount in ETH"
                  autoFocus
                />
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Unique Supporter Pass NFT</li>
              <li>• Exclusive access to creator content</li>
              <li>• Voting rights on campaign decisions</li>
              <li>• Recognition in supporter community</li>
              <li>• Potential rewards based on campaign success</li>
            </ul>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSupport}
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : `Support with ${amount} ETH`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}