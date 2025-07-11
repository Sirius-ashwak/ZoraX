import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  ExternalLink, 
  Share2, 
  UserPlus, 
  Star,
  Edit3,
  Globe,
  MessageCircle,
  Users,
  GitBranch
} from 'lucide-react';

interface CreatorIdentityData {
  ensName?: string;
  address: string;
  displayName: string;
  bio: string;
  avatar: string;
  coverImage: string;
  reputationScore: number;
  isVerified: boolean;
  followers: number;
  following: number;
  socialLinks: {
    farcaster?: string;
    lens?: string;
    github?: string;
    mirror?: string;
    website?: string;
  };
}

interface CreatorIdentityPanelProps {
  data: CreatorIdentityData;
  isOwner?: boolean;
  onFollow?: () => void;
  onEdit?: () => void;
  className?: string;
}

const SocialLinkIcon: React.FC<{ platform: string; url: string }> = ({ platform, url }) => {
  const getIcon = () => {
    switch (platform) {
      case 'farcaster': return MessageCircle;
      case 'lens': return Users;
      case 'github': return GitBranch;
      case 'mirror': return Edit3;
      case 'website': return Globe;
      default: return ExternalLink;
    }
  };

  const Icon = getIcon();

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 bg-secondary/30 hover:bg-accent/20 rounded-lg transition-colors group"
    >
      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
    </motion.a>
  );
};

const ReputationStars: React.FC<{ score: number }> = ({ score }) => {
  const stars = Math.floor((score / 1000) * 5);
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <Star 
            className={`w-4 h-4 ${
              i < stars 
                ? 'text-yellow-400 fill-current' 
                : 'text-muted-foreground'
            }`}
          />
        </motion.div>
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {score}/1000
      </span>
    </div>
  );
};

export const CreatorIdentityPanel: React.FC<CreatorIdentityPanelProps> = ({
  data,
  isOwner = false,
  onFollow,
  onEdit,
  className
}) => {
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(data.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow?.();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.displayName} on ZoraX`,
          text: `Check out ${data.displayName}'s creator profile on ZoraX`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Cover Image with Cosmic Background */}
      <div className="relative h-48 lg:h-64">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-cyan-900/50"
          style={{
            backgroundImage: data.coverImage ? `url(${data.coverImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Cosmic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Profile Content */}
      <div className="relative -mt-20 z-10 px-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-4 lg:mb-0">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-background bg-secondary/30 overflow-hidden mx-auto lg:mx-0">
                {data.avatar ? (
                  <img 
                    src={data.avatar} 
                    alt={data.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-semibold">
                    {data.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {data.isVerified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-background"
                >
                  <Star className="w-4 h-4 text-white fill-current" />
                </motion.div>
              )}
            </motion.div>

            {/* Name and Address */}
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl lg:text-3xl font-bold mb-2"
              >
                {data.displayName}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-2"
              >
                <span className="text-muted-foreground font-mono text-sm">
                  {data.ensName || `${data.address.slice(0, 6)}...${data.address.slice(-4)}`}
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="p-1 hover:bg-secondary/50 rounded transition-colors"
                  title="Copy address"
                >
                  <Copy className="w-3 h-3 text-muted-foreground" />
                </button>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-xs text-green-400"
                  >
                    Copied!
                  </motion.span>
                )}
              </motion.div>

              {/* Reputation Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <ReputationStars score={data.reputationScore} />
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {isOwner ? (
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isFollowing
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-accent/10 hover:bg-accent/20 text-accent'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
            
            <button
              onClick={handleShare}
              className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
              title="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Bio and Stats */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bio */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-muted-foreground mb-4"
            >
              {data.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              {Object.entries(data.socialLinks).map(([platform, url]) => 
                url ? (
                  <SocialLinkIcon key={platform} platform={platform} url={url} />
                ) : null
              )}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex gap-6 lg:gap-8"
          >
            <div className="text-center">
              <div className="text-xl font-semibold">{data.followers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{data.following.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};