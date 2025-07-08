import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Coins, Brain, Heart, ArrowRight } from 'lucide-react';

interface FeatureGridProps {
  isActive: boolean;
}

const features = [
  {
    icon: Coins,
    title: 'Mint NFT Campaigns',
    description: 'Launch creative campaigns with NFT-powered fundraising. Set goals, define rewards, and let supporters mint their way to exclusive perks.',
    gradient: 'from-yellow-400 to-orange-500',
    glowColor: 'yellow-400/20'
  },
  {
    icon: Brain,
    title: 'Build Reputation (ZoraCred)',
    description: 'Earn onchain credibility through successful campaigns. Your ZoraCred score grows with every milestone, building trust with future supporters.',
    gradient: 'from-purple-400 to-pink-500',
    glowColor: 'purple-400/20'
  },
  {
    icon: Heart,
    title: 'Engage Supporters',
    description: 'Reward your most loyal fans with exclusive access, special perks, and deeper connection to your creative journey.',
    gradient: 'from-blue-400 to-cyan-500',
    glowColor: 'blue-400/20'
  }
];

export const FeatureGrid = ({ isActive }: FeatureGridProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: false });

  return (
    <div 
      ref={ref}
      className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(154, 91, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(154, 91, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 50 
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: isInView ? 1 : 0, 
              y: isInView ? 0 : 30 
            }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            Everything You Need to
            <span className="block bg-gradient-to-r from-accent via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Build Your Economy
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isInView ? 1 : 0, 
              y: isInView ? 0 : 20 
            }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          >
            CredVault provides all the tools creators need to launch, grow, and monetize their supporter communities onchain.
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ 
                  opacity: isInView ? 1 : 0, 
                  y: isInView ? 0 : 50,
                  scale: isInView ? 1 : 0.9
                }}
                transition={{ 
                  duration: 1, 
                  delay: 0.6 + (index * 0.2), 
                  ease: 'easeOut' 
                }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* Card background with glow */}
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 
                               border border-accent/20 backdrop-blur-sm group-hover:border-accent/40 transition-all duration-500">
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-${feature.glowColor} opacity-0 group-hover:opacity-100 
                                  blur-xl transition-opacity duration-500 scale-110`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-20 rounded-xl blur-md scale-110`} />
                        <div className={`relative flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary group-hover:text-text-primary/90 transition-colors duration-300 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Learn more link */}
                    <motion.div
                      className="flex items-center gap-2 text-accent group-hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Floating particles around card */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      x: [-5, 5, -5],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            scale: isInView ? 1 : 0.8 
          }}
          transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-4 text-text-secondary">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <span className="text-sm font-medium">Built for creators, powered by blockchain</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
