import React, { useState } from 'react';
import { X, Heart, Star, Crown, Gift, AlertCircle } from 'lucide-react';
import { useSupportCampaign } from '../hooks/useCredVault';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: number;
  campaignTitle: string;
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

export const SupportModal: React.FC<SupportModalProps> = ({ 
  isOpen, 
  onClose, 
  campaignId, 
  campaignTitle 
}) => {
  const [selectedTier, setSelectedTier] = useState(supportTiers[0]);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  
  const { supportCampaign } = useSupportCampaign();

  const handleSupport = async () => {
    setIsSubmitting(true);
    
    try {
      const amount = isCustom ? customAmount : selectedTier.amount;
      const tokenUri = `https://credvault.com/nft/${campaignId}/${Date.now()}`;
      
      supportCampaign(campaignId, amount, tokenUri);
      
      // Reset form
      setCustomAmount('');
      setMessage('');
      setIsCustom(false);
      setSelectedTier(supportTiers[0]);
      
      onClose();
    } catch (error) {
      console.error('Error supporting campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Support Campaign</h2>
                <p className="text-gray-600">{campaignTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="p-6">
            {/* Support Tiers */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Support Level</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supportTiers.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => {
                        setSelectedTier(tier);
                        setIsCustom(false);
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTier.id === tier.id && !isCustom
                          ? `${tier.borderColor} ${tier.bgColor}`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${tier.bgColor}`}>
                          <Icon className={`w-6 h-6 ${tier.color}`} />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{tier.name}</h4>
                        <p className="text-2xl font-bold text-gray-900 mb-2">{tier.amount} ETH</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {tier.perks.map((perk, index) => (
                            <li key={index}>• {perk}</li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Or Enter Custom Amount</h3>
              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setIsCustom(true);
                  }}
                  placeholder="0.0"
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                    isCustom ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                  }`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ETH
                </span>
              </div>
            </div>

            {/* Support Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message to Creator (Optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message of support..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none"
              />
            </div>

            {/* NFT Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Gift className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Supporter Pass NFT</h4>
                  <p className="text-sm text-blue-700">
                    You'll receive an exclusive NFT as proof of your support. This NFT may include 
                    special perks, access rights, or future utility within the creator's ecosystem.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Support Summary</h4>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-gray-900">
                  {isCustom ? customAmount : selectedTier.amount} ETH
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-600">Tier:</span>
                <span className="font-semibold text-gray-900">
                  {isCustom ? 'Custom' : selectedTier.name}
                </span>
              </div>
            </div>

            {/* Warning */}
            {((isCustom && parseFloat(customAmount) > 0) || !isCustom) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> This transaction will be processed on the Optimism network. 
                      Make sure you have sufficient ETH to cover the support amount plus gas fees.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSupport}
                disabled={isSubmitting || (isCustom && (!customAmount || parseFloat(customAmount) <= 0))}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Support Campaign'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
