import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Play, Settings, Globe, Zap, Layers, Coins, Users, TrendingUp } from 'lucide-react';

export const ZoraxHome: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pica-section">
        <div className="max-w-7xl mx-auto text-center">
          {/* Built with badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8">
            Powered by Web3 ⚡
            <span className="ml-2 inline-flex items-center gap-1 text-accent">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              On Optimism
            </span>
          </div>

          {/* Main headline */}
          <h1 className="pica-hero-text mb-8">
            Build creator reputation.<br />
            <span className="text-accent">Earn together.</span>
          </h1>

          {/* Subtitle */}
          <p className="pica-subtitle mx-auto mb-12">
            Connect creators to supporters with transparent NFT campaigns, streaming reputation systems, 
            and Web3 tools for sustainable creator economies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/get-started" className="pica-button">
              Start building
            </Link>
            <button className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
              <Play className="w-4 h-4" />
              See demo
            </button>
          </div>

          {/* Code example */}
          <div className="max-w-4xl mx-auto">
            <div className="pica-card p-8 text-left">
              <div className="flex items-center gap-4 mb-6">
                <button className="px-3 py-1 bg-accent text-accent-foreground rounded text-sm font-medium">
                  React
                </button>
                <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                  TypeScript
                </button>
                <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                  Web3
                </button>
              </div>
              
              <pre className="text-sm text-muted-foreground font-mono overflow-x-auto">
                <code>{`import { ZoraxClient, createCampaign } from '@zorax/sdk'
import { useAccount } from 'wagmi'

// Initialize Zorax client
const zorax = new ZoraxClient({ network: "optimism" })

// Create a new NFT campaign
const campaign = await createCampaign({
  title: "My Creator Campaign",
  description: "Supporting my creative journey",
  supply: 1000,
  price: "0.01 ETH"
})

// Build reputation as supporters mint
console.log(\`Campaign created: \${campaign.id}\`)`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Integration badges */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-accent font-medium mb-4">Powered by leading Web3 infrastructure</p>
            <h2 className="text-4xl font-semibold mb-4">
              Built on Zora Protocol & Optimism Network
            </h2>
          </div>
          
          {/* Platform logos grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center opacity-60">
            {/* Web3 platform representations */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
              </div>
              <span className="text-xs text-muted-foreground">Optimism</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <span className="text-xs text-muted-foreground">Zora</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <span className="text-xs text-muted-foreground">Farcaster</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <span className="text-xs text-muted-foreground">IPFS</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-pink-500 rounded"></div>
              </div>
              <span className="text-xs text-muted-foreground">Uniswap</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <span className="text-xs text-muted-foreground">WalletConnect</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              </div>
              <span className="text-xs text-muted-foreground">MetaMask</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <span className="text-xs text-muted-foreground">Coinbase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pica-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold mb-6">Core Features</h2>
            <p className="pica-subtitle mx-auto">
              Everything you need to build and scale your creator economy
            </p>
          </div>

          <div className="pica-grid">
            {/* Campaign Creation */}
            <div className="pica-feature-card text-center">
              <div className="pica-icon mx-auto">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Campaign Creation</h3>
              <p className="text-muted-foreground mb-6">
                Launch NFT campaigns<br />
                with just a few clicks
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Easy setup • Smart contracts</p>
                <p>IPFS storage • Gas optimization</p>
              </div>
            </div>

            {/* ZoraCred Reputation */}
            <div className="pica-feature-card text-center">
              <div className="pica-icon mx-auto">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">ZoraCred Reputation</h3>
              <p className="text-muted-foreground mb-6">
                Dynamic reputation<br />
                that grows with success
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Transparent scoring • Visual badges</p>
                <p>Creator profiles • Supporter tracking</p>
              </div>
            </div>

            {/* Supporter Networks */}
            <div className="pica-feature-card text-center">
              <div className="pica-icon mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Supporter Networks</h3>
              <p className="text-muted-foreground mb-6">
                Connect with fans<br />
                and build communities
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Social sharing • Farcaster frames</p>
                <p>Community tools • Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pica-section bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-accent font-medium mb-4">Features</p>
            <h2 className="text-5xl font-semibold mb-6">Platform Features</h2>
            <p className="pica-subtitle mx-auto">
              Everything you need to build powerful creator applications
            </p>
          </div>

          <div className="pica-grid">
            <div className="pica-feature-card">
              <div className="pica-icon">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">NFT Campaigns</h3>
              <p className="text-muted-foreground">
                Launch professional NFT campaigns with smart contracts, IPFS storage, and gas optimization
              </p>
            </div>

            <div className="pica-feature-card">
              <div className="pica-icon">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reputation System</h3>
              <p className="text-muted-foreground">
                Build transparent reputation through campaign success, supporter engagement, and community growth
              </p>
            </div>

            <div className="pica-feature-card">
              <div className="pica-icon">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Social Integration</h3>
              <p className="text-muted-foreground">
                Share campaigns on Farcaster with auto-generated frames and viral social features
              </p>
            </div>

            <div className="pica-feature-card">
              <div className="pica-icon">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Layer 2 Speed</h3>
              <p className="text-muted-foreground">
                Built on Optimism for fast transactions and low fees, perfect for creator economies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pica-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">
            Ready to build your creator economy?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join creators building sustainable businesses through NFT campaigns and reputation systems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="pica-button">
              Launch your campaign
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/about" className="pica-button-secondary">
              Learn more about ZoraX
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};