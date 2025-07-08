# Onboarding Flow Documentation

## Overview
CredVault features a beautiful, minimalist onboarding experience inspired by Reflect Notes, introducing users to the platform with elegant animations and a dark theme.

## Features

### 🎨 Design System
- **Dark minimalist theme**: Zinc-900 to black gradients
- **Elegant typography**: Light weights with gradient accents
- **Smooth animations**: Framer Motion powered transitions
- **Responsive design**: Mobile-first approach with adaptive layouts

### 📱 Three-Screen Flow

#### Screen 1: Welcome
- Hero introduction to CredVault
- Gradient text highlighting brand name
- Subtle background animations
- Clean call-to-action

#### Screen 2: Dual Benefits
- Split layout showcasing creator and supporter benefits
- Interactive hover effects
- Visual icons representing each user type
- Compelling value propositions

#### Screen 3: Get Started
- Wallet connection integration
- Loading states and success feedback
- Direct path to dashboard
- Fallback for users without wallets

### ♿ Accessibility Features
- **Keyboard navigation**: Arrow keys, space, and escape support
- **Screen reader support**: ARIA labels and semantic markup
- **Focus management**: Proper focus flow and visual indicators
- **Progress indication**: Clear step progression with visual feedback

### 🔧 Technical Implementation

#### State Management
```typescript
// Onboarding completion tracking
const onboardingUtils = {
  hasCompletedOnboarding(): boolean
  markOnboardingCompleted(): void
  resetOnboarding(): void  // Debug utility
}
```

#### Integration Points
- **App.tsx**: Conditional rendering based on completion status
- **LocalStorage**: Persistent onboarding state
- **Wallet Integration**: Seamless connection flow
- **Responsive Design**: Mobile and desktop optimized

### 🧪 Testing Utilities

In development mode, access debug tools via browser console:
```javascript
// Reset onboarding for testing
window.credvaultDebug.resetOnboarding()

// Check completion status
window.credvaultDebug.hasCompletedOnboarding()
```

### 📋 User Flow
1. **First Visit**: User sees onboarding automatically
2. **Navigation**: Progress through 3 screens with smooth transitions
3. **Wallet Connection**: Connect wallet on final screen
4. **Completion**: Automatic redirect to main application
5. **Persistence**: Onboarding only shown once per user

### 🎯 Skip Option
Users can skip onboarding at any time using:
- Skip button (top-right)
- Escape key
- Direct navigation

## Components

```
src/components/onboarding/
├── OnboardingContainer.tsx    # Main flow manager
├── OnboardingScreen1.tsx      # Welcome screen
├── OnboardingScreen2.tsx      # Benefits screen
└── OnboardingScreen3.tsx      # CTA/wallet screen
```

## Utilities

```
src/utils/
└── onboarding.ts             # State management utilities
```

## Design Tokens

```css
/* Primary colors */
--bg-primary: #0a0a0a (zinc-900)
--bg-secondary: #18181b (zinc-800)
--text-primary: #f4f4f5 (zinc-100)
--text-secondary: #a1a1aa (zinc-400)

/* Gradients */
--gradient-brand: from-purple-400 via-pink-400 to-blue-400
--gradient-bg: from-zinc-900 via-zinc-900 to-black
```

## Performance Considerations
- **Lazy loading**: Components loaded only when needed
- **60fps animations**: Optimized Framer Motion configurations
- **Minimal bundle impact**: Efficient code splitting
- **Memory management**: Proper cleanup of event listeners
