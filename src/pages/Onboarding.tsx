import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Users, Sparkles, ArrowRight, ArrowLeft, Rocket } from 'lucide-react';
import { onboardingUtils } from '../utils/onboarding';

const steps = [0, 1, 2];

export const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  const handleComplete = () => {
    onboardingUtils.markOnboardingCompleted();
    onComplete();
  };
  const handleSkip = handleComplete;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bg-primary via-purple-900 to-bg-secondary px-4 py-8 relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      <div className="relative z-10 w-full max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key={0} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to Zorax</h1>
                <p className="text-lg text-gray-300 max-w-md">Empowering creators and supporters to build onchain reputation and launch NFT campaigns.</p>
              </div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="mt-8">
                <Sparkles className="w-8 h-8 text-accent" />
              </motion.div>
              <button onClick={handleNext} className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 rounded-lg shadow-glow transition-all duration-200">Get Started <ArrowRight className="inline ml-2 w-5 h-5" /></button>
              <button onClick={handleSkip} className="mt-2 text-sm text-gray-400 hover:text-accent underline">Skip onboarding</button>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key={1} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex-1 flex flex-col items-center bg-bg-secondary/80 rounded-xl p-6 shadow-cosmic mb-6 md:mb-0">
                <Users className="w-10 h-10 text-accent mb-2" />
                <h2 className="text-2xl font-bold text-white mb-2">For Creators</h2>
                <p className="text-gray-300 mb-2">Launch NFT-based campaigns, grow your onchain reputation, and engage your community.</p>
                <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold mt-2">Reputation Profile</span>
              </div>
              <div className="flex-1 flex flex-col items-center bg-bg-secondary/80 rounded-xl p-6 shadow-cosmic">
                <Sparkles className="w-10 h-10 text-accent mb-2" />
                <h2 className="text-2xl font-bold text-white mb-2">For Supporters</h2>
                <p className="text-gray-300 mb-2">Mint supporter NFTs, unlock exclusive perks, and help creators succeed onchain.</p>
                <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold mt-2">Supporter Pass</span>
              </div>
              <div className="flex justify-between w-full mt-8">
                <button onClick={handlePrev} className="text-accent hover:text-accent-hover font-medium flex items-center"><ArrowLeft className="w-5 h-5 mr-1" /> Back</button>
                <button onClick={handleNext} className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 rounded-lg shadow-glow transition-all duration-200">Next <ArrowRight className="inline ml-2 w-5 h-5" /></button>
              </div>
              <button onClick={handleSkip} className="mt-2 text-sm text-gray-400 hover:text-accent underline">Skip onboarding</button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key={2} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center space-y-8">
              <Rocket className="w-16 h-16 text-accent mb-4 animate-bounce" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to launch your first campaign?</h2>
              <p className="text-lg text-gray-300 max-w-md">Start your journey as a creator or supporter. Build your onchain reputation and join the Zorax community.</p>
              <button onClick={handleComplete} className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 rounded-lg shadow-glow transition-all duration-200">Launch Campaign</button>
              <button onClick={handlePrev} className="mt-2 text-sm text-gray-400 hover:text-accent underline">Back</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}; 