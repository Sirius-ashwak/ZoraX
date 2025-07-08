import React from 'react';

interface SimpleOnboardingProps {
  onComplete: () => void;
}

export const SimpleOnboarding: React.FC<SimpleOnboardingProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-50 bg-purple-900 text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">🚀 Welcome to CredVault!</h1>
        <p className="text-xl mb-8">This is a simplified onboarding test</p>
        <button 
          onClick={onComplete}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
