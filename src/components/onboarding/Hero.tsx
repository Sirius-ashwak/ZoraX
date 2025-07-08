import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted?: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Floating sparkles animation */}
        <motion.div
          className="absolute -top-8 left-1/4 text-accent"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>

        <motion.div
          className="absolute -top-4 right-1/3 text-accent/60"
          animate={{
            y: [10, -10, 10],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <span className="block">Think Bigger.</span>
          <span className="block bg-gradient-to-r from-accent via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Build Onchain.
          </span>
          <span className="block">Welcome to CredVault.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          The platform for launching creator campaigns and earning onchain credibility.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onGetStarted || scrollToNext}
          className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white 
                     bg-gradient-to-r from-accent via-purple-600 to-blue-600 rounded-full
                     shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300
                     hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Get Started</span>
          <motion.div
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-purple-600 to-blue-600 
                          opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Ambient glow elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
};
