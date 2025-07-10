import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Users, 
  Zap, 
  DollarSign,
  Activity,
  Target,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface MetricData {
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  label: string;
  suffix?: string;
  prefix?: string;
}

interface RealTimeMetricsProps {
  refreshInterval?: number;
}

// Simulated real-time data generation
const generateMetrics = (): Record<string, MetricData> => {
  const baseMetrics = {
    totalViews: Math.floor(Math.random() * 50000) + 10000,
    uniqueVisitors: Math.floor(Math.random() * 5000) + 1000,
    mintCount: Math.floor(Math.random() * 500) + 100,
    revenue: Math.random() * 10 + 2,
    conversionRate: Math.random() * 8 + 2,
    avgTimeOnSite: Math.random() * 180 + 60,
    bounceRate: Math.random() * 40 + 10,
    activeNow: Math.floor(Math.random() * 50) + 5
  };

  const createMetric = (current: number, label: string, suffix = '', prefix = ''): MetricData => {
    const previousValue = current * (0.85 + Math.random() * 0.3);
    const change = current - previousValue;
    const changePercent = (change / previousValue) * 100;
    
    return {
      value: current,
      previousValue,
      change,
      changePercent,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      label,
      suffix,
      prefix
    };
  };

  return {
    totalViews: createMetric(baseMetrics.totalViews, 'Total Views'),
    uniqueVisitors: createMetric(baseMetrics.uniqueVisitors, 'Unique Visitors'),
    mintCount: createMetric(baseMetrics.mintCount, 'NFTs Minted'),
    revenue: createMetric(baseMetrics.revenue, 'Revenue', ' ETH'),
    conversionRate: createMetric(baseMetrics.conversionRate, 'Conversion Rate', '%'),
    avgTimeOnSite: createMetric(baseMetrics.avgTimeOnSite, 'Avg. Time', 's'),
    bounceRate: createMetric(baseMetrics.bounceRate, 'Bounce Rate', '%'),
    activeNow: createMetric(baseMetrics.activeNow, 'Active Now')
  };
};

const MetricCard: React.FC<{ metric: MetricData; icon: React.ElementType; delay: number }> = ({ 
  metric, 
  icon: Icon, 
  delay 
}) => {
  const formatValue = (value: number) => {
    if (metric.suffix === 's') {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return metric.suffix === ' ETH' ? value.toFixed(3) : Math.round(value).toString();
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up': return ArrowUpRight;
      case 'down': return ArrowDownRight;
      default: return Activity;
    }
  };

  const TrendIcon = getTrendIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: delay * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="pica-card p-6 relative overflow-hidden group"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            <TrendIcon className="w-4 h-4" />
            <span>{Math.abs(metric.changePercent).toFixed(1)}%</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-end gap-1">
            <motion.span 
              className="text-2xl font-semibold"
              key={metric.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {metric.prefix}{formatValue(metric.value)}{metric.suffix}
            </motion.span>
          </div>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
        </div>

        {/* Mini trend indicator */}
        <div className="mt-3 h-1 bg-secondary/30 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${metric.trend === 'up' ? 'bg-green-400' : metric.trend === 'down' ? 'bg-red-400' : 'bg-muted-foreground'}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(Math.abs(metric.changePercent) * 2, 100)}%` }}
            transition={{ duration: 1, delay: delay * 0.1 + 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ 
  refreshInterval = 5000 
}) => {
  const [metrics, setMetrics] = useState(generateMetrics());
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setMetrics(generateMetrics());
        setLastUpdate(new Date());
        setIsUpdating(false);
      }, 300);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const metricConfigs = [
    { key: 'totalViews', icon: Eye },
    { key: 'uniqueVisitors', icon: Users },
    { key: 'mintCount', icon: Zap },
    { key: 'revenue', icon: DollarSign },
    { key: 'conversionRate', icon: Target },
    { key: 'avgTimeOnSite', icon: Clock },
    { key: 'bounceRate', icon: TrendingDown },
    { key: 'activeNow', icon: Activity }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Real-Time NFT Metrics</h2>
          <p className="text-muted-foreground">
            Live performance data for your campaigns
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${isUpdating ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`} />
          <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={lastUpdate.getTime()}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {metricConfigs.map((config, index) => (
            <MetricCard
              key={config.key}
              metric={metrics[config.key]}
              icon={config.icon}
              delay={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Real-time activity feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="pica-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent" />
          Live Activity
        </h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex items-center gap-3 text-sm"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-muted-foreground">
                {new Date(Date.now() - i * 30000).toLocaleTimeString()}
              </span>
              <span>
                New mint from{' '}
                <span className="font-mono text-accent">
                  {`0x${Math.random().toString(16).slice(2, 8)}`}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};