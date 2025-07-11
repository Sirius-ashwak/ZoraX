import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, Search, ChevronRight, Code, Rocket, Users, Shield,
  Play, Copy, Check, ExternalLink, Download, Star
} from 'lucide-react';

const docSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Rocket,
    items: [
      { id: 'introduction', title: 'Introduction to ZoraX' },
      { id: 'quick-start', title: 'Quick Start Guide' },
      { id: 'wallet-setup', title: 'Wallet Setup' },
      { id: 'first-campaign', title: 'Creating Your First Campaign' }
    ]
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    icon: Star,
    items: [
      { id: 'campaign-basics', title: 'Campaign Basics' },
      { id: 'nft-configuration', title: 'NFT Configuration' },
      { id: 'pricing-strategy', title: 'Pricing Strategy' },
      { id: 'launch-checklist', title: 'Launch Checklist' }
    ]
  },
  {
    id: 'supporters',
    title: 'Supporters',
    icon: Users,
    items: [
      { id: 'supporter-management', title: 'Managing Supporters' },
      { id: 'tier-system', title: 'Tier System' },
      { id: 'engagement', title: 'Engagement Strategies' },
      { id: 'rewards', title: 'Rewards & Perks' }
    ]
  },
  {
    id: 'api',
    title: 'API Reference',
    icon: Code,
    items: [
      { id: 'authentication', title: 'Authentication' },
      { id: 'campaigns-api', title: 'Campaigns API' },
      { id: 'users-api', title: 'Users API' },
      { id: 'analytics-api', title: 'Analytics API' }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    items: [
      { id: 'best-practices', title: 'Security Best Practices' },
      { id: 'smart-contracts', title: 'Smart Contract Security' },
      { id: 'wallet-security', title: 'Wallet Security' },
      { id: 'reporting', title: 'Reporting Issues' }
    ]
  }
];

const docContent = {
  introduction: {
    title: 'Introduction to ZoraX',
    content: `
# Welcome to ZoraX

ZoraX is the most elegant way for Web3 creators to build reputation, launch NFT campaigns, and connect with supporters. Built on Optimism and powered by Zora Protocol, ZoraX provides creators with all the tools they need to succeed in the decentralized creator economy.

## Key Features

- <strong>Campaign Creation</strong>: Launch NFT campaigns with customizable pricing and supply
- <strong>ZoraCred Reputation</strong>: Build your onchain reputation through transparent metrics
- <strong>Supporter Management</strong>: Engage with your community through tiered relationships
- <strong>Analytics Dashboard</strong>: Track performance with comprehensive insights
- <strong>Farcaster Integration</strong>: Share campaigns through social frames

## Why ZoraX?

ZoraX is designed specifically for creators who want to build sustainable relationships with their supporters while maintaining full ownership of their content and audience.
    `
  },
  'quick-start': {
    title: 'Quick Start Guide',
    content: `
# Quick Start Guide

Get up and running with ZoraX in minutes.

## Step 1: Connect Your Wallet

1. Click "Connect Wallet" in the top navigation
2. Select your preferred wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection request
4. Ensure you're connected to Optimism network

## Step 2: Set Up Your Profile

1. Navigate to your profile page
2. Add your display name, bio, and social links
3. Upload a profile picture
4. Configure your ZoraCred settings

## Step 3: Create Your First Campaign

1. Click "Create Campaign" from the dashboard
2. Fill in campaign details (title, description, category)
3. Configure your NFT (name, symbol, supply, price)
4. Upload campaign artwork
5. Set funding goals and duration
6. Launch your campaign!

## Step 4: Share and Promote

1. Use the auto-generated Farcaster frame
2. Share on social media
3. Engage with your supporters
4. Track performance in analytics

\`\`\`bash
# Example: Sharing your campaign
Cast your Farcaster frame to reach thousands of potential supporters
\`\`\`
    `
  },
  'campaign-basics': {
    title: 'Campaign Basics',
    content: `
# Campaign Basics

Learn how to create effective campaigns that resonate with supporters.

## Campaign Structure

Every ZoraX campaign consists of:

- **Basic Information**: Title, description, and category
- **NFT Configuration**: Token details and pricing
- **Funding Goals**: Target amount and duration
- **Media**: Campaign artwork and visuals
- **Perks**: Optional rewards for supporters

## Best Practices

### Title and Description
- Keep titles clear and compelling
- Describe your vision and goals
- Explain what supporters will receive
- Include your background and expertise

### Pricing Strategy
- Research similar campaigns
- Consider your audience size
- Start with achievable goals
- Allow for growth over time

### Visual Assets
- Use high-quality images (minimum 1200x800px)
- Ensure artwork represents your brand
- Consider how it will appear in frames
- Test across different devices

## Campaign Lifecycle

1. **Draft**: Campaign created but not published
2. **Active**: Live and accepting supporters
3. **Completed**: Successfully reached goals
4. **Cancelled**: Ended before completion
    `
  },
  authentication: {
    title: 'API Authentication',
    content: `
# API Authentication

ZoraX API uses API keys for authentication. Generate your API key from the Settings page.

## Getting Your API Key

1. Go to Settings → Security
2. Find the "API Key" section
3. Copy your API key
4. Keep it secure and never share it publicly

## Making Authenticated Requests

Include your API key in the \`Authorization\` header:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.zorax.app/v1/campaigns
\`\`\`

## Rate Limits

- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users
- Higher limits available for enterprise users

## Error Handling

The API returns standard HTTP status codes:

- \`200\`: Success
- \`401\`: Unauthorized (invalid API key)
- \`429\`: Rate limit exceeded
- \`500\`: Server error

\`\`\`json
{
  "error": "unauthorized",
  "message": "Invalid API key",
  "code": 401
}
\`\`\`
    `
  }
};

export const DocsPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('getting-started');
  const [selectedItem, setSelectedItem] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  const currentContent = docContent[selectedItem as keyof typeof docContent] || docContent.introduction;

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-foreground mb-4 mt-6">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-foreground mb-3 mt-4">
            {line.substring(4)}
          </h3>
        );
      }
      
      // Code blocks
      if (line.startsWith('```')) {
        const language = line.substring(3);
        const codeLines = [];
        let i = index + 1;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        const code = codeLines.join('\n');
        
        return (
          <div key={index} className="relative mb-4">
            <div className="flex items-center justify-between bg-secondary/30 px-4 py-2 rounded-t-lg border border-border">
              <span className="text-sm font-medium text-muted-foreground">{language || 'code'}</span>
              <button
                onClick={() => copyCode(code)}
                className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {copiedCode === code ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copiedCode === code ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="bg-background p-4 rounded-b-lg border border-t-0 border-border overflow-x-auto">
              <code className="text-sm font-mono">{code}</code>
            </pre>
          </div>
        );
      }
      
      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 mb-1 text-muted-foreground">
            {line.substring(2)}
          </li>
        );
      }
      
      // Regular paragraphs
      if (line.trim() && !line.startsWith('#') && !line.startsWith('```')) {
        return (
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Book className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                ZoraX Documentation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Everything you need to build, launch, and grow your NFT campaigns on ZoraX
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg"
                />
              </div>
              
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                <Play className="w-5 h-5" />
                Quick Start
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {docSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        selectedSection === section.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {section.title}
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                        selectedSection === section.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {selectedSection === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 mt-2 space-y-1"
                      >
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedItem(item.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                              selectedItem === item.id
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                            }`}
                          >
                            {item.title}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedItem}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {renderContent(currentContent.content)}
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Previous
                </button>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Edit on GitHub
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};