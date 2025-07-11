import React, { createContext, useContext, useMemo } from 'react';
import { useAccount, useEnsName } from 'wagmi';

interface UserContextValue {
  address?: string;
  ensName?: string | null;
  isConnected: boolean;
}

const UserContext = createContext<UserContextValue>({
  address: undefined,
  ensName: undefined,
  isConnected: false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const value = useMemo(() => ({
    address,
    ensName,
    isConnected,
  }), [address, ensName, isConnected]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext); 