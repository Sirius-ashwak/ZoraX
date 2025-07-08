import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useConnect } from 'wagmi';
import { 
  Wallet, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Star,
  Sparkles,
  Crown,
  Heart
} from 'lucide-react';

interface OnboardingScreen3Props {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
  isTransitioning: boolean;
}

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({
  onComplete
}) => {
  const { isConnected, address } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const [selectedStep, setSelectedStep] = useState<'creator' | 'supporter' | null>(null);

  const handleWalletConnect = (connector: any) => {
    connect({ connector });
  };

  const quickActions = [
    {
      id: 'creator',
      title: 'Start as Creator',
      description: 'Launch your first campaign and start building your community',
      icon: Crown,
      color: 'from-[#6366f1] to-[#8b5cf6]',
      features: [
        'Create your first campaign in 5 minutes',
        'Set up supporter pass tiers and rewards',
        'Build your ZoraCred reputation profile',
        'Connect with your audience directly'
      ]
    },
    {
      id: 'supporter',
      title: 'Start as Supporter',
      description: 'Discover amazing creators and join their communities',
      icon: Heart,
      color: 'from-[#06b6d4] to-[#3b82f6]',
      features: [
        'Browse trending campaigns and creators',
        'Purchase supporter passes and NFTs',
        'Access exclusive content and perks',
        'Build your supporter reputation'
      ]
    }
  ];

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#f5f5f5] tracking-tight leading-tight">
              Ready to{' '}
              <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent font-medium">
                Get Started?
              </span>
            </h2>
            <p className="text-xl text-[#888] max-w-3xl mx-auto">
              Connect your wallet and choose how you want to participate in the CredVault ecosystem.
            </p>
          </motion.div>

          {/* Wallet Connection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            {!isConnected ? (
              <div className="max-w-md mx-auto">
                <div className="bg-[#1a1b23] border border-[#333] rounded-2xl p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl mx-auto mb-6">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#f5f5f5] mb-3">Connect Your Wallet</h3>
                  <p className="text-[#888] mb-6">
                    Connect your wallet to start creating campaigns or supporting creators on CredVault.
                  </p>
                  
                  <div className="space-y-3">
                    {connectors.map((connector) => (
                      <button
                        key={connector.id}
                        onClick={() => handleWalletConnect(connector)}
                        disabled={isPending}
                        className="w-full flex items-center justify-between p-4 bg-[#0a0b0d] border border-[#333] rounded-xl hover:border-[#6366f1]/50 transition-all duration-200 disabled:opacity-50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                            <Wallet className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-[#f5f5f5]">{connector.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#888]" />
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#333]">
                    <div className="flex items-center justify-center space-x-2 text-sm text-[#666]">
                      <Shield className="w-4 h-4" />
                      <span>Secure connection via WalletConnect</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#1a1b23] border border-[#10b981] rounded-2xl p-8"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#f5f5f5] mb-3">Wallet Connected!</h3>
                  <p className="text-[#888] mb-4">
                    Your wallet is connected successfully.
                  </p>
                  <div className="bg-[#0a0b0d] rounded-lg p-3">
                    <div className="text-sm text-[#888] mb-1">Connected Address:</div>
                    <div className="text-[#10b981] font-mono text-sm">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-semibold text-[#f5f5f5]">Choose Your Path</h3>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const isSelected = selectedStep === action.id;
                  
                  return (
                    <motion.div
                      key={action.id}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className={`relative group cursor-pointer ${
                        isSelected ? 'ring-2 ring-[#6366f1]' : ''
                      }`}
                      onClick={() => setSelectedStep(action.id as 'creator' | 'supporter')}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute -inset-2 bg-gradient-to-r ${action.color} rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500`} />
                      
                      {/* Card Content */}
                      <div className="relative bg-[#1a1b23] border border-[#333] rounded-2xl p-8 h-full">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-[#f5f5f5]">{action.title}</h4>
                            <p className="text-[#888] text-sm">{action.description}</p>
                          </div>
                        </div>

                        <ul className="space-y-3">
                          {action.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <CheckCircle className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-[#888]">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 pt-6 border-t border-[#333]">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#666]">Get started now</span>
                            <div className={`flex items-center space-x-2 ${
                              action.id === 'creator' ? 'text-[#6366f1]' : 'text-[#06b6d4]'
                            }`}>
                              <span className="text-sm font-medium">
                                {action.id === 'creator' ? 'Create Campaign' : 'Explore'}
                              </span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[#888] leading-relaxed">
                {isConnected 
                  ? "You're all set! Choose your path above or start exploring CredVault."
                  : "Connect your wallet to unlock the full CredVault experience and join our growing community of creators and supporters."
                }
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isConnected ? (
                <button
                  onClick={onComplete}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5855eb] hover:to-[#7c3aed] text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <span>Enter CredVault</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center space-x-2 text-sm text-[#666]">
                  <Zap className="w-4 h-4" />
                  <span>Connect wallet to continue</span>
                </div>
              )}
              
              <button
                onClick={onComplete}
                className="text-[#888] hover:text-[#f5f5f5] transition-colors duration-200 text-sm underline"
              >
                I'll connect later
              </button>
            </div>

            {/* Features Preview */}
            <div className="flex items-center justify-center space-x-6 pt-8 border-t border-[#333]/50">
              <div className="flex items-center space-x-2 text-[#666] text-sm">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-[#666] text-sm">
                <Users className="w-4 h-4" />
                <span>Community-Driven</span>
              </div>
              <div className="flex items-center space-x-2 text-[#666] text-sm">
                <Star className="w-4 h-4" />
                <span>Reputation-Based</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
