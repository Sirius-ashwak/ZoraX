import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Target, Calendar,
  BarChart3, PieChart, Activity, RefreshCw, Download, Share2,
  Eye, Heart, MessageCircle, ExternalLink
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// Mock analytics data
const mockAnalyticsData = {
  overview: {
    totalRevenue: 127.5,
    totalSupporters: 1847,
    activeCampaigns: 12,
    conversionRate: 3.4,
    averageSupport: 0.069,
    totalViews: 54321,
    engagement: 8.7,
    growth: 23.5
  },
  
  revenueData: [
    { month: 'Jan', revenue: 12.5, supporters: 156 },
    { month: 'Feb', revenue: 18.2, supporters: 234 },
    { month: 'Mar', revenue: 15.8, supporters: 198 },
    { month: 'Apr', revenue: 22.1, supporters: 287 },
    { month: 'May', revenue: 28.6, supporters: 342 },
    { month: 'Jun', revenue: 30.3, supporters: 389 }
  ],
  
  campaignPerformance: [
    { name: 'Cosmic Soundscape', revenue: 37.8, supporters: 456, status: 'active' },
    { name: 'Digital Nomad Photos', revenue: 24.2, supporters: 312, status: 'active' },
    { name: 'AI Art Experiments', revenue: 45.1, supporters: 523, status: 'completed' },
    { name: 'Sustainable Living', revenue: 20.4, supporters: 298, status: 'completed' }
  ],
  
  categoryBreakdown: [
    { name: 'Digital Art', value: 45, color: '#8B5CF6' },
    { name: 'Music', value: 25, color: '#06B6D4' },
    { name: 'Photography', value: 20, color: '#10B981' },
    { name: 'Education', value: 10, color: '#F59E0B' }
  ],
  
  trafficSources: [
    { source: 'Farcaster', visitors: 12456, percentage: 45.2 },
    { source: 'Direct', visitors: 8932, percentage: 32.4 },
    { source: 'Twitter', visitors: 3421, percentage: 12.4 },
    { source: 'Discord', visitors: 2134, percentage: 7.7 },
    { source: 'Other', visitors: 623, percentage: 2.3 }
  ],
  
  engagementMetrics: [
    { date: '2025-01-01', views: 1234, likes: 156, comments: 45, shares: 23 },
    { date: '2025-01-02', views: 1456, likes: 189, comments: 52, shares: 28 },
    { date: '2025-01-03', views: 1678, likes: 234, comments: 67, shares: 34 },
    { date: '2025-01-04', views: 1345, likes: 167, comments: 41, shares: 19 },
    { date: '2025-01-05', views: 1789, likes: 245, comments: 78, shares: 42 },
    { date: '2025-01-06', views: 1567, likes: 201, comments: 55, shares: 31 },
    { date: '2025-01-07', views: 1923, likes: 287, comments: 89, shares: 48 }
  ]
};

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    icon: React.ReactNode;
    format?: 'currency' | 'percentage' | 'number';
  }> = ({ title, value, change, icon, format = 'number' }) => {
    const formatValue = () => {
      if (format === 'currency') return `${value} ETH`;
      if (format === 'percentage') return `${value}%`;
      return value.toLocaleString();
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              {icon}
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            change >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="text-2xl font-bold text-foreground">
          {formatValue()}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground">
              Track your campaign performance and supporter engagement
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={mockAnalyticsData.overview.totalRevenue}
            change={23.5}
            icon={<DollarSign className="w-5 h-5" />}
            format="currency"
          />
          <MetricCard
            title="Total Supporters"
            value={mockAnalyticsData.overview.totalSupporters}
            change={18.2}
            icon={<Users className="w-5 h-5" />}
          />
          <MetricCard
            title="Active Campaigns"
            value={mockAnalyticsData.overview.activeCampaigns}
            change={12.5}
            icon={<Target className="w-5 h-5" />}
          />
          <MetricCard
            title="Conversion Rate"
            value={mockAnalyticsData.overview.conversionRate}
            change={-2.1}
            icon={<TrendingUp className="w-5 h-5" />}
            format="percentage"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Revenue & Supporters</h3>
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockAnalyticsData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Revenue by Category</h3>
              <PieChart className="w-5 h-5 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  dataKey="value"
                  data={mockAnalyticsData.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {mockAnalyticsData.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Campaign Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Campaign Performance</h3>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Supporters</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAnalyticsData.campaignPerformance.map((campaign, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-foreground">{campaign.name}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-foreground">{campaign.revenue} ETH</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-foreground">{campaign.supporters}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Traffic Sources & Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traffic Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Traffic Sources</h3>
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {mockAnalyticsData.trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium text-foreground">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">{source.visitors.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{source.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Engagement Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Engagement Trends</h3>
              <Heart className="w-5 h-5 text-muted-foreground" />
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockAnalyticsData.engagementMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="views" stroke="#06B6D4" strokeWidth={2} />
                <Line type="monotone" dataKey="likes" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="shares" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span className="text-muted-foreground">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-muted-foreground">Shares</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};