# ✨ Task 2: Reflect-Inspired Landing + Onboarding Flow for CredVault

**Priority**: Must-Have  
**Estimated Time**: 8-10 hours  
**Status**: 🔄 In Progress  
**Dependencies**: Project Setup ✅ | Brand Identity Finalized ✅

## 🌌 Description
Design and implement a visually captivating, narrative-driven landing and onboarding experience for CredVault, deeply inspired by the design language and flow of Reflect Notes v2.

This onboarding flow should:
- Use dark cosmic visuals and soft-glow effects
- Tell a story through scroll (think parallax reveal or staged sections)
- Blend motion, light, and typography to create immersion
- Drive users toward wallet connection and launch

## 📜 Visual Goals

| Feature | Reflect Style Equivalent | Notes |
|---------|-------------------------|-------|
| ✨ Hero Section | "Think better with Reflect" | Use "Build your Creator Economy with CredVault" |
| 🌠 Ambient Glow | Glowing lines, gradients, halos | Neon purple-blue + animated SVG effects |
| 📄 Feature Cards | Notes, integrations, security | Use "Campaigns", "Reputation", "Supporter Benefits" |
| 🔗 CTA Section | "Use Reflect with other apps" + "$10/month" | Replace with "Launch Campaign" + "Free to mint" |
| 🛡️ Trust Section | "Hardened security" | Replace with "Onchain, Transparent, Immutable" |
| 🪐 Footer | Planet glow with academy links | Replace with "Explore Docs" |

## ✅ Sub-Tasks

### 🟣 2.1 Hero Section – Cosmic Creator Opening
- [ ] Create fullscreen dark-glow hero layout
- [ ] Add main tagline: "Think Bigger. Build Onchain. Welcome to CredVault."
- [ ] Subtext: "The platform for launching creator campaigns and earning onchain credibility."
- [ ] Add animated glow ring or nebula (SVG or Lottie)
- [ ] Add "Get Started" scroll indicator/button

### 🔵 2.2 Scroll Sections – Narrative Flow (x6 Panels)

| Section | Title | Content |
|---------|-------|---------|
| A | Launch with Supporters | "Turn fans into early believers with NFT-powered campaigns." |
| B | Earn Onchain Credibility | "Every success adds to your evolving CredVault profile." |
| C | Backed by Real Fans | "Let your most loyal supporters earn perks and participate." |
| D | Fully Onchain | "CredVault uses Zora CoinV4, Farcaster Frames, and Optimism L2." |
| E | Own Your Journey | "Your audience, your data, your value. No middlemen." |
| F | Get Started | CTA with glow effect: "Launch your first campaign" |

Each panel should:
- [ ] Use scroll-triggered fade-in
- [ ] Feature light lines, stars, cosmic particles
- [ ] Use elegant type, large heading text
- [ ] Be fully responsive

### 🟢 2.3 Feature Grid – Showcase Value
- [ ] 3-column layout:
  - 💡 "Mint NFT Campaigns"
  - 🧠 "Build Reputation (ZoraCred)"
  - 🫂 "Engage Supporters"
- [ ] Icons/animations with soft hover effects
- [ ] Use blur/glow backgrounds with 3D light style

### 🟣 2.4 Cosmic CTA – Wallet Onboarding
- [ ] Final full-screen CTA with animated cosmic orb
- [ ] Headline: "Start Building Onchain"
- [ ] Subtext: "Connect your wallet and launch your creator economy in minutes."
- [ ] Add Framer Motion button:
  - Text: Connect Wallet
  - Glow on hover
  - Loading and error states

### 🔮 2.5 Design System – Reflect-Inspired
```css
--bg-primary: #0a0a1a;
--bg-secondary: #101020;
--text-primary: #f5f5f5;
--text-secondary: #9999aa;
--accent: #9a5bff;
--accent-glow: radial-gradient(circle at center, #9a5bff44, transparent);

--font-heading: 'Inter', sans-serif;
--font-body: 'Satoshi', sans-serif;
--text-3xl: 3rem;
--text-xl: 2rem;
--text-md: 1.25rem;
--blur-strong: blur(80px);
```

## ⚙️ Components to Build

| Component | Description |
|-----------|-------------|
| Hero.tsx | Full-screen hero with glow effect and scroll cue |
| NarrativeSection.tsx | 6 reusable panels with scroll reveal |
| FeatureGrid.tsx | 3-column value proposition section |
| FinalCTA.tsx | Fullscreen wallet connect prompt |
| GlowOrb.tsx | Animated background glow using SVG |
| ScrollManager.tsx | Utility for scroll-linked animations and indicators |

## ✅ Acceptance Criteria
- [ ] Scroll experience is smooth and immersive
- [ ] Mobile and desktop fully responsive
- [ ] Glow + animations do not impact performance
- [ ] Wallet CTA integrates with Wagmi/RainbowKit
- [ ] Design system consistent across all panels
- [ ] Accessibility and keyboard nav support
- [ ] Tested on multiple screen sizes (incl. dark OLED screens)

## 🔗 Design References
- Reflect.app
- Linear.app new onboarding
- Arc browser
- Rewind.ai
- Jitter.video

## Technical Notes
- Use Framer Motion for scroll-triggered animations
- Implement proper TypeScript types for all components
- Ensure components are reusable and performant
- Add proper error boundaries
- Test on multiple screen sizes and devices
- Optimize for dark OLED displays

## Definition of Done
- [ ] All 6 narrative sections are implemented with scroll reveals
- [ ] Hero section with cosmic glow effects is functional
- [ ] Feature grid showcases core value propositions
- [ ] Final CTA integrates wallet connection flow
- [ ] Design system is documented and consistent
- [ ] Components are tested and fully responsive
- [ ] Performance optimized for smooth 60fps animations
- [ ] Accessibility compliance verified
- [ ] Code reviewed and merged
