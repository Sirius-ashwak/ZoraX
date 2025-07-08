import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrollManagerProps {
  currentSection: number;
  totalSections: number;
}

export const ScrollManager = ({ currentSection, totalSections }: ScrollManagerProps) => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  
  // Hide scroll indicator when near bottom
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercentage < 0.95);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionIndex: number) => {
    const targetY = window.innerHeight * sectionIndex;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent/20 z-50"
        style={{ opacity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-accent via-purple-400 to-blue-400"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </motion.div>

      {/* Section dots navigator */}
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
        style={{ opacity }}
      >
        {[...Array(totalSections)].map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`relative w-3 h-3 rounded-full border-2 transition-all duration-300 group
                       ${currentSection === index 
                         ? 'border-accent bg-accent shadow-lg shadow-accent/50' 
                         : 'border-accent/30 hover:border-accent/60'
                       }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Tooltip */}
            <motion.div
              className="absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 
                         bg-bg-secondary/90 border border-accent/20 rounded-lg text-xs text-text-primary
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap
                         backdrop-blur-sm"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              {getSectionName(index)}
            </motion.div>

            {/* Active indicator glow */}
            {currentSection === index && (
              <motion.div
                className="absolute inset-0 rounded-full bg-accent"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Mobile section indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 lg:hidden
                   flex items-center gap-2 px-4 py-2 bg-bg-secondary/80 border border-accent/20 
                   rounded-full backdrop-blur-sm"
        style={{ opacity }}
      >
        <div className="flex gap-1">
          {[...Array(totalSections)].map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300
                         ${currentSection === index ? 'bg-accent' : 'bg-accent/30'}`}
              animate={currentSection === index ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </div>
        <span className="text-xs text-text-secondary ml-2">
          {currentSection + 1} / {totalSections}
        </span>
      </motion.div>

      {/* Scroll hint (only on first section) */}
      {currentSection === 0 && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 lg:bottom-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-text-secondary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-sm font-medium">Scroll to continue</span>
            <div className="w-px h-8 bg-gradient-to-b from-accent via-accent/50 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

function getSectionName(index: number): string {
  const sections = [
    'Hero',
    'Launch with Supporters', 
    'Earn Credibility',
    'Backed by Fans',
    'Fully Onchain',
    'Own Your Journey',
    'Get Started',
    'Features',
    'Connect Wallet'
  ];
  return sections[index] || `Section ${index + 1}`;
}
