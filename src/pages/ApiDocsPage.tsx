import React from 'react';
import { motion } from 'framer-motion';
import { Code, Book, ExternalLink, Terminal } from 'lucide-react';

export const ApiDocsPage: React.FC = () => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/campaigns',
      description: 'Get all campaigns',
      response: 'Array of campaign objects'
    },
    {
      method: 'POST',
      path: '/api/campaigns',
      description: 'Create a new campaign',
      response: 'Created campaign object'
    },
    {
      method: 'GET',
      path: '/api/campaigns/:id',
      description: 'Get specific campaign details',
      response: 'Campaign object'
    },
    {
      method: 'GET',
      path: '/api/profiles/:address',
      description: 'Get creator profile',
      response: 'Profile object with reputation data'
    },
    {
      method: 'POST',
      path: '/api/mint/:campaignId',
      description: 'Mint an NFT from campaign',
      response: 'Transaction hash and metadata'
    }
  ];

  const sdkExamples = [
    {
      title: 'Installation',
      language: 'bash',
      code: `npm install @zorax/sdk`
    },
    {
      title: 'Initialize Client',
      language: 'javascript',
      code: `import { ZoraxClient } from '@zorax/sdk';

const client = new ZoraxClient({
  network: 'mainnet', // or 'goerli' for testnet
  apiKey: 'your-api-key'
});`
    },
    {
      title: 'Create Campaign',
      language: 'javascript',
      code: `const campaign = await client.createCampaign({
  title: 'My NFT Collection',
  description: 'A unique collection...',
  targetAmount: '10', // ETH
  mintPrice: '0.08', // ETH per NFT
  totalSupply: 1000,
  imageUrl: 'https://...',
  metadata: { ... }
});`
    },
    {
      title: 'Get Profile',
      language: 'javascript',
      code: `const profile = await client.getProfile('0x...');
console.log(profile.reputationScore);
console.log(profile.totalEarnings);`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build with ZoraX APIs and integrate our creator economy platform into your applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 space-y-6">
              <div className="p-6 rounded-xl bg-muted/30">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Quick Start
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#authentication" className="hover:text-accent">Authentication</a></li>
                  <li><a href="#endpoints" className="hover:text-accent">API Endpoints</a></li>
                  <li><a href="#sdk" className="hover:text-accent">JavaScript SDK</a></li>
                  <li><a href="#examples" className="hover:text-accent">Code Examples</a></li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
                <h4 className="font-medium text-foreground mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our developer community for support and updates
                </p>
                <a
                  href="/docs"
                  className="inline-flex items-center text-accent hover:text-accent/80 text-sm font-medium"
                >
                  View Full Docs
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Authentication */}
            <section id="authentication">
              <h2 className="text-2xl font-bold text-foreground mb-6">Authentication</h2>
              <div className="p-6 rounded-xl bg-muted/30">
                <p className="text-muted-foreground mb-4">
                  All API requests require authentication using an API key. Include your key in the Authorization header:
                </p>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-green-400">
                  <div className="text-gray-400"># Example request</div>
                  <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
                  <div className="ml-5">https://api.zorax.app/campaigns</div>
                </div>
              </div>
            </section>

            {/* API Endpoints */}
            <section id="endpoints">
              <h2 className="text-2xl font-bold text-foreground mb-6">API Endpoints</h2>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="p-6 rounded-xl bg-muted/30">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 text-xs font-mono rounded ${
                        endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-foreground font-mono">{endpoint.path}</code>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{endpoint.description}</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Response:</strong> {endpoint.response}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SDK */}
            <section id="sdk">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Terminal className="w-6 h-6 mr-2" />
                JavaScript SDK
              </h2>
              <div className="space-y-6">
                {sdkExamples.map((example, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{example.title}</h3>
                    <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code className={`language-${example.language} text-gray-300`}>
                          {example.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Resources */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Additional Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="/docs"
                  className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">Full Documentation</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete guides, tutorials, and reference documentation
                  </p>
                </a>
                
                <a
                  href="https://github.com/zorax-platform"
                  className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">GitHub Repository</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Open source examples and community contributions
                  </p>
                </a>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
