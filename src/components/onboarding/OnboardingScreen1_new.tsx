import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Users, Star, Sparkles, Crown } from 'lucide-react';

interface OnboardingScreen1Props {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
  isTransitioning: boolean;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = () => {
  return (
    <div className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-16"
        >
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] rounded-2xl flex items-center justify-center shadow-2xl">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-[#6366f1]/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full border border-[#8b5cf6]/10"
              />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-light text-[#f5f5f5] tracking-tight leading-tight"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent font-medium">
              CredVault
            </span>
          </motion.h1>

          {/* Value Proposition */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl sm:text-2xl text-[#a0a0a0] leading-relaxed font-light max-w-4xl mx-auto"
          >
            Transform your creativity into supporter communities. Launch campaigns, build your reputation, and reward your most loyal fans.
          </motion.p>

          {/* Feature Icons Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-[#1a1b23]/50 border border-[#333]/50 hover:border-[#6366f1]/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-[#f5f5f5] mb-1">Instant Launch</h3>
                <p className="text-sm text-[#888]">Deploy campaigns in minutes</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-[#1a1b23]/50 border border-[#333]/50 hover:border-[#8b5cf6]/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-[#f5f5f5] mb-1">Secure</h3>
                <p className="text-sm text-[#888]">Blockchain-powered trust</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-[#1a1b23]/50 border border-[#333]/50 hover:border-[#06b6d4]/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-[#f5f5f5] mb-1">Community</h3>
                <p className="text-sm text-[#888]">Build lasting relationships</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-[#1a1b23]/50 border border-[#333]/50 hover:border-[#f59e0b]/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#f59e0b] to-[#ef4444] rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-[#f5f5f5] mb-1">Reputation</h3>
                <p className="text-sm text-[#888]">Build your ZoraCred profile</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-[#1a1b23]/50 border border-[#333]/50 hover:border-[#10b981]/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-[#f5f5f5] mb-1">Rewards</h3>
                <p className="text-sm text-[#888]">NFT-powered benefits</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-[#1a1b23]/50 border border-[#333]/50 hover:border-[#8b5cf6]/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#d946ef] rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-[#f5f5f5] mb-1">Monetize</h3>
                <p className="text-sm text-[#888]">Turn passion into profit</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-96 h-96 bg-gradient-to-r from-[#6366f1]/10 via-[#8b5cf6]/10 to-[#06b6d4]/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="text-center space-y-4"
          >
            <p className="text-lg text-[#888] max-w-2xl mx-auto">
              Join thousands of creators who are already building sustainable businesses and meaningful communities on CredVault.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-[#666]">
              <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
              <span>Ready to get started? Let's show you how it works</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
