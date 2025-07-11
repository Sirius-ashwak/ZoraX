import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Wallet, 
  BarChart3, 
  Settings, 
  Bell,
  Search,
  Eye,
  Share2,
  Calendar,
  Award,
  Target,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { analytics } from '../services/analytics';

interface Campaign {
  id: string;
  title: string;
  description: string;
  raisedAmount: number;
  supporterCount: number;
  status: 'active' | 'completed' | 'draft';
  deadline: string;
  createdAt: string;
  imageUrl: string;
  targetAmount: number;
}

interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaised: number;
  totalSupporters: number;
  reputationScore: number;
  monthlyGrowth: number;
}

export const ModernDashboard: React.FC = () => {
  const { address, isConnected } = useUser();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'analytics' | 'supporters'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalRaised: 0,
    totalSupporters: 0,
    reputationScore: 0,
    monthlyGrowth: 0
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Track page view
    analytics.track('dashboard_viewed', { address });
    loadDashboardData();
  }, [address]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data - in production this would come from API
      const mockStats: DashboardStats = {
        totalCampaigns: 8,
        activeCampaigns: 3,
        totalRaised: 12.5,
        totalSupporters: 247,
        reputationScore: 847,
        monthlyGrowth: 23.5
      };

      const mockCampaigns: Campaign[] = [
        {
          id: '1',
          title: 'Stellar Journey NFT Collection',
          description: 'Navigate through distant galaxies with unique spaceship designs...',
          imageUrl: 'https://picsum.photos/400/300?random=1',
          targetAmount: 10,
          raisedAmount: 7.2,
          supporterCount: 89,
          status: 'active',
          deadline: '2024-12-31',
          createdAt: '2024-07-01'
        },
        {
          id: '2',
          title: 'Neo Digital Art Series',
          description: 'Futuristic digital artworks blending technology and creativity...',
          imageUrl: 'https://picsum.photos/400/300?random=2',
          targetAmount: 5,
          raisedAmount: 5,
          supporterCount: 67,
          status: 'completed',
          deadline: '2024-06-30',
          createdAt: '2024-05-15'
        },
        {
          id: '3',
          title: 'Harmonic Blockchain Music',
          description: 'Innovative music NFTs that change based on blockchain events...',
          imageUrl: 'https://picsum.photos/400/300?random=3',
          targetAmount: 8,
          raisedAmount: 3.1,
          supporterCount: 45,
          status: 'active',
          deadline: '2024-11-15',
          createdAt: '2024-06-20'
        }
      ];

      setStats(mockStats);
      setCampaigns(mockCampaigns);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="w-8 h-8 bg-accent rounded-full animate-bounce"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Browse campaigns and explore creators'}
                </p>
              </div>
              
              {/* Tab Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'campaigns', label: 'Campaigns', icon: Target },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'supporters', label: 'Supporters', icon: Users }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:border-accent focus:outline-none w-64"
                />
              </div>
              
              {/* Role Switch */}
              {isConnected && (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-500">Creator</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <Link href="/supporter-dashboard" className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors">
                      <Users className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Switch to Supporter</p>
                        <p className="text-xs text-muted-foreground">View as supporter</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
              
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
              <Link
                href="/settings"
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isConnected ? (
                <Link
                  href="/create-campaign"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl p-6 transition-all duration-200 hover:scale-[1.02] group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Create New Campaign</h3>
                      <p className="text-purple-100 text-sm">Launch your next NFT collection</p>
                    </div>
                    <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform" />
                  </div>
                </Link>
              ) : (
                <div className="flex-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 relative group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Create New Campaign</h3>
                      <p className="text-muted-foreground text-sm">Connect wallet to start creating</p>
                    </div>
                    <Wallet className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <ConnectButton />
                  </div>
                </div>
              )}
              
              <div className="flex-1 grid grid-cols-2 gap-4">
                <Link
                  href="/analytics"
                  className="bg-card/50 border border-border rounded-xl p-4 hover:bg-card/80 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  </div>
                  <h3 className="font-medium text-sm">Analytics</h3>
                  <p className="text-xs text-muted-foreground">View insights</p>
                </Link>
                
                <Link
                  href="/supporters"
                  className="bg-card/50 border border-border rounded-xl p-4 hover:bg-card/80 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  </div>
                  <h3 className="font-medium text-sm">Community</h3>
                  <p className="text-xs text-muted-foreground">Manage supporters</p>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 text-purple-500" />
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    +{stats.monthlyGrowth}%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">{stats.totalCampaigns}</h3>
                  <p className="text-sm text-muted-foreground">Total Campaigns</p>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Wallet className="w-8 h-8 text-blue-500" />
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    +15%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">{stats.totalRaised} ETH</h3>
                  <p className="text-sm text-muted-foreground">Total Raised</p>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-green-500" />
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    +{Math.round(stats.monthlyGrowth * 0.8)}%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">{stats.totalSupporters}</h3>
                  <p className="text-sm text-muted-foreground">Supporters</p>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">
                    Expert
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">{stats.reputationScore}</h3>
                  <p className="text-sm text-muted-foreground">Reputation Score</p>
                </div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Campaigns</h2>
                <Link
                  href="/campaigns"
                  className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1"
                >
                  View all
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid gap-6">
                {filteredCampaigns.slice(0, 3).map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card/50 border border-border rounded-xl p-6 hover:bg-card/80 transition-colors group"
                  >
                    <div className="flex gap-4">
                      <img
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        className="w-20 h-20 rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://picsum.photos/400/300?random=${campaign.id}`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                            {campaign.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            campaign.status === 'active' 
                              ? 'bg-green-500/10 text-green-500'
                              : campaign.status === 'completed'
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {campaign.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Wallet className="w-4 h-4" />
                            {campaign.raisedAmount}/{campaign.targetAmount} ETH
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {campaign.supporterCount} supporters
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(campaign.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/campaign/${campaign.id}`}
                          className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === 'campaigns' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Campaign Management</h2>
              {isConnected ? (
                <Link href="/create-campaign" className="pica-button flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Campaign
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Connect wallet to create campaigns</span>
                  <ConnectButton />
                </div>
              )}
            </div>

            {/* Campaign Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-foreground">Total Campaigns</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.totalCampaigns}</p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-foreground">Active</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.activeCampaigns}</p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-foreground">Total Raised</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.totalRaised} ETH</p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-foreground">Supporters</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.totalSupporters}</p>
              </div>
            </div>

            {/* Campaigns List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">All Campaigns</h3>
                <div className="flex items-center gap-2">
                  <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredCampaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-card/50 border border-border rounded-xl p-6 hover:bg-card/80 transition-colors">
                    <div className="flex gap-4">
                      <img
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        className="w-24 h-24 rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://picsum.photos/400/300?random=${campaign.id}`;
                        }}
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{campaign.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{campaign.description}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            campaign.status === 'active' 
                              ? 'bg-green-500/10 text-green-500'
                              : campaign.status === 'completed'
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Wallet className="w-4 h-4" />
                            <span>{campaign.raisedAmount}/{campaign.targetAmount} ETH</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{campaign.supporterCount} supporters</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Ends {new Date(campaign.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Link href={`/campaign/${campaign.id}`} className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            View Details
                          </Link>
                          <button className="text-muted-foreground hover:text-foreground text-sm font-medium flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            Share
                          </button>
                          {isConnected && (
                            <button className="text-muted-foreground hover:text-foreground text-sm font-medium">
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Analytics Dashboard</h2>
              <div className="flex items-center gap-2">
                <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    +{stats.monthlyGrowth}%
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalRaised} ETH</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">
                    +{Math.round(stats.monthlyGrowth * 0.7)}%
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalSupporters}</p>
                  <p className="text-sm text-muted-foreground">Total Supporters</p>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-6 h-6 text-purple-500" />
                  <span className="text-xs font-medium text-purple-500 bg-purple-500/10 px-2 py-1 rounded-full">
                    +{Math.round(stats.monthlyGrowth * 1.2)}%
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{(stats.totalSupporters * 4.2).toFixed(0)}</p>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-6 h-6 text-orange-500" />
                  <span className="text-xs font-medium text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                    Expert
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.reputationScore}</p>
                  <p className="text-sm text-muted-foreground">Reputation Score</p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Campaign Performance */}
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Performance</h3>
                <div className="space-y-4">
                  {campaigns.slice(0, 4).map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{campaign.title}</p>
                          <p className="text-xs text-muted-foreground">{campaign.supporterCount} supporters</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{campaign.raisedAmount} ETH</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)}% funded
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">New supporter joined</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Campaign funding milestone reached</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Campaign shared on social media</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Target className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">New campaign launched</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Link to detailed analytics */}
            <div className="text-center">
              <Link href="/analytics" className="pica-button-secondary">
                View Detailed Analytics
              </Link>
            </div>
          </motion.div>
        )}

        {activeTab === 'supporters' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Supporter Community</h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search supporters..."
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm w-64"
                />
                <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Supporter Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-foreground">Total Supporters</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.totalSupporters}</p>
                <p className="text-xs text-green-500">+{Math.round(stats.monthlyGrowth * 0.6)}% this month</p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-foreground">Active This Month</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{Math.round(stats.totalSupporters * 0.65)}</p>
                <p className="text-xs text-green-500">+{Math.round(stats.monthlyGrowth * 0.4)}% growth</p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-foreground">Avg. Contribution</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{(stats.totalRaised / stats.totalSupporters).toFixed(3)} ETH</p>
                <p className="text-xs text-purple-500">Per supporter</p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-foreground">Top Supporters</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{Math.round(stats.totalSupporters * 0.08)}</p>
                <p className="text-xs text-orange-500">VIP members</p>
              </div>
            </div>

            {/* Top Supporters */}
            <div className="bg-card/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Top Supporters</h3>
              <div className="space-y-4">
                {[
                  { id: 1, name: 'CryptoCreator.eth', avatar: '1', contributed: '2.5 ETH', campaigns: 5, rank: 1 },
                  { id: 2, name: 'NFTCollector.eth', avatar: '2', contributed: '1.8 ETH', campaigns: 3, rank: 2 },
                  { id: 3, name: 'ArtLover.eth', avatar: '3', contributed: '1.2 ETH', campaigns: 7, rank: 3 },
                  { id: 4, name: 'Web3Builder.eth', avatar: '4', contributed: '0.9 ETH', campaigns: 2, rank: 4 },
                  { id: 5, name: 'MetaverseExplorer.eth', avatar: '5', contributed: '0.7 ETH', campaigns: 4, rank: 5 },
                ].map((supporter) => (
                  <div key={supporter.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          supporter.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                          supporter.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                          supporter.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                          'bg-gradient-to-br from-purple-400 to-purple-600'
                        }`}>
                          {supporter.rank}
                        </div>
                        <img
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${supporter.name}`}
                          alt={supporter.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{supporter.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Supported {supporter.campaigns} campaigns
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{supporter.contributed}</p>
                      <p className="text-sm text-muted-foreground">Total contributed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Supporters */}
            <div className="bg-card/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Supporters</h3>
              <div className="space-y-3">
                {[
                  { name: 'NewSupporter.eth', amount: '0.5 ETH', campaign: 'Stellar Journey NFT', time: '2 hours ago' },
                  { name: 'EarlyAdopter.eth', amount: '1.0 ETH', campaign: 'Neo Digital Art Series', time: '5 hours ago' },
                  { name: 'CommunityMember.eth', amount: '0.3 ETH', campaign: 'Cosmic Landscapes', time: '8 hours ago' },
                  { name: 'ArtEnthusiast.eth', amount: '0.8 ETH', campaign: 'Stellar Journey NFT', time: '1 day ago' },
                ].map((supporter, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${supporter.name}`}
                        alt={supporter.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">{supporter.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Supported "{supporter.campaign}"
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground text-sm">{supporter.amount}</p>
                      <p className="text-xs text-muted-foreground">{supporter.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Engagement Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Community Engagement</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 bg-background/30 hover:bg-background/50 rounded-lg transition-colors">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-foreground">Send Update to All Supporters</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-background/30 hover:bg-background/50 rounded-lg transition-colors">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-foreground">Recognize Top Contributors</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-background/30 hover:bg-background/50 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium text-foreground">Share Supporter Highlights</span>
                  </button>
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Supporter Insights</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Return supporters</span>
                    <span className="text-sm font-medium text-foreground">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average session time</span>
                    <span className="text-sm font-medium text-foreground">4m 32s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Social shares</span>
                    <span className="text-sm font-medium text-foreground">156 this month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Engagement rate</span>
                    <span className="text-sm font-medium text-green-500">+23% ↗</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
