import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Compass, 
  Plus, 
  User, 
  Settings, 
  Zap, 
  TrendingUp,
  Frame,
  Wallet,
  Bell,
  Search,
  Star
} from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

interface CosmicLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: TrendingUp, label: 'Hub', path: '/hub' },
  { icon: Plus, label: 'Create', path: '/create' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const CosmicParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const TopNavigation = () => {
  const { isConnected } = useAccount();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              className="w-8 h-8 bg-cosmic rounded-lg flex items-center justify-center"
            >
              <Star className="w-5 h-5 text-white" />
            </motion.div>
            <span className="heading-cosmic text-xl font-bold">Zorax</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search campaigns, creators..."
                className="glass-input w-full pl-10 pr-4 py-2 text-sm"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg glass-button-secondary"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            
            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                if (!mounted) return null;
                
                if (!account) {
                  return (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openConnectModal}
                      className="glass-button flex items-center gap-2"
                    >
                      <Wallet className="w-4 h-4" />
                      Connect Wallet
                    </motion.button>
                  );
                }

                return (
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={openChainModal}
                      className="glass-button-secondary p-2 rounded-lg"
                    >
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={openAccountModal}
                      className="glass-button-secondary px-3 py-2 rounded-lg"
                    >
                      {account.displayName}
                    </motion.button>
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const SideNavigation = () => {
  const location = useLocation();
  const { isConnected } = useAccount();

  const getNavItemPath = (item: typeof navItems[0]) => {
    if (item.path === '/profile' && isConnected) {
      return '/profile'; // Will be handled by smart routing
    }
    return item.path;
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-16 bottom-0 w-64 glass-card border-r border-border/30 backdrop-blur-xl z-40"
    >
      <div className="p-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path === '/hub' && location.pathname.startsWith('/dashboard'));
            
            return (
              <Link
                key={item.path}
                to={getNavItemPath(item)}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-3 w-full"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <Link to="/settings" className="nav-item">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 w-full"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </motion.div>
          </Link>
        </div>

        {/* ZoraCred Display */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 glass-card glow-effect"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">ZoraCred</span>
            </div>
            <div className="cosmic-progress mb-2">
              <div 
                className="cosmic-progress-fill" 
                style={{ width: '75%' }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Expert</span>
              <span>750/1000</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export const CosmicLayout: React.FC<CosmicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <CosmicParticles />
      <TopNavigation />
      <SideNavigation />
      
      <main className="pl-64 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};