# Figma to CredVault App Import Guide

## Step 1: Prepare Your Figma Design

1. **Open your Figma file** with the CredVault screens
2. **Select the frame/screen** you want to import
3. **Turn on Dev Mode** (if available) to get CSS properties
4. **Take screenshots** of each screen for reference

## Step 2: Extract Design Information

For each screen, gather:
- **Layout dimensions** (width, height, padding, margins)
- **Colors** (backgrounds, text, borders)
- **Typography** (font sizes, weights, line heights)
- **Spacing** (gaps, padding between elements)
- **Border radius** for rounded corners
- **Shadows** and effects

## Step 3: Create Screen Components

Use this template for each screen:

```typescript
import React from 'react';

interface ScreenNameProps {
  // Add props if needed
}

export const ScreenName: React.FC<ScreenNameProps> = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Copy your Figma layout here */}
    </div>
  );
};
```

## Step 4: Convert Figma Properties to Tailwind

### Colors
- Figma: `#0ea5e9` → Tailwind: `text-blue-500` or `bg-blue-500`
- Figma: `#9333ea` → Tailwind: `text-purple-600` or `bg-purple-600`

### Spacing
- Figma: `16px` → Tailwind: `p-4` or `m-4`
- Figma: `24px` → Tailwind: `p-6` or `m-6`

### Typography
- Figma: `font-size: 24px, font-weight: 600` → Tailwind: `text-2xl font-semibold`
- Figma: `font-size: 16px, font-weight: 400` → Tailwind: `text-base font-normal`

### Border Radius
- Figma: `8px` → Tailwind: `rounded-lg`
- Figma: `16px` → Tailwind: `rounded-xl`

## Step 5: Common Figma Patterns

### Hero Section
```tsx
<section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Your Hero Title
    </h1>
    <p className="text-xl mb-8 max-w-2xl mx-auto">
      Your hero description
    </p>
    <button className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
      Call to Action
    </button>
  </div>
</section>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold mb-2">Card Title</h3>
    <p className="text-gray-600">Card description</p>
  </div>
  {/* Repeat for more cards */}
</div>
```

### Navigation Bar
```tsx
<nav className="bg-white shadow-sm border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center">
        <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
        <span className="ml-2 text-xl font-bold">CredVault</span>
      </div>
      <div className="flex space-x-8">
        <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
      </div>
    </div>
  </div>
</nav>
```

## Step 6: Implementation Process

1. **Create a new component file** for each Figma screen
2. **Start with the layout structure** (header, main, footer)
3. **Add content sections** one by one
4. **Apply styling** using Tailwind classes
5. **Add interactivity** with React state and handlers
6. **Test responsiveness** on different screen sizes

## Step 7: Example Screen Implementation

Let me know which specific screens you want to implement, and I can help you create them!
