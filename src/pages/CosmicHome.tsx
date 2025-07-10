import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Star, 
  TrendingUp, 
  Users, 
  Sparkles, 
  ArrowRight,
  Shield,
  Rocket,
  Heart,
  Crown
} from 'lucide-react';
import { useAccount } from 'wagmi';

const HeroSection = () => {
  const { isConnected } = useAccount();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
          >
            <Star className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="heading-cosmic text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Launch Your
            <br />
            <span className="text-accent">Cosmic Movement</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Zorax is the most elegant way for Web3 creators to build reputation, launch NFT campaigns, and connect with superfans — all in a cosmic, minimal, high-end environment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link
            to={isConnected ? "/create" : "/hub"}
            className="glass-button text-lg px-8 py-4 flex items-center gap-3 glow-effect"
          >
            <Rocket className="w-5 h-5" />
            {isConnected ? "Create Campaign" : "Enter the Cosmos"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link
            to="/explore"
            className="glass-button-secondary text-lg px-8 py-4 flex items-center gap-3"
          >
            <Star className="w-5 h-5" />
            Explore Creators
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
        >
          {[
            { icon: Users, label: "Creators", value: "1.2K+" },
            { icon: TrendingUp, label: "Campaigns", value: "3.5K+" },
            { icon: Zap, label: "ETH Raised", value: "125+" },
            { icon: Crown, label: "Reputation", value: "Elite" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "ZoraCred Reputation",
      description: "Build trust through transparent, on-chain reputation scoring that rewards authentic engagement and successful campaigns.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Sparkles,
      title: "Cosmic Campaigns",
      description: "Launch beautiful NFT campaigns with glassmorphism UI, smart contracts, and built-in analytics.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Superfan Connection",
      description: "Connect with your most loyal supporters through tiered perks, exclusive access, and community building.",
      gradient: "from-pink-500 to-red-500"
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-cosmic text-4xl md:text-5xl font-bold mb-6">
            Why Creators Choose Zorax
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of creator economy with our cutting-edge platform designed for the next generation of Web3 creators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="floating-card text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const { isConnected } = useAccount();

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 glow-effect"
        >
          <h2 className="heading-cosmic text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Cosmic Empire?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already building their reputation and launching successful campaigns on Zorax.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isConnected ? "/create" : "/hub"}
              className="glass-button text-lg px-8 py-4 flex items-center gap-3 justify-center glow-effect"
            >
              <Rocket className="w-5 h-5" />
              {isConnected ? "Launch Campaign" : "Get Started"}
            </Link>
            
            <Link
              to="/explore"
              className="glass-button-secondary text-lg px-8 py-4 flex items-center gap-3 justify-center"
            >
              <Star className="w-5 h-5" />
              Explore Platform
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const CosmicHome: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};