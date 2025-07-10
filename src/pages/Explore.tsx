import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ANIMATION_VARIANTS } from '@/lib/constants';
import { formatEth, formatNumber, timeRemaining } from '@/lib/utils';

interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUri: string;
  creator: string;
  priceETH: number;
  totalSupply: number;
  minted: number;
  endDate: string;
  category: string;
  reputationScore: number;
}

export function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['/api/campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/campaigns');
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      return response.json();
    }
  });

  const categories = ['All', 'Art', 'Music', 'Gaming', 'Technology', 'Education'];
  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'newest', label: 'Newest' },
    { value: 'ending', label: 'Ending Soon' },
    { value: 'funded', label: 'Most Funded' },
  ];

  const filteredCampaigns = campaigns?.data?.filter((campaign: Campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          {...ANIMATION_VARIANTS.slideUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Campaigns
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing creators and support their innovative projects
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          {...ANIMATION_VARIANTS.slideUp}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'glass-card border-white/20 text-white hover:bg-white/10'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-800">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign: Campaign, index: number) => (
            <motion.div
              key={campaign.id}
              {...ANIMATION_VARIANTS.slideUp}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card hover-lift h-full">
                <div className="relative">
                  <img
                    src={campaign.imageUri || '/api/placeholder/400/250'}
                    alt={campaign.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-purple-600/80 text-white">
                      {campaign.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white text-sm">{campaign.reputationScore}</span>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-white text-lg mb-2">
                    {campaign.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {campaign.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Creator</span>
                    <span className="text-white font-medium">
                      {campaign.creator?.slice(0, 6)}...{campaign.creator?.slice(-4)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white font-medium">
                      {formatEth(campaign.priceETH)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">
                        {formatNumber(campaign.minted)}/{formatNumber(campaign.totalSupply)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min((campaign.minted / campaign.totalSupply) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {timeRemaining(new Date(campaign.endDate))}
                    </span>
                    <span className="text-purple-400 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trending
                    </span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                    View Campaign
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <motion.div
            {...ANIMATION_VARIANTS.fadeIn}
            className="text-center py-16"
          >
            <h3 className="text-2xl font-bold text-white mb-4">No campaigns found</h3>
            <p className="text-gray-400 mb-8">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}