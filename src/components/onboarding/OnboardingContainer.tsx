import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { OnboardingScreen1 } from './OnboardingScreen1';
import { OnboardingScreen2 } from './OnboardingScreen2';
import { OnboardingScreen3 } from './OnboardingScreen3';

interface OnboardingContainerProps {
  onComplete: () => void;
}

type OnboardingStep = 1 | 2 | 3;

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Navigation functions
  const nextStep = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentStep(prev => Math.min(3, prev + 1) as OnboardingStep);
      setIsTransitioning(false);
    }, 150);
  }, [isTransitioning]);

  const previousStep = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentStep(prev => Math.max(1, prev - 1) as OnboardingStep);
      setIsTransitioning(false);
    }, 150);
  }, [isTransitioning]);

  const goToStep = useCallback((step: OnboardingStep) => {
    if (isTransitioning || step === currentStep) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
    }, 150);
  }, [isTransitioning, currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTransitioning) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (currentStep > 1) previousStep();
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (currentStep < 3) nextStep();
          break;
        case 'Escape':
          event.preventDefault();
          onComplete();
          break;
        case '1':
        case '2':
        case '3':
          event.preventDefault();
          goToStep(parseInt(event.key) as OnboardingStep);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isTransitioning, nextStep, previousStep, goToStep, onComplete]);

  // Screen-specific props
  const screenProps = {
    onNext: nextStep,
    onPrevious: previousStep,
    onSkip: onComplete,
    onComplete,
    isTransitioning,
  };

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingScreen1 {...screenProps} />;
      case 2:
        return <OnboardingScreen2 {...screenProps} />;
      case 3:
        return <OnboardingScreen3 {...screenProps} />;
      default:
        return <OnboardingScreen1 {...screenProps} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0b0d] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1b23] via-[#0a0b0d] to-[#1a1b23]" />
      
      {/* Animated background particles - Performance optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#6366f1] rounded-full opacity-20"
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            style={{
              left: (Math.random() * 90 + 5) + '%',
              top: (Math.random() * 90 + 5) + '%',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* Header with progress and skip */}
      <div className="relative z-10 flex justify-between items-center p-6 sm:p-8">
        {/* Progress indicator */}
        <div className="flex items-center space-x-3">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => goToStep(step as OnboardingStep)}
              disabled={isTransitioning}
              className="group focus:outline-none focus:ring-2 focus:ring-[#6366f1] rounded-full"
              aria-label={`Go to step ${step}`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step === currentStep
                      ? 'bg-[#6366f1] ring-4 ring-[#6366f1]/20'
                      : step < currentStep
                      ? 'bg-[#6366f1] opacity-60'
                      : 'bg-[#333] group-hover:bg-[#444]'
                  }`}
                />
                {step < 3 && (
                  <div
                    className={`w-8 h-0.5 transition-colors duration-300 ${
                      step < currentStep ? 'bg-[#6366f1]/60' : 'bg-[#333]'
                    }`}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          disabled={isTransitioning}
          className="flex items-center space-x-2 text-[#888] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366f1] rounded-lg px-3 py-2 disabled:opacity-50"
          aria-label="Skip onboarding"
        >
          <span className="text-sm font-medium">Skip</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main content area */}
      <div className="relative z-10 h-[calc(100vh-120px)] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 flex flex-col"
          >
            {renderCurrentScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer with navigation */}
      <div className="relative z-10 flex justify-between items-center p-6 sm:p-8">
        {/* Previous button */}
        <button
          onClick={previousStep}
          disabled={currentStep === 1 || isTransitioning}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366f1] ${
            currentStep === 1 || isTransitioning
              ? 'text-[#444] cursor-not-allowed opacity-50'
              : 'text-[#888] hover:text-white hover:bg-[#1a1b23] border border-[#333] hover:border-[#444]'
          }`}
          aria-label="Previous step"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Current step indicator */}
        <div className="text-center">
          <div className="text-sm text-[#666] mb-1">Step {currentStep} of 3</div>
          <div className="text-xs text-[#444]">
            {currentStep === 1 && 'Welcome'}
            {currentStep === 2 && 'For Everyone'}
            {currentStep === 3 && 'Get Started'}
          </div>
        </div>

        {/* Next/Get Started button */}
        {currentStep < 3 ? (
          <button
            onClick={nextStep}
            disabled={isTransitioning}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5855eb] hover:to-[#7c3aed] text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6366f1] disabled:opacity-50 disabled:transform-none"
            aria-label="Next step"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onComplete}
            disabled={isTransitioning}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] hover:from-[#0891b2] hover:to-[#2563eb] text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#06b6d4] disabled:opacity-50 disabled:transform-none"
            aria-label="Get started"
          >
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-[#555] text-center hidden sm:block">
        <div>Use ← → arrow keys to navigate • Press 1-3 for specific steps • ESC to skip</div>
      </div>
    </div>
  );
};
