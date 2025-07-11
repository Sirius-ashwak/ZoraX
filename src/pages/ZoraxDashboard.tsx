import React, { useState } from 'react';
import { Link } from 'wouter';
import { Settings, Users, Zap, TrendingUp, Calendar, Award, ArrowUpRight, Bell } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { InteractiveDashboard } from '../components/dashboard/InteractiveDashboard';
import { NotificationCenter } from '../components/dashboard/NotificationCenter';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const ZoraxDashboard: React.FC = () => {
  const { address, isConnected } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data - in production this would come from your API
  const stats = {
    totalCampaigns: 12,
    activeSupporters: 156,
    totalRaised: '2.4 ETH',
    reputation: 'Expert'
  };

  const recentCampaigns = [
    { id: 1, title: 'Cosmic Art Collection', raised: '0.8 ETH', supporters: 45, status: 'active' },
    { id: 2, title: 'Space Exploration NFT', raised: '1.2 ETH', supporters: 89, status: 'completed' },
    { id: 3, title: 'Digital Cosmos Series', raised: '0.4 ETH', supporters: 22, status: 'active' }
  ];



  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Creator Dashboard</h1>
              <p className="text-muted-foreground">
                {isConnected && address ? `Welcome back, ${address.slice(0, 6)}...${address.slice(-4)}` : 'Explore campaigns and discover creators'}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {isConnected && (
                <button
                  onClick={() => setShowNotifications(true)}
                  className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors relative"
                >
                  <Bell className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                </button>
              )}
              {isConnected ? (
                <Link href="/create-campaign" className="pica-button">
                  Create Campaign
                </Link>
              ) : (
                <div className="pica-button bg-accent/20 text-muted-foreground cursor-not-allowed">
                  Connect Wallet to Create
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Interactive Dashboard */}
        <InteractiveDashboard />

        {/* Legacy Stats Summary - Simplified */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-6">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="pica-card p-6 text-center">
              <div className="p-2 bg-accent/10 rounded-lg w-fit mx-auto mb-3">
                <Settings className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-semibold">{stats.totalCampaigns}</p>
              <p className="text-sm text-muted-foreground">Total Campaigns</p>
            </div>

            <div className="pica-card p-6 text-center">
              <div className="p-2 bg-accent/10 rounded-lg w-fit mx-auto mb-3">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-semibold">{stats.activeSupporters}</p>
              <p className="text-sm text-muted-foreground">Active Supporters</p>
            </div>

            <div className="pica-card p-6 text-center">
              <div className="p-2 bg-accent/10 rounded-lg w-fit mx-auto mb-3">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-semibold">{stats.totalRaised}</p>
              <p className="text-sm text-muted-foreground">Total Raised</p>
            </div>

            <div className="pica-card p-6 text-center">
              <div className="p-2 bg-accent/10 rounded-lg w-fit mx-auto mb-3">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-semibold">{stats.reputation}</p>
              <p className="text-sm text-muted-foreground">Reputation Level</p>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isConnected ? (
              <Link href="/create-campaign" className="pica-card p-6 hover:border-accent/30 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create Campaign</h3>
                    <p className="text-sm text-muted-foreground">Launch new NFT collection</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="pica-card p-6 border-accent/20 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Zap className="w-5 h-5 text-accent/60" />
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Create Campaign</h3>
                    <p className="text-sm text-muted-foreground">Connect wallet to start</p>
                  </div>
                </div>
              </div>
            )}
            
            <Link href="/analytics" className="pica-card p-6 hover:border-accent/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Advanced Analytics</h3>
                  <p className="text-sm text-muted-foreground">Deep dive into metrics</p>
                </div>
              </div>
            </Link>
            
            <Link href="/supporters" className="pica-card p-6 hover:border-accent/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Supporter Hub</h3>
                  <p className="text-sm text-muted-foreground">Manage your community</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
};