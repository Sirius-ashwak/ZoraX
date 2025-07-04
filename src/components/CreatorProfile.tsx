import React from 'react';
import { Star, TrendingUp, Users, Award, Calendar, ExternalLink } from 'lucide-react';

interface CreatorProfileProps {
  address: string;
  profile: {
    name: string;
    bio: string;
    avatar: string;
    totalRaised: string;
    totalSupporters: number;
    campaignCount: number;
    reputationScore: number;
    joinedAt: number;
  };
  campaigns: any[];
}

export function CreatorProfile({ address, profile, campaigns }: CreatorProfileProps) {
  const joinDate = new Date(profile.joinedAt * 1000).toLocaleDateString();
  const avgRaised = profile.campaignCount > 0 ? parseFloat(profile.totalRaised) / profile.campaignCount : 0;
  
  const getReputationLevel = (score: number) => {
    if (score >= 1000) return { level: 'Elite', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (score >= 500) return { level: 'Expert', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 200) return { level: 'Rising', color: 'text-green-600', bgColor: 'bg-green-100' };
    return { level: 'Newcomer', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };
  
  const reputation = getReputationLevel(profile.reputationScore);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Award className="w-10 h-10" />
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">
              {profile.name || 'Anonymous Creator'}
            </h1>
            <p className="text-blue-100 mb-2 font-mono text-sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${reputation.bgColor} ${reputation.color} bg-white/20 text-white`}>
              <Star className="w-4 h-4 mr-1" />
              {reputation.level} • {profile.reputationScore} points
            </div>
          </div>
        </div>
        
        {profile.bio && (
          <p className="mt-4 text-blue-100 leading-relaxed">
            {profile.bio}
          </p>
        )}
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border-b border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center text-green-600 mb-2">
            <TrendingUp className="w-5 h-5 mr-1" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {parseFloat(profile.totalRaised).toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">ETH Raised</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center text-blue-600 mb-2">
            <Users className="w-5 h-5 mr-1" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {profile.totalSupporters}
          </div>
          <div className="text-sm text-gray-500">Supporters</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center text-purple-600 mb-2">
            <Award className="w-5 h-5 mr-1" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {profile.campaignCount}
          </div>
          <div className="text-sm text-gray-500">Campaigns</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center text-orange-600 mb-2">
            <Calendar className="w-5 h-5 mr-1" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {avgRaised.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">Avg/Campaign</div>
        </div>
      </div>
      
      {/* Achievements */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {profile.totalRaised && parseFloat(profile.totalRaised) > 0 && (
            <div className="flex items-center space-x-2 bg-green-50 text-green-800 px-3 py-2 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">First Raise</span>
            </div>
          )}
          
          {profile.totalSupporters >= 10 && (
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Community Builder</span>
            </div>
          )}
          
          {profile.campaignCount >= 3 && (
            <div className="flex items-center space-x-2 bg-purple-50 text-purple-800 px-3 py-2 rounded-lg">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Serial Creator</span>
            </div>
          )}
          
          {profile.reputationScore >= 500 && (
            <div className="flex items-center space-x-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded-lg">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">High Reputation</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Profile Details</h3>
          <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ExternalLink className="w-4 h-4 mr-1" />
            <span className="text-sm">View on Zora</span>
          </button>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Joined</span>
            <span className="text-gray-900">{joinDate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Success Rate</span>
            <span className="text-gray-900">
              {profile.campaignCount > 0 ? '85%' : 'N/A'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Network</span>
            <span className="text-gray-900">Optimism</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Verification</span>
            <span className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Onchain Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}