/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // shadcn color system
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Coinbase theme colors
        'coinbase-blue': '#3e5ce8',
        'coinbase-dark': '#0f0f23',
        'coinbase-card': '#1a1b2e',
        'coinbase-border': '#262840',
        'success': 'hsl(var(--success))',
        'warning': 'hsl(var(--warning))',
        'sidebar': 'hsl(var(--sidebar))',
        'sidebar-hover': 'hsl(var(--sidebar-hover))',
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
