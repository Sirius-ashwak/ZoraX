import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero } from '../components/onboarding/Hero';
import { NarrativeSection } from '../components/onboarding/NarrativeSection';
import { FeatureGrid } from '../components/onboarding/FeatureGrid';
import { FinalCTA } from '../components/onboarding/FinalCTA';
import { GlowOrb } from '../components/onboarding/GlowOrb';
import { ScrollManager } from '../components/onboarding/ScrollManager';

type Page = 'home' | 'explore' | 'dashboard' | 'creators';

interface LandingPageProps {
  onGetStarted?: () => void;
  onNavigate?: (page: Page) => void;
}

export const LandingPage = ({ onGetStarted, onNavigate }: LandingPageProps) => {
  const { scrollYProgress } = useScroll();
  const [currentSection, setCurrentSection] = useState(0);

  // Smooth parallax background movement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Narrative sections data
  const narrativeSections = [
    {
      id: 'launch',
      title: 'Launch with Supporters',
      content: 'Turn fans into early believers with NFT-powered campaigns.',
      index: 0
    },
    {
      id: 'credibility',
      title: 'Earn Onchain Credibility',
      content: 'Every success adds to your evolving CredVault profile.',
      index: 1
    },
    {
      id: 'fans',
      title: 'Backed by Real Fans',
      content: 'Let your most loyal supporters earn perks and participate.',
      index: 2
    },
    {
      id: 'onchain',
      title: 'Fully Onchain',
      content: 'CredVault uses Zora CoinV4, Farcaster Frames, and Optimism L2.',
      index: 3
    },
    {
      id: 'ownership',
      title: 'Own Your Journey',
      content: 'Your audience, your data, your value. No middlemen.',
      index: 4
    },
    {
      id: 'start',
      title: 'Get Started',
      content: 'Launch your first campaign',
      index: 5
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionHeight = windowHeight;
      
      // Calculate current section based on scroll position
      // Hero = 0, Narrative sections = 1-6, Feature grid = 7, Final CTA = 8
      const section = Math.floor((scrollPosition + windowHeight / 2) / sectionHeight);
      setCurrentSection(Math.max(0, Math.min(8, section)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary overflow-hidden">
      {/* Animated background with cosmic glow */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          y: backgroundY,
          opacity: backgroundOpacity,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-purple-900/20" />
        <GlowOrb />
      </motion.div>

      {/* Scroll progress indicator */}
      <ScrollManager currentSection={currentSection} totalSections={9} />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen">
          <Hero onGetStarted={onGetStarted} />
        </section>

        {/* Narrative Sections */}
        {narrativeSections.map((section, index) => (
          <section key={section.id} className="min-h-screen">
            <NarrativeSection
              title={section.title}
              content={section.content}
              index={index}
              isActive={currentSection === index + 1}
              isLast={index === narrativeSections.length - 1}
              onGetStarted={index === narrativeSections.length - 1 ? onGetStarted : undefined}
            />
          </section>
        ))}

        {/* Feature Grid */}
        <section className="min-h-screen">
          <FeatureGrid isActive={currentSection === 7} />
        </section>

        {/* Final CTA */}
        <section className="min-h-screen">
          <FinalCTA 
            isActive={currentSection === 8}
            onGetStarted={onGetStarted}
          />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
