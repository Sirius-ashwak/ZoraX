import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Bell, Shield, Palette, Globe, Wallet, Key, 
  Save, Eye, EyeOff, Copy, Check, ExternalLink,
  Trash2, Download, Upload, RefreshCw
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface UserSettings {
  // Profile
  displayName: string;
  bio: string;
  email: string;
  website: string;
  twitter: string;
  discord: string;
  
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  campaignUpdates: boolean;
  supporterMessages: boolean;
  marketingEmails: boolean;
  
  // Privacy
  profileVisibility: 'public' | 'supporters' | 'private';
  showSupporterCount: boolean;
  showTotalSupported: boolean;
  allowMessages: boolean;
  
  // Appearance
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: 'ETH' | 'USD';
  
  // Security
  twoFactorEnabled: boolean;
  backupCodes: string[];
}

const initialSettings: UserSettings = {
  displayName: 'Cosmic Creator',
  bio: 'Digital artist exploring the intersection of technology and cosmic phenomena.',
  email: 'cosmic@example.com',
  website: 'https://cosmic-art.xyz',
  twitter: '@cosmic_creator',
  discord: 'cosmic#1234',
  
  emailNotifications: true,
  pushNotifications: true,
  campaignUpdates: true,
  supporterMessages: true,
  marketingEmails: false,
  
  profileVisibility: 'public',
  showSupporterCount: true,
  showTotalSupported: true,
  allowMessages: true,
  
  theme: 'dark',
  language: 'en',
  currency: 'ETH',
  
  twoFactorEnabled: false,
  backupCodes: []
};

export const SettingsPage: React.FC = () => {
  const { address, isConnected } = useUser();
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState('');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'wallet', label: 'Wallet', icon: Wallet }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Settings saved:', settings);
    setSaving(false);
  };

  const handleInputChange = (field: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const generateApiKey = () => {
    const apiKey = 'zrx_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return apiKey;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={settings.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bio
                  </label>
                  <textarea
                    value={settings.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={settings.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={settings.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive browser push notifications</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Campaign Updates</div>
                    <div className="text-sm text-muted-foreground">Get notified about campaign milestones</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.campaignUpdates}
                    onChange={(e) => handleInputChange('campaignUpdates', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Supporter Messages</div>
                    <div className="text-sm text-muted-foreground">Notifications when supporters send messages</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.supporterMessages}
                    onChange={(e) => handleInputChange('supporterMessages', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Marketing Emails</div>
                    <div className="text-sm text-muted-foreground">Receive updates about new features and tips</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.marketingEmails}
                    onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="public">Public - Anyone can view</option>
                    <option value="supporters">Supporters Only - Only supporters can view</option>
                    <option value="private">Private - Only you can view</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Show Supporter Count</div>
                    <div className="text-sm text-muted-foreground">Display total number of supporters</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showSupporterCount}
                    onChange={(e) => handleInputChange('showSupporterCount', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Show Total Supported</div>
                    <div className="text-sm text-muted-foreground">Display total amount raised</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showTotalSupported}
                    onChange={(e) => handleInputChange('showTotalSupported', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Allow Messages</div>
                    <div className="text-sm text-muted-foreground">Allow supporters to send you messages</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.allowMessages}
                    onChange={(e) => handleInputChange('allowMessages', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Appearance Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Display Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="ETH">ETH</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-foreground">Two-Factor Authentication</div>
                    <input
                      type="checkbox"
                      checked={settings.twoFactorEnabled}
                      onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary/20"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </div>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="font-medium text-foreground mb-2">API Key</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Use this key to access Zorax API programmatically
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 font-mono text-sm bg-background border border-border rounded px-3 py-2">
                      {showApiKey ? generateApiKey() : '••••••••••••••••••••••••••••••••'}
                    </div>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-2 bg-background border border-border rounded hover:bg-secondary/50 transition-colors"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(generateApiKey(), 'api')}
                      className="p-2 bg-background border border-border rounded hover:bg-secondary/50 transition-colors"
                    >
                      {copied === 'api' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="font-medium text-foreground mb-2">Account Recovery</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Download backup codes in case you lose access to your account
                  </div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <Download className="w-4 h-4 mr-2 inline" />
                    Download Backup Codes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Wallet Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="font-medium text-foreground mb-2">Connected Wallet</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {isConnected ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : 'No wallet connected'}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(address || '', 'address')}
                      className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      {copied === 'address' ? <Check className="w-4 h-4 mr-2 inline text-green-500" /> : <Copy className="w-4 h-4 mr-2 inline" />}
                      Copy Address
                    </button>
                    <button className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2 inline" />
                      View on Explorer
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="font-medium text-foreground mb-2">Wallet Preferences</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Configure how your wallet interacts with Zorax
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                      <span className="text-sm">Auto-approve transactions under 0.01 ETH</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                      <span className="text-sm">Show gas price warnings</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="font-medium text-red-400 mb-2">Danger Zone</div>
                  <div className="text-sm text-red-300 mb-3">
                    Disconnect your wallet from this account
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 className="w-4 h-4 mr-2 inline" />
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and platform settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-lg p-8"
            >
              {renderTabContent()}
              
              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-border">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};