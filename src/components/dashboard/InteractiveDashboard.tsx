import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  TrendingUp,
  Settings,
  Bell,
  Maximize2,
  Minimize2,
  RefreshCw
} from 'lucide-react';

import { RealTimeMetrics } from './RealTimeMetrics';
import { PerformanceCharts } from './PerformanceCharts';
import { CampaignAnalytics } from './CampaignAnalytics';

type DashboardView = 'overview' | 'analytics' | 'campaigns';

interface InteractiveDashboardProps {
  className?: string;
}

export const InteractiveDashboard: React.FC<InteractiveDashboardProps> = ({ className }) => {
  const [activeView, setActiveView] = useState<DashboardView>('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const views = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
    { id: 'campaigns' as const, label: 'Campaigns', icon: TrendingUp }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <RealTimeMetrics />;
      case 'analytics':
        return <PerformanceCharts />;
      case 'campaigns':
        return <CampaignAnalytics />;
      default:
        return <RealTimeMetrics />;
    }
  };

  return (
    <div className={`${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      <div className={`${isFullscreen ? 'h-full' : ''} space-y-6`}>
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-semibold mb-2">Interactive Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time performance metrics and analytics for your NFT campaigns
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>

            {/* Notifications */}
            <button className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors relative">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Settings */}
            <button className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex space-x-1 bg-secondary/30 p-1 rounded-lg"
        >
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeView === view.id
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {activeView === view.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-accent rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{view.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content Area */}
        <div className={`${isFullscreen ? 'flex-1 overflow-y-auto' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};