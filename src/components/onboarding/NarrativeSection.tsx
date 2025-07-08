import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Rocket, Shield, Users, Link, Crown, Sparkles } from 'lucide-react';

interface NarrativeSectionProps {
  title: string;
  content: string;
  index: number;
  isActive: boolean;
  isLast?: boolean;
  onGetStarted?: () => void;
}

const sectionIcons = [
  Rocket,     // Launch with Supporters
  Shield,     // Earn Onchain Credibility 
  Users,      // Backed by Real Fans
  Link,       // Fully Onchain
  Crown,      // Own Your Journey
  Sparkles    // Get Started
];

export const NarrativeSection = ({ 
  title, 
  content, 
  index, 
  isActive, 
  isLast, 
  onGetStarted 
}: NarrativeSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });
  const IconComponent = sectionIcons[index] || Sparkles;

  // Trigger haptic feedback on mobile when section becomes active
  useEffect(() => {
    if (isActive && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [isActive]);

  const handleCTAClick = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Scroll to next section
      window.scrollTo({
        top: window.innerHeight * (index + 2),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      ref={ref}
      className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
    >
      {/* Background particles */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 2 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Light beam effect */}
      <motion.div
        className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent transform -translate-x-1/2"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: isInView ? 1 : 0, 
          opacity: isInView ? 1 : 0 
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: isInView ? 1 : 0, 
            rotate: isInView ? 0 : -180 
          }}
          transition={{ 
            duration: 1, 
            ease: 'easeOut',
            delay: 0.2 
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl scale-150" />
            <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/20 to-purple-600/20 rounded-full border border-accent/30">
              <IconComponent className="w-10 h-10 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 50 
          }}
          transition={{ 
            duration: 1, 
            ease: 'easeOut',
            delay: 0.4 
          }}
        >
          {title}
        </motion.h2>

        {/* Content */}
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 30 
          }}
          transition={{ 
            duration: 1, 
            ease: 'easeOut',
            delay: 0.6 
          }}
        >
          {content}
        </motion.p>

        {/* CTA Button for last section */}
        {isLast && (
          <motion.button
            onClick={handleCTAClick}
            className="group relative inline-flex items-center gap-3 px-10 py-5 text-xl font-semibold text-white 
                       bg-gradient-to-r from-accent via-purple-600 to-blue-600 rounded-full
                       shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-500
                       hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isInView ? 1 : 0, 
              scale: isInView ? 1 : 0.8 
            }}
            transition={{ 
              duration: 1, 
              ease: 'easeOut',
              delay: 0.8 
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Launch Your First Campaign</span>
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Rocket className="w-5 h-5" />
            </motion.div>
            
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-purple-600 to-blue-600 
                            opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 scale-150" />
          </motion.button>
        )}

        {/* Progress indicator for non-last sections */}
        {!isLast && (
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="flex items-center gap-2 text-text-secondary">
              <div className="w-8 h-px bg-accent" />
              <span className="text-sm font-medium">{String(index + 1).padStart(2, '0')}</span>
              <div className="w-8 h-px bg-accent/30" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Side glow effects */}
      <motion.div
        className="absolute left-0 top-1/2 w-32 h-64 bg-accent/10 rounded-full blur-3xl transform -translate-y-1/2"
        animate={{
          scale: isInView ? [1, 1.2, 1] : [0.8, 0.8, 0.8],
          opacity: isInView ? [0.3, 0.6, 0.3] : [0, 0, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: index * 0.5 
        }}
      />
      
      <motion.div
        className="absolute right-0 top-1/2 w-24 h-48 bg-purple-500/10 rounded-full blur-3xl transform -translate-y-1/2"
        animate={{
          scale: isInView ? [1.2, 1, 1.2] : [0.8, 0.8, 0.8],
          opacity: isInView ? [0.2, 0.5, 0.2] : [0, 0, 0],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: (index * 0.5) + 2 
        }}
      />
    </div>
  );
};
