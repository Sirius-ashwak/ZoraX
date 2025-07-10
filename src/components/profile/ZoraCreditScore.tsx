import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  Users, 
  Zap, 
  DollarSign,
  GitBranch,
  Award,
  Eye,
  ArrowUpRight
} from 'lucide-react';

interface ZoraCreditData {
  score: number;
  totalMints: number;
  totalRevenue: number;
  supporterGrowth: number;
  remixActivity: number;
  level: 'Novice' | 'Apprentice' | 'Expert' | 'Master' | 'Legend';
  rank: number;
  totalCreators: number;
  badges: string[];
}

interface ZoraCreditScoreProps {
  address: string;
  className?: string;
}

// Mock data generator
const generateZoraCreditData = (address: string): ZoraCreditData => {
  const seed = address.slice(-4);
  const seedNum = parseInt(seed, 16);
  
  return {
    score: 750 + (seedNum % 250),
    totalMints: 1200 + (seedNum % 800),
    totalRevenue: 15.3 + (seedNum % 10),
    supporterGrowth: 234,
    remixActivity: 67,
    level: ['Expert', 'Master', 'Legend'][seedNum % 3] as any,
    rank: 42,
    totalCreators: 15234,
    badges: ['Top Creator', 'Verified Artist', '1K Supporters Club', 'Most Remixed']
  };
};

const ScoreArc: React.FC<{ score: number; size: number }> = ({ score, size }) => {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 1000) * 0.8; // 80% of circle for visual appeal
  const strokeDasharray = circumference * progress;
  const strokeDashoffset = circumference - strokeDasharray;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(99, 102, 241, 0.1)"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
          animate={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-3xl font-bold text-accent">{score}</div>
          <div className="text-xs text-muted-foreground">ZoraCred Score</div>
        </motion.div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ 
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: number;
  delay: number;
}> = ({ icon: Icon, label, value, trend, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="pica-card p-4 hover:border-accent/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
          <Icon className="w-4 h-4 text-accent" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${
            trend > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            <ArrowUpRight className={`w-3 h-3 ${trend < 0 ? 'rotate-90' : ''}`} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <motion.div 
          className="text-xl font-semibold mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {typeof value === 'number' && value > 1000 
            ? `${(value / 1000).toFixed(1)}k` 
            : value}
        </motion.div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
};

const BadgeItem: React.FC<{ badge: string; index: number }> = ({ badge, index }) => {
  const badgeIcons = {
    'Top Creator': Award,
    'Verified Artist': Star,
    '1K Supporters Club': Users,
    'Most Remixed': GitBranch
  };

  const BadgeIcon = badgeIcons[badge as keyof typeof badgeIcons] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-full text-sm font-medium"
    >
      <BadgeIcon className="w-4 h-4 text-accent" />
      {badge}
    </motion.div>
  );
};

export const ZoraCreditScore: React.FC<ZoraCreditScoreProps> = ({ 
  address, 
  className 
}) => {
  const [data, setData] = useState<ZoraCreditData | null>(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setData(generateZoraCreditData(address));
    }, 500);

    return () => clearTimeout(timer);
  }, [address]);

  if (!data) {
    return (
      <div className={`space-y-6 animate-pulse ${className}`}>
        <div className="h-48 bg-secondary/30 rounded-lg" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-secondary/30 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pica-card p-8 relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          {/* Score Arc */}
          <div className="flex-shrink-0">
            <ScoreArc score={data.score} size={160} />
          </div>
          
          {/* Score Details */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-semibold mb-2"
            >
              ZoraCred Profile
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground mb-4"
            >
              Your onchain reputation and credibility score in the Zora ecosystem
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Level:</span>
                <span className="font-semibold text-accent">{data.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Rank:</span>
                <span className="font-semibold">#{data.rank} of {data.totalCreators.toLocaleString()}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Impact Metrics */}
      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg font-semibold mb-4"
        >
          Onchain Impact Scorecard
        </motion.h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Zap}
            label="Total Mints"
            value={data.totalMints}
            trend={12}
            delay={0.7}
          />
          <MetricCard
            icon={DollarSign}
            label="Total Revenue"
            value={`${data.totalRevenue.toFixed(1)} ETH`}
            trend={8}
            delay={0.8}
          />
          <MetricCard
            icon={Users}
            label="Supporter Growth"
            value={data.supporterGrowth}
            trend={15}
            delay={0.9}
          />
          <MetricCard
            icon={GitBranch}
            label="Remix Activity"
            value={data.remixActivity}
            trend={-3}
            delay={1.0}
          />
        </div>
      </div>

      {/* Reputation Badges */}
      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-lg font-semibold mb-4"
        >
          Reputation Badges
        </motion.h3>
        
        <div className="flex flex-wrap gap-3">
          {data.badges.map((badge, index) => (
            <BadgeItem key={badge} badge={badge} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};