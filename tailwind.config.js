/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cosmic background colors
        'bg-primary': '#0a0a1a',
        'bg-secondary': '#101020',
        
        // Text colors
        'text-primary': '#f5f5f5',
        'text-secondary': '#9999aa',
        
        // Accent colors
        'accent': '#9a5bff',
        'accent-hover': '#8b47ff',
        
        // Gradients
        'purple-gradient': 'linear-gradient(135deg, #9a5bff 0%, #7c3aed 100%)',
        'blue-gradient': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'cosmic-gradient': 'linear-gradient(135deg, #9a5bff 0%, #7c3aed 50%, #3b82f6 100%)',
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Satoshi', 'Inter', 'sans-serif'],
      },
      fontSize: {
        '3xl': '3rem',
        'xl': '2rem',
        'md': '1.25rem',
      },
      backdropBlur: {
        'strong': '80px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(154, 91, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(154, 91, 255, 0.4)',
        'cosmic': '0 0 60px rgba(154, 91, 255, 0.2), 0 0 100px rgba(124, 58, 237, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'cosmic-rotate': 'cosmic-rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(154, 91, 255, 0.2)' },
          'to': { boxShadow: '0 0 30px rgba(154, 91, 255, 0.6)' },
        },
        'cosmic-rotate': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
