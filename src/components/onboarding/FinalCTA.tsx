import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Wallet, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useConnect, useAccount } from 'wagmi';

interface FinalCTAProps {
  onGetStarted?: () => void;
}

export const FinalCTA = ({ onGetStarted }: FinalCTAProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });
  const [isHovered, setIsHovered] = useState(false);
  
  const { connect, connectors, isPending } = useConnect();
  const { isConnected } = useAccount();

  const handleConnect = async () => {
    if (isConnected && onGetStarted) {
      onGetStarted();
      return;
    }

    try {
      const connector = connectors.find(c => c.name === 'MetaMask') || connectors[0];
      if (connector) {
        await connect({ connector });
        if (onGetStarted) {
          onGetStarted();
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div 
      ref={ref}
      className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
    >
      {/* Cosmic background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Central cosmic orb */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isInView ? [1, 1.3, 1] : [0.8, 0.8, 0.8],
            rotate: [0, 360],
          }}
          transition={{ 
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
          }}
        >
          <div className="w-96 h-96 bg-gradient-to-r from-accent/30 via-purple-500/30 to-blue-500/30 rounded-full blur-3xl" />
        </motion.div>

        {/* Orbiting particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 8) * (200 + Math.sin(Date.now() * 0.001 + i) * 50),
              y: Math.sin((i * Math.PI * 2) / 8) * (200 + Math.cos(Date.now() * 0.001 + i) * 50),
              rotate: 360,
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Ambient light rays */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
            }}
          >
            <div 
              className="w-px h-96 bg-gradient-to-t from-accent/20 via-accent/40 to-transparent"
              style={{
                transform: 'translateY(-50%)',
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <motion.h2
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 50 
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <span className="block">Start Building</span>
          <span className="block bg-gradient-to-r from-accent via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Onchain
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-16 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 30 
          }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          Connect your wallet and launch your creator economy in minutes.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleConnect}
          disabled={isPending}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative inline-flex items-center gap-4 px-12 py-6 text-xl font-bold text-white 
                     bg-gradient-to-r from-accent via-purple-600 to-blue-600 rounded-full
                     shadow-2xl shadow-accent/40 hover:shadow-accent/60 transition-all duration-500
                     hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            scale: isInView ? 1 : 0.8 
          }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button content */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Wallet className="w-6 h-6" />
            )}
            <span>
              {isPending ? 'Connecting...' : isConnected ? 'Launch Dashboard' : 'Connect Wallet'}
            </span>
            {!isPending && (
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            )}
          </div>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-purple-600 to-blue-600 
                          opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 scale-150" />
          
          {/* Sparkle effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={isHovered ? {
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 mt-16 text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 20 
          }}
          transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Powered by Zora</span>
          </div>
          <div className="w-px h-4 bg-text-secondary/30" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Built on Optimism</span>
          </div>
          <div className="w-px h-4 bg-text-secondary/30" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Farcaster Ready</span>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          className="text-text-secondary/60 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Free to start • No platform fees • Own your data
        </motion.p>
      </div>

      {/* Corner glow effects */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: isInView ? [1, 1.3, 1] : [0.8, 0.8, 0.8],
          opacity: isInView ? [0.3, 0.6, 0.3] : [0, 0, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: isInView ? [1.3, 1, 1.3] : [0.8, 0.8, 0.8],
          opacity: isInView ? [0.2, 0.5, 0.2] : [0, 0, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
};
