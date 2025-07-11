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
  ArrowUpRight
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
          title: 'Cosmic Travelers NFT Collection',
          description: 'An immersive journey through space and time...',
          imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=400&q=80',
          targetAmount: 10,
          raisedAmount: 7.2,
          supporterCount: 89,
          status: 'active',
          deadline: '2024-12-31',
          createdAt: '2024-07-01'
        },
        {
          id: '2',
          title: 'Digital Art Series',
          description: 'Exploring the intersection of technology and art...',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
          targetAmount: 5,
          raisedAmount: 5,
          supporterCount: 67,
          status: 'completed',
          deadline: '2024-06-30',
          createdAt: '2024-05-15'
        },
        {
          id: '3',
          title: 'Interactive Music NFTs',
          description: 'Music that evolves with blockchain interactions...',
          imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
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

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Connect Your Wallet
              </h1>
              <p className="text-muted-foreground">
                Connect your wallet to access your creator dashboard and start building your audience
              </p>
            </div>
            <div className="space-y-4">
              <ConnectButton />
              <Link 
                href="/"
                className="block text-center text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
                  {address?.slice(0, 6)}...{address?.slice(-4)}
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
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Campaigns Management</h2>
            <p className="text-muted-foreground mb-8">Detailed campaign management coming soon</p>
            <Link href="/campaigns" className="pica-button">
              View All Campaigns
            </Link>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Analytics Dashboard</h2>
            <p className="text-muted-foreground mb-8">Detailed analytics coming soon</p>
            <Link href="/analytics" className="pica-button">
              View Analytics
            </Link>
          </motion.div>
        )}

        {activeTab === 'supporters' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Supporter Management</h2>
            <p className="text-muted-foreground mb-8">Supporter tools coming soon</p>
            <Link href="/supporters" className="pica-button">
              View Supporters
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
