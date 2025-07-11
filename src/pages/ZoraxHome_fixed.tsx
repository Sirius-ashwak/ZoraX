import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Play, Zap, Users, TrendingUp, Rocket, Target, Award, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const ZoraxHome: React.FC = () => {
  const { isConnected } = useAccount();
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Status badges */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-6 mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
              Built with Firebase 🔥
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              On Optimism
            </div>
            {isConnected && (
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Wallet Connected
              </div>
            )}
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Build creator economies.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Fast.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Connect creators to supporters with transparent NFT campaigns, ZoraCred reputation scoring, 
            and Farcaster Frame integration for viral social sharing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            {isConnected ? (
              <Link 
                href="/modern-dashboard" 
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg min-w-[200px] text-center flex items-center justify-center gap-2 group"
              >
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <ConnectButton />
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="border border-border px-8 py-4 rounded-lg hover:bg-muted/50 transition-colors text-lg min-w-[200px] flex items-center justify-center gap-2 group"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  See How It Works
                </button>
              </div>
            )}
          </motion.div>

          {/* Live preview code block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 text-left overflow-x-auto">
              <div className="text-sm text-gray-400 mb-4">Quick start with ZoraX SDK:</div>
              <div className="font-mono text-sm">
                <div className="text-gray-500">// Install ZoraX SDK</div>
                <div className="text-green-400">npm install @zorax/sdk</div>
                <div className="mt-4 text-gray-500">// Create a campaign in 3 lines</div>
                <div>
                  <span className="text-purple-400">import</span> <span className="text-yellow-400">{'{'}</span> <span className="text-blue-400">ZoraxClient, createCampaign</span> <span className="text-yellow-400">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@zorax/sdk'</span>{'\n\n'}
                  <span className="text-purple-400">const</span> <span className="text-blue-400">client</span> <span className="text-yellow-400">=</span> <span className="text-purple-400">new</span> <span className="text-blue-400">ZoraxClient</span><span className="text-yellow-400">()</span>{'\n'}
                  <span className="text-purple-400">const</span> <span className="text-blue-400">campaign</span> <span className="text-yellow-400">=</span> <span className="text-purple-400">await</span> <span className="text-blue-400">createCampaign</span><span className="text-yellow-400">({'{'}</span>{'\n'}
                  <span className="ml-4 text-green-400">title</span><span className="text-yellow-400">:</span> <span className="text-green-400">'My NFT Collection'</span><span className="text-yellow-400">,</span>{'\n'}
                  <span className="ml-4 text-green-400">target</span><span className="text-yellow-400">:</span> <span className="text-green-400">'10 ETH'</span><span className="text-yellow-400">,</span>{'\n'}
                  <span className="ml-4 text-green-400">supply</span><span className="text-yellow-400">:</span> <span className="text-orange-400">1000</span>{'\n'}
                  <span className="text-yellow-400">{'})'};</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowOnboarding(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">How ZoraX Works</h2>
              <button
                onClick={() => setShowOnboarding(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-muted-foreground mb-8 text-center">
              Your journey to building a creator economy in 3 simple steps
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
                  <p className="text-muted-foreground">Connect your Web3 wallet to get started. We support MetaMask, WalletConnect, and more.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Create Your Campaign</h3>
                  <p className="text-muted-foreground">Set up your NFT campaign with goals, rewards, and timeline. Our tools make it easy.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Build Your Community</h3>
                  <p className="text-muted-foreground">Share your campaign, build reputation, and create lasting relationships with supporters.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <ConnectButton />
              <button
                onClick={() => setShowOnboarding(false)}
                className="px-6 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Value Proposition Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From campaign creation to community building, ZoraX provides all the tools you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: "Launch Fast",
                description: "Create and deploy NFT campaigns in minutes, not weeks. Our streamlined process gets you to market quickly."
              },
              {
                icon: Award,
                title: "Build Reputation",
                description: "ZoraCred tracks your creator reputation transparently, helping supporters make informed decisions."
              },
              {
                icon: Users,
                title: "Grow Community",
                description: "Engage supporters with exclusive rewards, updates, and direct communication tools."
              },
              {
                icon: TrendingUp,
                title: "Track Performance",
                description: "Real-time analytics show campaign progress, supporter engagement, and revenue growth."
              },
              {
                icon: Target,
                title: "Hit Your Goals",
                description: "Set funding targets and milestones. Our platform helps you stay on track and motivated."
              },
              {
                icon: Zap,
                title: "Viral Sharing",
                description: "Farcaster Frame integration makes your campaigns shareable across social platforms."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to start building?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of creators who are already building sustainable economies with ZoraX.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {isConnected ? (
                <Link
                  href="/modern-dashboard"
                  className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg flex items-center gap-2 group"
                >
                  <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <ConnectButton />
                  <Link
                    href="/campaigns"
                    className="border border-border px-8 py-4 rounded-lg hover:bg-muted/50 transition-colors text-lg flex items-center gap-2 group"
                  >
                    Browse Campaigns
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
