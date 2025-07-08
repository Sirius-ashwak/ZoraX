import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, TrendingUp, Users, Award } from 'lucide-react';
import { useTrendingCreators, useCreatorSearch } from '../hooks/useZoraCred';
import { AuraLevel, AURA_CONFIGS } from '../types/zoracred';
import { CreatorProfile } from './CreatorProfile';

interface CreatorSearchProps {
  onCreatorSelect?: (address: string) => void;
}

export const CreatorSearch: React.FC<CreatorSearchProps> = ({ onCreatorSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAura, setSelectedAura] = useState<AuraLevel | undefined>();
  const [minSupporters, setMinSupporters] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<'supporters' | 'volume' | 'campaigns' | 'recent'>('supporters');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);

  // Use search if we have search criteria, otherwise get trending
  const { data: searchResults, isLoading: searchLoading } = useCreatorSearch({
    searchTerm: searchTerm || undefined,
    auraLevel: selectedAura,
    minSupporters,
    sortBy,
    limit: 20,
  });

  const { data: trendingCreators, isLoading: trendingLoading } = useTrendingCreators(10);

  const isLoading = searchLoading || trendingLoading;
  const creators = searchTerm || selectedAura || minSupporters ? searchResults : trendingCreators;

  const handleCreatorClick = (address: string) => {
    if (onCreatorSelect) {
      onCreatorSelect(address);
    } else {
      setSelectedCreator(address);
    }
  };

  if (selectedCreator) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedCreator(null)}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
        >
          ← Back to creators
        </button>
        <CreatorProfile address={selectedCreator} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Discover Creators</h2>
        <p className="text-gray-600">Explore ZoraCred profiles and find amazing creators to support</p>
      </div>

      {/* Search Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search creators by name or address..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 border rounded-lg transition-colors flex items-center space-x-2 ${
              showFilters 
                ? 'bg-purple-50 border-purple-200 text-purple-700' 
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="border-t border-gray-200 pt-4 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aura Level</label>
                <select
                  value={selectedAura || ''}
                  onChange={(e) => setSelectedAura(e.target.value as AuraLevel || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Levels</option>
                  {Object.values(AuraLevel).map((level) => (
                    <option key={level} value={level}>
                      {AURA_CONFIGS[level].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Supporters</label>
                <input
                  type="number"
                  value={minSupporters || ''}
                  onChange={(e) => setMinSupporters(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="supporters">Supporters</option>
                  <option value="volume">Volume</option>
                  <option value="campaigns">Campaigns</option>
                  <option value="recent">Recent Activity</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : creators && creators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, index) => {
            const auraConfig = AURA_CONFIGS[creator.auraLevel];
            return (
              <motion.div
                key={creator.address}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCreatorClick(creator.address)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
                style={{
                  borderColor: creator.auraLevel !== AuraLevel.SPARK ? `${auraConfig.color}30` : undefined,
                }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center p-0.5"
                    style={{
                      background: creator.auraLevel !== AuraLevel.SPARK 
                        ? `linear-gradient(135deg, ${auraConfig.color}40, ${auraConfig.color}20)` 
                        : 'rgb(229, 231, 235)',
                    }}
                  >
                    <img 
                      src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.address}`}
                      alt={creator.name || 'Creator'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {creator.name || 'Anonymous Creator'}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star 
                        className="w-3 h-3" 
                        style={{ color: auraConfig.color }}
                      />
                      <span 
                        className="text-xs font-medium"
                        style={{ color: auraConfig.color }}
                      >
                        {auraConfig.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{creator.metrics.uniqueSupporters}</p>
                    <p className="text-xs text-gray-600">Supporters</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{creator.metrics.totalVolume.eth}</p>
                    <p className="text-xs text-gray-600">ETH</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{creator.metrics.totalContracts}</p>
                    <p className="text-xs text-gray-600">Campaigns</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No creators found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or explore trending creators.</p>
        </div>
      )}
    </div>
  );
};
