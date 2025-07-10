import React from 'react';
import { Link, useLocation } from 'wouter';
import { Hash, Star, Github, LogIn, UserPlus } from 'lucide-react';

interface ZoraxLayoutProps {
  children: React.ReactNode;
}

export const ZoraxLayout: React.FC<ZoraxLayoutProps> = ({ children }) => {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
              <div className="flex items-center gap-1">
                <Hash className="w-6 h-6" />
                <span className="text-xl font-semibold">Zorax</span>
              </div>
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/campaigns" 
                className={`text-sm font-medium transition-colors ${
                  location === '/campaigns' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Campaigns
              </Link>
              <Link 
                href="/reputation" 
                className={`text-sm font-medium transition-colors ${
                  location === '/reputation' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Reputation
              </Link>
              <Link 
                href="/profile" 
                className={`text-sm font-medium transition-colors ${
                  location === '/profile' || location.startsWith('/profile/') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ZoraCred
              </Link>
              <Link 
                href="/community" 
                className={`text-sm font-medium transition-colors ${
                  location === '/community' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Community
              </Link>
              <Link 
                href="/docs" 
                className={`text-sm font-medium transition-colors ${
                  location === '/docs' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Docs
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/zorax" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                <Star className="w-4 h-4" />
                <span className="text-sm">1258</span>
              </a>
              
              <Link href="/login" className="pica-button-secondary text-sm">
                <LogIn className="w-4 h-4 mr-2" />
                Log in
              </Link>
              
              <Link href="/signup" className="pica-button text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-6 h-6" />
                <span className="text-xl font-semibold">Zorax</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The most elegant way for Web3 creators to build reputation, launch NFT campaigns, and connect with superfans.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/campaigns" className="hover:text-foreground transition-colors">Campaigns</Link></li>
                <li><Link href="/reputation" className="hover:text-foreground transition-colors">Reputation</Link></li>
                <li><Link href="/profile" className="hover:text-foreground transition-colors">ZoraCred Profile</Link></li>
                <li><Link href="/analytics" className="hover:text-foreground transition-colors">Analytics</Link></li>
                <li><Link href="/supporters" className="hover:text-foreground transition-colors">Supporters</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link></li>
                <li><Link href="/tutorials" className="hover:text-foreground transition-colors">Tutorials</Link></li>
                <li><Link href="/community" className="hover:text-foreground transition-colors">Community</Link></li>
                <li><Link href="/support" className="hover:text-foreground transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Zorax. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};