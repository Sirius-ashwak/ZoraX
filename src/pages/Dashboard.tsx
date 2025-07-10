import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Plus, TrendingUp, Users, DollarSign, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ANIMATION_VARIANTS } from '@/lib/constants';
import { formatEth, formatNumber } from '@/lib/utils';

interface DashboardStats {
  totalCampaigns: number;
  totalRaised: number;
  totalSupporters: number;
  reputationScore: number;
}

interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUri: string;
  priceETH: number;
  totalSupply: number;
  minted: number;
  status: string;
  endDate: string;
}

export function Dashboard() {
  const { address, isConnected } = useAccount();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/users/stats', address],
    queryFn: async () => {
      const response = await fetch(`/api/users/stats?address=${address}`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    enabled: !!address,
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ['/api/campaigns/creator', address],
    queryFn: async () => {
      const response = await fetch(`/api/campaigns/creator?address=${address}`);
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      return response.json();
    },
    enabled: !!address,
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          {...ANIMATION_VARIANTS.fadeIn}
          className="text-center max-w-md mx-auto"
        >
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">
              Connect your wallet to access your creator dashboard and manage your campaigns.
            </p>
            <ConnectButton />
          </div>
        </motion.div>
      </div>
    );
  }

  const dashboardStats: DashboardStats = stats?.data || {
    totalCampaigns: 0,
    totalRaised: 0,
    totalSupporters: 0,
    reputationScore: 0,
  };

  const userCampaigns: Campaign[] = campaigns?.data || [];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          {...ANIMATION_VARIANTS.slideUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Creator Dashboard
            </h1>
            <p className="text-gray-300">
              Welcome back! Here's an overview of your campaigns and performance.
            </p>
          </div>
          <Link to="/create">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 mt-4 md:mt-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Campaign
            </Button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Campaigns',
              value: formatNumber(dashboardStats.totalCampaigns),
              icon: TrendingUp,
              color: 'from-purple-500 to-purple-600',
              change: '+12%',
            },
            {
              title: 'Total Raised',
              value: formatEth(dashboardStats.totalRaised),
              icon: DollarSign,
              color: 'from-cyan-500 to-cyan-600',
              change: '+23%',
            },
            {
              title: 'Total Supporters',
              value: formatNumber(dashboardStats.totalSupporters),
              icon: Users,
              color: 'from-green-500 to-green-600',
              change: '+8%',
            },
            {
              title: 'Reputation Score',
              value: dashboardStats.reputationScore.toFixed(1),
              icon: Eye,
              color: 'from-yellow-500 to-yellow-600',
              change: '+5%',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              {...ANIMATION_VARIANTS.slideUp}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                      </p>
                      <p className="text-green-400 text-sm mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Campaigns Section */}
        <motion.div
          {...ANIMATION_VARIANTS.slideUp}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white text-xl">Your Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {campaignsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="spinner w-8 h-8"></div>
                </div>
              ) : userCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userCampaigns.map((campaign) => (
                    <div key={campaign.id} className="glass-card p-4 hover-lift">
                      <img
                        src={campaign.imageUri || '/api/placeholder/300/200'}
                        alt={campaign.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-white font-semibold mb-2">
                        {campaign.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {campaign.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">
                            {campaign.minted}/{campaign.totalSupply}
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
                        <div className="flex justify-between items-center mt-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            campaign.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {campaign.status}
                          </span>
                          <Link to={`/campaign/${campaign.id}`}>
                            <Button size="sm" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    No campaigns yet
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Create your first campaign to start building your reputation and connecting with supporters.
                  </p>
                  <Link to="/create">
                    <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Campaign
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}