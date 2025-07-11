import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Play, Settings, Globe, Zap, Layers, Coins, Users, TrendingUp } from 'lucide-react';

export const ZoraxHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Status badges */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
              Built with Firebase 🔥
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              On Optimism
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Build creator economies.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Fast.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Connect creators to supporters with transparent NFT campaigns, ZoraCred reputation scoring, 
            and Farcaster Frame integration for viral social sharing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard" className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start building
            </Link>
            <button className="flex items-center gap-2 text-foreground hover:text-purple-400 transition-colors px-6 py-3">
              <Play className="w-4 h-4" />
              See demo
            </button>
          </div>

          {/* Code example */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-8 text-left">
              <div className="flex items-center gap-4 mb-6">
                <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm font-medium">
                  React
                </button>
                <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                  TypeScript
                </button>
                <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                  Web3
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-800 rounded" title="Download">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded" title="Copy">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <pre className="text-sm font-mono overflow-x-auto text-gray-300 leading-relaxed">
                <code>
                  <span className="text-purple-400">import</span> <span className="text-yellow-400">{'{'}</span> <span className="text-blue-400">initializeApp</span> <span className="text-yellow-400">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'firebase/app'</span>{'\n'}
                  <span className="text-purple-400">import</span> <span className="text-yellow-400">{'{'}</span> <span className="text-blue-400">getAuth, signInWithPopup</span> <span className="text-yellow-400">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'firebase/auth'</span>{'\n'}
                  <span className="text-purple-400">import</span> <span className="text-yellow-400">{'{'}</span> <span className="text-blue-400">ZoraxClient, createCampaign</span> <span className="text-yellow-400">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@zorax/sdk'</span>{'\n\n'}
                  
                  <span className="text-gray-500">// Initialize Zorax with Firebase auth</span>{'\n'}
                  <span className="text-purple-400">const</span> <span className="text-blue-400">zorax</span> <span className="text-yellow-400">=</span> <span className="text-purple-400">new</span> <span className="text-blue-400">ZoraxClient</span><span className="text-yellow-400">({'{'}</span> <span className="text-red-400">network</span><span className="text-yellow-400">:</span> <span className="text-green-400">"optimism"</span> <span className="text-yellow-400">{'})'};</span>{'\n\n'}
                  
                  <span className="text-gray-500">// Create campaign with Firebase user</span>{'\n'}
                  <span className="text-purple-400">const</span> <span className="text-blue-400">campaign</span> <span className="text-yellow-400">=</span> <span className="text-purple-400">await</span> <span className="text-blue-400">createCampaign</span><span className="text-yellow-400">({'{'}</span>{'\n'}
                  {'  '}<span className="text-red-400">title</span><span className="text-yellow-400">:</span> <span className="text-green-400">"Cosmic Art Collection"</span><span className="text-yellow-400">,</span>{'\n'}
                  {'  '}<span className="text-red-400">supply</span><span className="text-yellow-400">:</span> <span className="text-orange-400">1000</span><span className="text-yellow-400">,</span>{'\n'}
                  {'  '}<span className="text-red-400">price</span><span className="text-yellow-400">:</span> <span className="text-green-400">"0.08 ETH"</span>{'\n'}
                  <span className="text-yellow-400">{'})'};</span>{'\n\n'}
                  
                  <span className="text-gray-500">// Build ZoraCred reputation automatically</span>{'\n'}
                  <span className="text-blue-400">console</span><span className="text-yellow-400">.</span><span className="text-blue-400">log</span><span className="text-yellow-400">(</span><span className="text-green-400">`Campaign live: ${'{'}campaign.frameUrl{'}'}`</span><span className="text-yellow-400">);</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Integration section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-purple-400 font-medium mb-4 uppercase tracking-wide">Powered by leading Web3 infrastructure</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Built on Firebase, Zora Protocol & Optimism
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade infrastructure for scalable creator economies
            </p>
          </div>
          
          {/* Platform integration grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {/* Firebase */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-900/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🔥</span>
              </div>
              <span className="text-sm text-gray-400 font-medium">Firebase</span>
            </div>
            
            {/* Optimism */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-900/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400 font-medium">Optimism</span>
            </div>
            
            {/* Zora */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-900/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <span className="text-sm text-gray-400 font-medium">Zora</span>
            </div>
            
            {/* Farcaster */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-900/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-lg"></div>
              </div>
              <span className="text-sm text-gray-400 font-medium">Farcaster</span>
            </div>
            
            {/* IPFS */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-900/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400 font-medium">IPFS</span>
            </div>
            
            {/* Uniswap */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-900/50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400 font-medium">Uniswap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features showcase */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-muted-foreground">Built with Vite and optimized for instant campaign deployment and real-time analytics.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Reputation Driven</h3>
              <p className="text-muted-foreground">ZoraCred system builds transparent creator reputation through verified on-chain activity.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community First</h3>
              <p className="text-muted-foreground">Farcaster Frame integration enables viral social sharing and community growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to build your creator economy?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join creators who are building sustainable communities through transparent reputation and direct supporter relationships.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
              Start building today
            </Link>
            <Link href="/docs" className="border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors text-lg">
              View documentation
            </Link>
          </div>
        </div>
    </div>
  );
};