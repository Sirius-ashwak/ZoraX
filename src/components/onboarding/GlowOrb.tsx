import { motion } from 'framer-motion';

export const GlowOrb = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main cosmic orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' }
        }}
      >
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-accent/20 via-purple-500/15 to-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Secondary orbs */}
      <motion.div
        className="absolute left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [0.8, 1.1, 0.8],
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      >
        <div className="w-64 h-64 bg-gradient-to-r from-blue-400/15 to-cyan-400/20 rounded-full blur-2xl" />
      </motion.div>

      <motion.div
        className="absolute right-1/4 bottom-1/4 transform translate-x-1/2 translate-y-1/2"
        animate={{
          scale: [1.1, 0.8, 1.1],
          x: [50, -50, 50],
          y: [30, -30, 30],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4
        }}
      >
        <div className="w-48 h-48 bg-gradient-to-r from-purple-400/15 to-pink-400/20 rounded-full blur-2xl" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Cosmic dust */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-px h-px bg-accent/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Radiating lines */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
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

      {/* Pulsing rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Central glow core */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-32 h-32 bg-gradient-to-r from-accent/40 via-white/20 to-accent/40 rounded-full blur-lg" />
      </motion.div>
    </div>
  );
};
