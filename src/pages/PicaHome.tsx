import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Play, Settings, Globe, Zap, Layers } from 'lucide-react';

export const PicaHome: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pica-section">
        <div className="max-w-7xl mx-auto text-center">
          {/* Built with badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8">
            Built with Rust 🦀
            <span className="ml-2 inline-flex items-center gap-1 text-accent">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Open Source
            </span>
          </div>

          {/* Main headline */}
          <h1 className="pica-hero-text mb-8">
            Build creator reputation.<br />
            <span className="text-accent">Fast.</span>
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
            <p className="text-sm text-accent font-medium mb-4">New platforms added every day 😎</p>
            <h2 className="text-4xl font-semibold mb-4">
              Integrate Web3 reputation & over 13,000 APIs
            </h2>
          </div>
          
          {/* Platform logos grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 items-center opacity-60">
            {/* Mock platform logos - in real implementation, use actual SVG icons */}
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-accent/30 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pica-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold mb-6">Products</h2>
            <p className="pica-subtitle mx-auto">
              Three tools, one goal: "Get real reputation done fast."
            </p>
          </div>

          <div className="pica-grid">
            {/* CreatorTool */}
            <div className="pica-feature-card text-center">
              <div className="pica-icon mx-auto">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">CreatorTool</h3>
              <p className="text-muted-foreground mb-6">
                Every NFT campaign,<br />
                right the first time
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Full campaigns • minting intelligence</p>
                <p>safety baked in</p>
              </div>
            </div>

            {/* ReputationKit */}
            <div className="pica-feature-card text-center">
              <div className="pica-icon mx-auto">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">ReputationKit</h3>
              <p className="text-muted-foreground mb-6">
                Instant reputation,<br />
                systems that never expire
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>OAuth flows • auto rotation</p>
                <p>MCP Store-as-a-Service</p>
              </div>
            </div>

            {/* SupportKit */}
            <div className="pica-feature-card text-center">
              <div className="pica-icon mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">SupportKit</h3>
              <p className="text-muted-foreground mb-6">
                From supporters to<br />
                live integration in seconds
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Unlimited integrations • 13,000+ actions</p>
                <p>zero config</p>
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
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Creator-First</h3>
              <p className="text-muted-foreground">
                Built from the ground up for creators and their audiences with Web3 tools
              </p>
            </div>

            <div className="pica-feature-card">
              <div className="pica-icon">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">13,000+ Integrations</h3>
              <p className="text-muted-foreground">
                Connect to thousands of services with natural Web3 interactions
              </p>
            </div>

            <div className="pica-feature-card">
              <div className="pica-icon">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast & Reliable</h3>
              <p className="text-muted-foreground">
                Streaming execution with human-verifiable campaigns
              </p>
            </div>

            <div className="pica-feature-card">
              <div className="pica-icon">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Open + Extensible</h3>
              <p className="text-muted-foreground">
                SDKs for Web3, React, and more
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
            Join thousands of creators already building sustainable businesses with Zorax.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-started" className="pica-button">
              Get started for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/docs" className="pica-button-secondary">
              View documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};