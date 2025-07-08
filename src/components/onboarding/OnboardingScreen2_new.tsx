import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  TrendingUp, 
  Heart, 
  Users, 
  Zap, 
  Star, 
  Shield, 
  Gift,
  Crown,
  Sparkles,
  ArrowRight,
  Coins
} from 'lucide-react';

interface OnboardingScreen2Props {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
  isTransitioning: boolean;
}

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = () => {
  const creatorFeatures = [
    {
      icon: Rocket,
      title: "Launch Campaigns",
      description: "Deploy NFT supporter passes in minutes with our intuitive campaign builder",
      color: "from-[#6366f1] to-[#8b5cf6]"
    },
    {
      icon: TrendingUp,
      title: "Build Your Reputation",
      description: "Earn ZoraCred points and showcase your track record to attract more supporters",
      color: "from-[#8b5cf6] to-[#d946ef]"
    },
    {
      icon: Coins,
      title: "Monetize Content",
      description: "Create sustainable income streams through direct supporter relationships",
      color: "from-[#10b981] to-[#059669]"
    },
    {
      icon: Users,
      title: "Grow Community",
      description: "Build a loyal fanbase with exclusive perks and direct communication channels",
      color: "from-[#f59e0b] to-[#ef4444]"
    }
  ];

  const supporterFeatures = [
    {
      icon: Heart,
      title: "Support Creators",
      description: "Directly fund creators you love and get exclusive access to their work",
      color: "from-[#06b6d4] to-[#3b82f6]"
    },
    {
      icon: Gift,
      title: "Exclusive Perks",
      description: "Unlock special content, early access, and unique rewards through NFT passes",
      color: "from-[#3b82f6] to-[#1d4ed8]"
    },
    {
      icon: Shield,
      title: "Verified Ownership",
      description: "Your supporter status is permanently recorded on the blockchain",
      color: "from-[#8b5cf6] to-[#6366f1]"
    },
    {
      icon: Sparkles,
      title: "Build Your Profile",
      description: "Showcase your support history and build your own onchain reputation",
      color: "from-[#d946ef] to-[#f97316]"
    }
  ];

  return (
    <div className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-16"
        >
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#f5f5f5] tracking-tight leading-tight">
              Built for{' '}
              <span className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent font-medium">
                Everyone
              </span>
            </h2>
            <p className="text-xl text-[#888] max-w-3xl mx-auto">
              Whether you're creating content or supporting creators, CredVault provides the tools you need to thrive in the creator economy.
            </p>
          </motion.div>

          {/* Split-Screen Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Creator Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
              
              {/* Card Content */}
              <div className="relative bg-[#1a1b23] border border-[#333] rounded-2xl p-8 lg:p-10 h-full">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#f5f5f5]">For Creators</h3>
                    <p className="text-[#888]">Monetize your passion</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  {creatorFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-start space-x-4 p-4 rounded-xl bg-[#0a0b0d]/50 border border-[#333]/50 hover:border-[#6366f1]/30 transition-all duration-200"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#f5f5f5] mb-1">{feature.title}</h4>
                          <p className="text-sm text-[#888] leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="mt-8 pt-6 border-t border-[#333]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#888]">Start creating today</span>
                    <div className="flex items-center space-x-2 text-[#6366f1]">
                      <span className="text-sm font-medium">Launch Campaign</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Supporter Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#06b6d4] rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
              
              {/* Card Content */}
              <div className="relative bg-[#1a1b23] border border-[#333] rounded-2xl p-8 lg:p-10 h-full">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] rounded-2xl flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#f5f5f5]">For Supporters</h3>
                    <p className="text-[#888]">Support what you love</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  {supporterFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="flex items-start space-x-4 p-4 rounded-xl bg-[#0a0b0d]/50 border border-[#333]/50 hover:border-[#06b6d4]/30 transition-all duration-200"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#f5f5f5] mb-1">{feature.title}</h4>
                          <p className="text-sm text-[#888] leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="mt-8 pt-6 border-t border-[#333]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#888]">Discover creators</span>
                    <div className="flex items-center space-x-2 text-[#06b6d4]">
                      <span className="text-sm font-medium">Explore Campaigns</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-[#f5f5f5] mb-3">
                Join the Creator Economy Revolution
              </h3>
              <p className="text-[#888] leading-relaxed">
                Whether you're building or backing, CredVault connects you with a community that values authentic relationships and meaningful support.
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold text-[#6366f1]">500+</div>
                <div className="text-sm text-[#666]">Active Creators</div>
              </div>
              <div className="w-px h-8 bg-[#333]" />
              <div>
                <div className="text-2xl font-bold text-[#06b6d4]">10K+</div>
                <div className="text-sm text-[#666]">Supporters</div>
              </div>
              <div className="w-px h-8 bg-[#333]" />
              <div>
                <div className="text-2xl font-bold text-[#10b981]">$2M+</div>
                <div className="text-sm text-[#666]">Raised</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
