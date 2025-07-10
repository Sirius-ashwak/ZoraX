import React from 'react';
import { Link } from 'wouter';
import { Settings, Users, Zap, TrendingUp, Calendar, Award, ArrowUpRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const PicaDashboard: React.FC = () => {
  const { address, isConnected } = useUser();

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
            <div className="mt-4 md:mt-0">
              <Link href="/create-campaign" className="pica-button">
                Create Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="pica-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Settings className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <div>
              <p className="text-2xl font-semibold">{stats.totalCampaigns}</p>
              <p className="text-sm text-muted-foreground">Campaigns</p>
            </div>
          </div>

          <div className="pica-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            <div>
              <p className="text-2xl font-semibold">{stats.activeSupporters}</p>
              <p className="text-sm text-muted-foreground">Supporters</p>
            </div>
          </div>

          <div className="pica-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground">Lifetime</span>
            </div>
            <div>
              <p className="text-2xl font-semibold">{stats.totalRaised}</p>
              <p className="text-sm text-muted-foreground">Raised</p>
            </div>
          </div>

          <div className="pica-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground">Level</span>
            </div>
            <div>
              <p className="text-2xl font-semibold">{stats.reputation}</p>
              <p className="text-sm text-muted-foreground">Reputation</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Campaigns */}
          <div className="lg:col-span-2">
            <div className="pica-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Campaigns</h2>
                <Link href="/campaigns" className="text-accent hover:text-accent/80 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                    <div>
                      <h3 className="font-medium mb-1">{campaign.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {campaign.supporters} supporters • {campaign.raised} raised
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' 
                          ? 'bg-accent/10 text-accent' 
                          : 'bg-green-500/10 text-green-400'
                      }`}>
                        {campaign.status}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="pica-card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/create-campaign" className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-medium">Create Campaign</span>
                </Link>
                
                <Link href="/analytics" className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-medium">View Analytics</span>
                </Link>
                
                <Link href="/supporters" className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Users className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-medium">Manage Supporters</span>
                </Link>
              </div>
            </div>

            {/* Reputation Card */}
            <div className="pica-card p-6">
              <h2 className="text-xl font-semibold mb-4">Reputation Status</h2>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-accent" />
                </div>
                <p className="text-lg font-semibold mb-2">{stats.reputation}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  You've built strong creator reputation
                </p>
                <Link href="/reputation" className="text-accent hover:text-accent/80 text-sm font-medium">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};