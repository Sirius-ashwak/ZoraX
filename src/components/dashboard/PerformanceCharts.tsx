import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar, TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

// Generate sample data for different time periods
const generateTimeSeriesData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      mints: Math.floor(Math.random() * 50) + 10,
      revenue: Math.random() * 2 + 0.5,
      views: Math.floor(Math.random() * 1000) + 200,
      conversions: Math.random() * 10 + 2
    });
  }
  return data;
};

// Sample data for different chart types
const campaignPerformanceData = [
  { name: 'Cosmic Art Collection', mints: 245, revenue: 12.3, status: 'active' },
  { name: 'Space Exploration NFT', mints: 189, revenue: 8.7, status: 'completed' },
  { name: 'Digital Cosmos Series', mints: 156, revenue: 6.2, status: 'active' },
  { name: 'Stellar Portraits', mints: 98, revenue: 4.1, status: 'active' },
  { name: 'Nebula Dreams', mints: 67, revenue: 2.8, status: 'completed' }
];

const trafficSourceData = [
  { name: 'Direct', value: 45, color: '#6366f1' },
  { name: 'Twitter', value: 28, color: '#8b5cf6' },
  { name: 'Discord', value: 18, color: '#06b6d4' },
  { name: 'Farcaster', value: 9, color: '#10b981' }
];

interface PerformanceChartsProps {
  className?: string;
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ className }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeChart, setActiveChart] = useState<'mints' | 'revenue' | 'views' | 'conversions'>('mints');

  const timeRangeData = {
    '7d': generateTimeSeriesData(7),
    '30d': generateTimeSeriesData(30),
    '90d': generateTimeSeriesData(90)
  };

  const chartData = timeRangeData[timeRange];

  const chartConfigs = {
    mints: { color: '#6366f1', label: 'NFT Mints', dataKey: 'mints' },
    revenue: { color: '#10b981', label: 'Revenue (ETH)', dataKey: 'revenue' },
    views: { color: '#f59e0b', label: 'Campaign Views', dataKey: 'views' },
    conversions: { color: '#ef4444', label: 'Conversion Rate (%)', dataKey: 'conversions' }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{new Date(label).toLocaleDateString()}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span className="font-medium" style={{ color: entry.color }}>
                {chartConfigs[activeChart].label}:
              </span>{' '}
              {entry.value.toFixed(activeChart === 'revenue' ? 3 : 0)}
              {activeChart === 'revenue' && ' ETH'}
              {activeChart === 'conversions' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pica-card p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Performance Overview</h3>
            <p className="text-muted-foreground">Track your NFT campaign metrics over time</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Metric Selector */}
            <div className="flex bg-secondary/30 rounded-lg p-1">
              {Object.entries(chartConfigs).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActiveChart(key as any)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeChart === key
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
            
            {/* Time Range Selector */}
            <div className="flex bg-secondary/30 rounded-lg p-1">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${activeChart}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfigs[activeChart].color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={chartConfigs[activeChart].color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis 
                dataKey="date" 
                stroke="#71717a"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#71717a" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={chartConfigs[activeChart].dataKey}
                stroke={chartConfigs[activeChart].color}
                fillOpacity={1}
                fill={`url(#gradient-${activeChart})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="pica-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Campaign Performance</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignPerformanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis type="number" stroke="#71717a" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#71717a" 
                  fontSize={10}
                  width={120}
                  tickFormatter={(value) => value.length > 15 ? `${value.slice(0, 15)}...` : value}
                />
                <Tooltip 
                  content={({ active, payload, label }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-medium mb-1">{label}</p>
                          <p className="text-sm text-muted-foreground">
                            <span className="text-accent font-medium">Mints:</span> {payload[0].value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="text-green-400 font-medium">Revenue:</span> {payload[0].payload.revenue} ETH
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="mints" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="pica-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Traffic Sources</h3>
          </div>
          
          <div className="flex items-center justify-center h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            {trafficSourceData.map((source) => (
              <div key={source.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm text-muted-foreground">{source.name}</span>
                <span className="text-sm font-medium ml-auto">{source.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};