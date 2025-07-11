import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Wallet, AlertCircle } from 'lucide-react';

interface WalletStatusProps {
  showConnectButton?: boolean;
  compact?: boolean;
}

export const WalletStatus: React.FC<WalletStatusProps> = ({ 
  showConnectButton = true, 
  compact = false 
}) => {
  const { address, isConnected, isConnecting } = useAccount();

  if (isConnecting) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">Connecting...</span>
      </div>
    );
  }

  if (!isConnected && showConnectButton) {
    return (
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <button
            onClick={openConnectModal}
            className={`${
              compact 
                ? 'pica-button-secondary text-sm' 
                : 'pica-button flex items-center gap-2'
            }`}
          >
            <Wallet className="w-4 h-4" />
            {compact ? 'Connect' : 'Connect Wallet'}
          </button>
        )}
      </ConnectButton.Custom>
    );
  }

  if (!isConnected && !showConnectButton) {
    return (
      <div className="flex items-center gap-2 text-orange-500">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">Wallet not connected</span>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2 text-green-500">
        <Wallet className="w-4 h-4" />
        <span className="text-sm font-medium">
          {compact 
            ? `${address.slice(0, 4)}...${address.slice(-2)}`
            : `${address.slice(0, 6)}...${address.slice(-4)}`
          }
        </span>
      </div>
    );
  }

  return null;
};

export default WalletStatus;
