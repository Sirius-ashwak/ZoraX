import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  TrendingUp, 
  Users, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Info,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  metadata?: {
    campaignId?: string;
    value?: string;
  };
}

// Mock notification generator
const generateNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'success',
    title: 'New Mint Alert',
    message: 'Your "Cosmic Art Collection" received 5 new mints in the last hour',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false,
    metadata: { campaignId: '1', value: '5 mints' }
  },
  {
    id: '2',
    type: 'info',
    title: 'Campaign Milestone',
    message: 'Space Exploration NFT reached 75% completion',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    metadata: { campaignId: '2', value: '75%' }
  },
  {
    id: '3',
    type: 'warning',
    title: 'Low Activity Alert',
    message: 'Digital Cosmos Series has had low activity in the past 24 hours',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isRead: true,
    metadata: { campaignId: '3' }
  },
  {
    id: '4',
    type: 'success',
    title: 'Revenue Milestone',
    message: 'You\'ve earned over 25 ETH this month!',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isRead: false,
    metadata: { value: '25.3 ETH' }
  },
  {
    id: '5',
    type: 'info',
    title: 'New Supporter',
    message: '0xa1b2...c3d4 became a supporter of your campaigns',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true
  }
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationItem: React.FC<{ 
  notification: Notification; 
  onMarkRead: (id: string) => void;
  onRemove: (id: string) => void;
}> = ({ notification, onMarkRead, onRemove }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const getColor = () => {
    switch (notification.type) {
      case 'success': return 'text-green-400 bg-green-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };

  const Icon = getIcon();
  const colorClass = getColor();

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`p-4 border border-border rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer ${
        !notification.isRead ? 'bg-accent/5 border-accent/20' : ''
      }`}
      onClick={() => !notification.isRead && onMarkRead(notification.id)}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-sm truncate">{notification.title}</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(notification.timestamp)}
              </span>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-accent rounded-full" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(notification.id);
                }}
                className="p-1 hover:bg-secondary/50 rounded-md transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {notification.message}
          </p>
          
          {notification.metadata && (
            <div className="flex flex-wrap gap-2">
              {notification.metadata.campaignId && (
                <span className="px-2 py-1 bg-secondary/50 rounded-md text-xs">
                  Campaign #{notification.metadata.campaignId}
                </span>
              )}
              {notification.metadata.value && (
                <span className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium">
                  {notification.metadata.value}
                </span>
              )}
            </div>
          )}
          
          {notification.action && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                notification.action!.onClick();
              }}
              className="mt-2 text-xs text-accent hover:text-accent/80 font-medium"
            >
              {notification.action.label}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>(generateNotifications());
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.isRead);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const handleRemove = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Generate new notifications periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)] as any,
          title: 'New Activity',
          message: 'Real-time notification from your campaigns',
          timestamp: new Date(),
          isRead: false
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filters and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex bg-secondary/30 rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === 'all' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === 'unread' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Unread
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-accent hover:text-accent/80 font-medium"
                >
                  Mark all read
                </button>
                <button
                  onClick={handleClearAll}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkRead={handleMarkRead}
                    onRemove={handleRemove}
                  />
                ))}
                {filteredNotifications.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-muted-foreground"
                  >
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
              Notification Settings
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};