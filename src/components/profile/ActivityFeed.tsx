import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  MessageCircle, 
  GitBranch, 
  TrendingUp,
  Music,
  Image,
  Video,
  FileText,
  ExternalLink,
  Calendar,
  Filter
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'mint' | 'comment' | 'remix' | 'campaign_launch' | 'milestone' | 'social_post';
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    campaignId?: string;
    campaignTitle?: string;
    amount?: number;
    platform?: string;
    url?: string;
    mediaType?: string;
  };
  isPublic: boolean;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  showAll?: boolean;
  className?: string;
}

// Mock activity data
const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'mint',
    title: 'Campaign Milestone Reached',
    description: 'Cosmic Art Collection reached 75% completion with 5.4 ETH raised',
    timestamp: '2024-02-10T14:30:00Z',
    metadata: {
      campaignId: '1',
      campaignTitle: 'Cosmic Art Collection',
      amount: 5.4
    },
    isPublic: true
  },
  {
    id: '2',
    type: 'social_post',
    title: 'Posted new gated audio',
    description: 'Shared exclusive track preview for supporters on Farcaster',
    timestamp: '2024-02-09T18:45:00Z',
    metadata: {
      platform: 'Farcaster',
      mediaType: 'audio',
      url: 'https://warpcast.com/example'
    },
    isPublic: true
  },
  {
    id: '3',
    type: 'remix',
    title: 'Remix Activity',
    description: 'Created a remix of jane.eth\'s "Stellar Dreams" campaign',
    timestamp: '2024-02-08T12:15:00Z',
    metadata: {
      campaignId: '2',
      campaignTitle: 'Stellar Dreams'
    },
    isPublic: true
  },
  {
    id: '4',
    type: 'comment',
    title: 'Community Engagement',
    description: 'Commented on community discussion about Web3 creator tools',
    timestamp: '2024-02-07T16:20:00Z',
    metadata: {
      platform: 'Farcaster',
      url: 'https://warpcast.com/example/discussion'
    },
    isPublic: true
  },
  {
    id: '5',
    type: 'campaign_launch',
    title: 'New Campaign Launched',
    description: 'Launched "Nebula Dreams" - an interactive visual experience',
    timestamp: '2024-02-06T10:00:00Z',
    metadata: {
      campaignId: '3',
      campaignTitle: 'Nebula Dreams'
    },
    isPublic: true
  },
  {
    id: '6',
    type: 'milestone',
    title: 'Supporter Milestone',
    description: 'Reached 1,000 total supporters across all campaigns',
    timestamp: '2024-02-05T08:30:00Z',
    isPublic: true
  }
];

const ActivityIcon: React.FC<{ type: ActivityItem['type']; metadata?: ActivityItem['metadata'] }> = ({ 
  type, 
  metadata 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'mint':
        return Zap;
      case 'comment':
        return MessageCircle;
      case 'remix':
        return GitBranch;
      case 'campaign_launch':
        return TrendingUp;
      case 'milestone':
        return Calendar;
      case 'social_post':
        if (metadata?.mediaType === 'audio') return Music;
        if (metadata?.mediaType === 'video') return Video;
        if (metadata?.mediaType === 'image') return Image;
        return FileText;
      default:
        return FileText;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'mint':
        return 'text-green-400 bg-green-400/10';
      case 'comment':
        return 'text-blue-400 bg-blue-400/10';
      case 'remix':
        return 'text-purple-400 bg-purple-400/10';
      case 'campaign_launch':
        return 'text-accent bg-accent/10';
      case 'milestone':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'social_post':
        return 'text-cyan-400 bg-cyan-400/10';
      default:
        return 'text-muted-foreground bg-secondary/10';
    }
  };

  const Icon = getIcon();
  const colorClass = getColor();

  return (
    <div className={`p-2 rounded-lg ${colorClass}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
};

const ActivityItem: React.FC<{ 
  activity: ActivityItem; 
  index: number;
  onClick: (activity: ActivityItem) => void;
}> = ({ activity, index, onClick }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => onClick(activity)}
      className="flex items-start gap-3 p-4 hover:bg-secondary/20 rounded-lg transition-colors cursor-pointer group"
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        <ActivityIcon type={activity.type} metadata={activity.metadata} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-medium text-sm group-hover:text-accent transition-colors">
            {activity.title}
          </h4>
          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
            {formatTimestamp(activity.timestamp)}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {activity.description}
        </p>

        {/* Metadata */}
        {activity.metadata && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {activity.metadata.campaignTitle && (
              <span className="px-2 py-1 bg-accent/10 text-accent rounded-md">
                {activity.metadata.campaignTitle}
              </span>
            )}
            {activity.metadata.amount && (
              <span className="px-2 py-1 bg-green-400/10 text-green-400 rounded-md">
                {activity.metadata.amount} ETH
              </span>
            )}
            {activity.metadata.platform && (
              <span className="px-2 py-1 bg-blue-400/10 text-blue-400 rounded-md">
                {activity.metadata.platform}
              </span>
            )}
            {activity.metadata.url && (
              <button className="p-1 hover:bg-secondary/50 rounded transition-colors">
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities = mockActivities,
  showAll = false,
  className
}) => {
  const [filter, setFilter] = useState<'all' | ActivityItem['type']>('all');
  const [viewAll, setViewAll] = useState(showAll);

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  );

  const displayedActivities = viewAll 
    ? filteredActivities 
    : filteredActivities.slice(0, 6);

  const handleActivityClick = (activity: ActivityItem) => {
    console.log('Activity clicked:', activity.id);
    // In a real app, navigate to related content or show details
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Activity Feed</h2>
          <p className="text-muted-foreground">
            Timeline of onchain actions and public updates
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="all">All Activity</option>
            <option value="mint">Mints</option>
            <option value="comment">Comments</option>
            <option value="remix">Remixes</option>
            <option value="campaign_launch">Campaigns</option>
            <option value="milestone">Milestones</option>
            <option value="social_post">Social Posts</option>
          </select>

          {activities.length > 6 && (
            <button
              onClick={() => setViewAll(!viewAll)}
              className="text-accent hover:text-accent/80 text-sm font-medium"
            >
              {viewAll ? 'Show Less' : 'View All'}
            </button>
          )}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="pica-card">
        <div className="p-6">
          <div className="space-y-1">
            <AnimatePresence>
              {displayedActivities.map((activity, index) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  index={index}
                  onClick={handleActivityClick}
                />
              ))}
            </AnimatePresence>
          </div>

          {displayedActivities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-muted-foreground"
            >
              No activities found matching your criteria.
            </motion.div>
          )}
        </div>

        {/* Load More */}
        {!viewAll && filteredActivities.length > 6 && (
          <div className="border-t border-border p-4 text-center">
            <button
              onClick={() => setViewAll(true)}
              className="text-accent hover:text-accent/80 text-sm font-medium"
            >
              Load More Activity ({filteredActivities.length - 6} more)
            </button>
          </div>
        )}
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pica-card p-4 text-center">
          <div className="text-lg font-semibold text-green-400">
            {activities.filter(a => a.type === 'mint').length}
          </div>
          <div className="text-sm text-muted-foreground">Mints</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-lg font-semibold text-purple-400">
            {activities.filter(a => a.type === 'remix').length}
          </div>
          <div className="text-sm text-muted-foreground">Remixes</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-lg font-semibold text-accent">
            {activities.filter(a => a.type === 'campaign_launch').length}
          </div>
          <div className="text-sm text-muted-foreground">Campaigns</div>
        </div>
        <div className="pica-card p-4 text-center">
          <div className="text-lg font-semibold text-blue-400">
            {activities.filter(a => a.type === 'social_post').length}
          </div>
          <div className="text-sm text-muted-foreground">Posts</div>
        </div>
      </div>
    </div>
  );
};