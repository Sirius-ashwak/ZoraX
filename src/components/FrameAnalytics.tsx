import React, { useState, useEffect } from 'react';
import { BarChart3, Eye, MousePointer, Zap, TrendingUp, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface FrameAnalyticsData {
  views: number;
  interactions: number;
  mints: number;
  conversionRate: number;
  topReferrers: Array<{
    source: string;
    views: number;
  }>;
  timeSeriesData: Array<{
    date: string;
    views: number;
    interactions: number;
    mints: number;
  }>;
}

interface FrameAnalyticsProps {
  campaignId: string;
  timeRange?: '24h' | '7d' | '30d';
  className?: string;
}

export const FrameAnalytics: React.FC<FrameAnalyticsProps> = ({
  campaignId,
  timeRange = '7d',
  className = ''
}) => {
  const [analyticsData, setAnalyticsData] = useState<FrameAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  const loadAnalytics = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/frames/analytics/${campaignId}?timeRange=${selectedTimeRange}`);
      
      if (!response.ok) {
        throw new Error('Failed to load analytics');
      }
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error('Error loading Frame analytics:', err);
      
      // Mock data fallback
      setAnalyticsData({
        views: 1248,
        interactions: 156,
        mints: 23,
        conversionRate: 14.7,
        topReferrers: [
          { source: 'Farcaster', views: 892 },
          { source: 'Direct', views: 234 },
          { source: 'Twitter', views: 122 }
        ],
        timeSeriesData: generateMockTimeSeriesData(selectedTimeRange)
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [campaignId, selectedTimeRange]);

  const generateMockTimeSeriesData = (range: string) => {
    const days = range === '24h' ? 1 : range === '7d' ? 7 : 30;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 20,
        interactions: Math.floor(Math.random() * 20) + 2,
        mints: Math.floor(Math.random() * 5) + 1
      });
    }
    
    return data;
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
            <p className="text-gray-500">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="text-center">
          <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No analytics data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Frame Analytics</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Time Range Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range as any)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    selectedTimeRange === range
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <button
              onClick={loadAnalytics}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analyticsData.views.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Frame Views</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MousePointer className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analyticsData.interactions}</p>
            <p className="text-sm text-gray-600">Interactions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analyticsData.mints}</p>
            <p className="text-sm text-gray-600">Mints</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
            <p className="text-sm text-gray-600">Conversion</p>
          </motion.div>
        </div>

        {/* Chart Placeholder */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Activity Over Time</h4>
          <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Chart visualization would be here</p>
              <p className="text-gray-400 text-xs">Integration with Chart.js or D3 pending</p>
            </div>
          </div>
        </div>

        {/* Top Referrers */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Top Traffic Sources</h4>
          <div className="space-y-3">
            {analyticsData.topReferrers.map((referrer, index) => (
              <motion.div
                key={referrer.source}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-xs font-medium text-gray-600">
                      {referrer.source[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{referrer.source}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{referrer.views}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
