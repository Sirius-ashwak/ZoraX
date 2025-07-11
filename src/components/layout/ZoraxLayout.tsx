import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Hash, Star, Github, LogIn, LogOut, User, Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth, FirebaseAuth } from '../FirebaseAuth';

interface ZoraxLayoutProps {
  children: React.ReactNode;
}

export const ZoraxLayout: React.FC<ZoraxLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

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
                href="/modern-dashboard" 
                className={`text-sm font-medium transition-colors ${
                  location === '/modern-dashboard' || location === '/dashboard' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dashboard
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

              {/* Wallet Connection */}
              <div className="flex items-center gap-3">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <button
                                onClick={openConnectModal}
                                type="button"
                                className="pica-button-secondary text-sm flex items-center gap-2"
                              >
                                <Wallet className="w-4 h-4" />
                                Connect Wallet
                              </button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <button
                                onClick={openChainModal}
                                type="button"
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                Wrong network
                              </button>
                            );
                          }

                          return (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={openChainModal}
                                type="button"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                              >
                                {chain.hasIcon && (
                                  <div
                                    style={{
                                      background: chain.iconBackground,
                                      width: 16,
                                      height: 16,
                                      borderRadius: 999,
                                      overflow: 'hidden',
                                    }}
                                  >
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? 'Chain icon'}
                                        src={chain.iconUrl}
                                        style={{ width: 16, height: 16 }}
                                      />
                                    )}
                                  </div>
                                )}
                                <span className="text-sm text-foreground">{chain.name}</span>
                              </button>

                              <button
                                onClick={openAccountModal}
                                type="button"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                              >
                                <span className="text-sm font-medium text-foreground">
                                  {account.displayName || `${account.address?.slice(0, 6)}...${account.address?.slice(-4)}`}
                                </span>
                                {account.displayBalance && (
                                  <span className="text-xs text-muted-foreground">
                                    {account.displayBalance}
                                  </span>
                                )}
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
              
              {loading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Loading...</span>
                </div>
              ) : user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <User className="w-5 h-5" />
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    <img 
                      src={user.photoURL || `https://api.dicebear.com/6.x/initials/svg?seed=${user.email}`} 
                      alt={user.displayName || user.email} 
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-foreground">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                  </div>
                  
                  <button 
                    onClick={handleSignOut}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="pica-button-secondary text-sm"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </button>
                  
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="pica-button text-sm"
                  >
                    Get Started
                  </button>
                </div>
              )}
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
                <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
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

      {/* Firebase Auth Modal */}
      <FirebaseAuth 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthSuccess={(user) => {
          setShowAuth(false);
          console.log('User signed in:', user);
        }}
      />
    </div>
  );
};