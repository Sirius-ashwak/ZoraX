import { motion } from 'framer-motion';

export function FloatingOrbs() {
  const orbs = [
    { size: 'w-64 h-64', position: 'top-10 -left-32', color: 'bg-purple-500/20', delay: 0 },
    { size: 'w-96 h-96', position: 'top-1/2 -right-48', color: 'bg-cyan-500/20', delay: 2 },
    { size: 'w-80 h-80', position: 'bottom-20 -left-40', color: 'bg-pink-500/20', delay: 4 },
    { size: 'w-72 h-72', position: 'bottom-1/3 right-20', color: 'bg-blue-500/20', delay: 1 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`${orb.size} ${orb.position} ${orb.color} rounded-full blur-3xl absolute`}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20 + orb.delay * 2,
            repeat: Infinity,
            ease: "linear",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}