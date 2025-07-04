import React from 'react';
import { Users, Clock, Target, TrendingUp } from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUri: string;
  goalAmount: string;
  raisedAmount: string;
  supporterCount: number;
  endTime: number;
  creator: string;
  isActive: boolean;
}

interface CampaignCardProps {
  campaign: Campaign;
  onSupport: (campaignId: number) => void;
  onViewDetails: (campaignId: number) => void;
}

export function CampaignCard({ campaign, onSupport, onViewDetails }: CampaignCardProps) {
  const progress = (parseFloat(campaign.raisedAmount) / parseFloat(campaign.goalAmount)) * 100;
  const timeLeft = Math.max(0, campaign.endTime - Date.now() / 1000);
  const daysLeft = Math.floor(timeLeft / (24 * 60 * 60));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
        {campaign.imageUri ? (
          <img 
            src={campaign.imageUri} 
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TrendingUp className="w-12 h-12 text-blue-400" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            campaign.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {campaign.isActive ? 'Active' : 'Completed'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {campaign.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {campaign.description}
        </p>
        
        <div className="space-y-4">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center text-blue-600 mb-1">
                <Target className="w-4 h-4 mr-1" />
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {parseFloat(campaign.goalAmount).toFixed(2)} ETH
              </div>
              <div className="text-xs text-gray-500">Goal</div>
            </div>
            
            <div>
              <div className="flex items-center justify-center text-green-600 mb-1">
                <TrendingUp className="w-4 h-4 mr-1" />
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {parseFloat(campaign.raisedAmount).toFixed(2)} ETH
              </div>
              <div className="text-xs text-gray-500">Raised</div>
            </div>
            
            <div>
              <div className="flex items-center justify-center text-purple-600 mb-1">
                <Users className="w-4 h-4 mr-1" />
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {campaign.supporterCount}
              </div>
              <div className="text-xs text-gray-500">Supporters</div>
            </div>
          </div>
          
          {/* Time Left */}
          {campaign.isActive && (
            <div className="flex items-center justify-center text-orange-600 bg-orange-50 rounded-lg py-2">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {daysLeft > 0 ? `${daysLeft} days left` : 'Ending soon'}
              </span>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => onViewDetails(campaign.id)}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              View Details
            </button>
            {campaign.isActive && (
              <button
                onClick={() => onSupport(campaign.id)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Support
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}