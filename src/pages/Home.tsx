import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ANIMATION_VARIANTS } from '@/lib/constants';

export function Home() {
  const features = [
    {
      icon: Zap,
      title: 'Launch NFT Campaigns',
      description: 'Create supporter pass NFT campaigns on Optimism via Zora Protocol with just a few clicks.',
      color: 'from-purple-500 to-cyan-500'
    },
    {
      icon: Star,
      title: 'Build ZoraCred Reputation',
      description: 'Grow your onchain identity and reputation with every successful campaign and interaction.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Transparent & Secure',
      description: 'All transactions and reputation data are stored onchain for complete transparency.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Sparkles,
      title: 'Farcaster Integration',
      description: 'Share your campaigns as interactive frames on Farcaster for viral growth.',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const stats = [
    { label: 'Total Campaigns', value: '2,547' },
    { label: 'ETH Raised', value: '1,234.5' },
    { label: 'Active Creators', value: '892' },
    { label: 'NFTs Minted', value: '45.2K' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            {...ANIMATION_VARIANTS.fadeIn}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl mb-8 shadow-2xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1
            {...ANIMATION_VARIANTS.slideUp}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Monetize Your Work.{' '}
            <span className="gradient-text">
              Prove Your Value.
            </span>
          </motion.h1>

          <motion.p
            {...ANIMATION_VARIANTS.slideUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Launch Supporter Pass NFT campaigns on Optimism via Zora. Build your ZoraCred profile 
            and grow your onchain identity with every contribution.
          </motion.p>

          <motion.div
            {...ANIMATION_VARIANTS.slideUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/explore">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Explore Campaigns
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="glass-card border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg"
              >
                Launch Campaign
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...ANIMATION_VARIANTS.slideUp}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...ANIMATION_VARIANTS.slideUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built for creators who want to monetize their work while building lasting relationships with their supporters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                {...ANIMATION_VARIANTS.slideUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card p-6 h-full hover-lift text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...ANIMATION_VARIANTS.slideUp}
            className="glass-card p-12 border border-purple-500/30"
          >
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Launch Your First Campaign?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of creators already building their onchain reputation and monetizing their work on ZoraX.
            </p>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}