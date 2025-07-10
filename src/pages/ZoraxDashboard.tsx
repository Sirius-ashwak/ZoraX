import React, { useState } from 'react';
import { Link } from 'wouter';
import { Settings, Users, Zap, TrendingUp, Calendar, Award, ArrowUpRight, Bell } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { InteractiveDashboard } from '../components/dashboard/InteractiveDashboard';
import { NotificationCenter } from '../components/dashboard/NotificationCenter';

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

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-8">
            Connect your wallet to access your creator dashboard
          </p>
          <Link href="/" className="pica-button">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Creator Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setShowNotifications(true)}
                className="p-2 bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
              </button>
              <Link href="/create-campaign" className="pica-button">
                Create Campaign
              </Link>
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