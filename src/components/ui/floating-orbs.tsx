import { motion } from 'framer-motion';

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large purple orb */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        initial={{ x: -200, y: -200 }}
        animate={{
          x: [-200, 100, -200],
          y: [-200, 200, -200],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Medium cyan orb */}
      <motion.div
        className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl right-0"
        initial={{ x: 200, y: 200 }}
        animate={{
          x: [200, -100, 200],
          y: [200, -100, 200],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Small pink orb */}
      <motion.div
        className="absolute w-48 h-48 bg-pink-500/15 rounded-full blur-2xl bottom-0 left-1/2"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [-50, 50, -50],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Tiny floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 bg-white/10 rounded-full blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}