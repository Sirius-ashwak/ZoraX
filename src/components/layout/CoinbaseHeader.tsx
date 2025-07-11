import { Search, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CoinbaseConnectWallet } from '../CoinbaseConnectWallet';

export const CoinbaseHeader = () => {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search assets, campaigns..."
            className="coinbase-input pl-10 w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button className="coinbase-button-secondary flex items-center gap-2 px-4 py-2">
            <ArrowUpRight size={16} />
            Send
          </button>
          <button className="coinbase-button-secondary flex items-center gap-2 px-4 py-2">
            <ArrowDownRight size={16} />
            Receive
          </button>
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-xl hover:bg-secondary transition-colors">
          <Bell size={20} className="text-muted-foreground" />
        </button>

        {/* Wallet Connection */}
        <CoinbaseConnectWallet />
      </div>
    </header>
  );
};