// Utility functions to help convert Figma designs to React components

import { designTokens } from './tokens';

// Helper to convert Figma color to Tailwind class
export const figmaColorToTailwind = (figmaColor: string): string => {
  const colorMap: Record<string, string> = {
    '#0ea5e9': 'text-blue-500',
    '#0284c7': 'text-blue-600',
    '#9333ea': 'text-purple-600',
    '#7c3aed': 'text-purple-700',
    '#f9fafb': 'bg-gray-50',
    '#ffffff': 'bg-white',
    '#000000': 'text-black',
    // Add more color mappings based on your Figma design
  };
  
  return colorMap[figmaColor.toLowerCase()] || 'text-gray-900';
};

// Helper to convert Figma spacing to Tailwind
export const figmaSpacingToTailwind = (spacing: number): string => {
  const spacingMap: Record<number, string> = {
    4: 'p-1',
    8: 'p-2',
    12: 'p-3',
    16: 'p-4',
    20: 'p-5',
    24: 'p-6',
    32: 'p-8',
    // Add more spacing mappings
  };
  
  return spacingMap[spacing] || 'p-4';
};

// Helper to convert Figma typography to Tailwind
export const figmaTypographyToTailwind = (
  fontSize: number,
  fontWeight: number
): string => {
  const sizeMap: Record<number, string> = {
    12: 'text-xs',
    14: 'text-sm',
    16: 'text-base',
    18: 'text-lg',
    20: 'text-xl',
    24: 'text-2xl',
    32: 'text-3xl',
  };
  
  const weightMap: Record<number, string> = {
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
  };
  
  const sizeClass = sizeMap[fontSize] || 'text-base';
  const weightClass = weightMap[fontWeight] || 'font-normal';
  
  return `${sizeClass} ${weightClass}`;
};

// Template for creating a new screen component
export const createScreenTemplate = (screenName: string): string => {
  return `import React from 'react';
import { designTokens } from '../design/tokens';

interface ${screenName}Props {
  // Add props based on Figma design
}

export const ${screenName}: React.FC<${screenName}Props> = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">${screenName}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add your Figma design components here */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Implement your Figma design here
          </p>
        </div>
      </main>
    </div>
  );
};`;
};

// Common Figma component patterns
export const figmaComponents = {
  // Button component matching Figma designs
  Button: `
    <button className="
      bg-gradient-to-r from-purple-600 to-blue-600 
      hover:from-purple-700 hover:to-blue-700 
      text-white font-semibold py-3 px-6 rounded-lg 
      transition-all duration-200 transform hover:scale-105
      shadow-lg hover:shadow-xl
    ">
      Button Text
    </button>
  `,
  
  // Card component
  Card: `
    <div className="
      bg-white rounded-xl shadow-sm border border-gray-200 
      overflow-hidden hover:shadow-lg transition-all duration-200
      p-6
    ">
      Card Content
    </div>
  `,
  
  // Input field
  Input: `
    <input className="
      w-full px-4 py-3 border border-gray-300 rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-purple-500 
      transition-colors
    " />
  `,
  
  // Modal/Dialog
  Modal: `
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
          Modal Content
        </div>
      </div>
    </div>
  `,
};
