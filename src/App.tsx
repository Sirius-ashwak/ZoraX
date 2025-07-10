import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

// Import pages
import { CoinbaseHome } from './pages/CoinbaseHome';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Dashboard } from './pages/Dashboard';
import { CreateCampaign } from './pages/CreateCampaign';
import { CampaignDetails } from './pages/CampaignDetails';
import { CreatorProfile } from './pages/CreatorProfile';
import { NotFound } from './pages/NotFound';

// Import components
import { CoinbaseLayout } from './components/layout/CoinbaseLayout';
import { Toaster } from './components/ui/toaster';

import '@rainbow-me/rainbowkit/styles.css';

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <CoinbaseLayout>
              <Routes>
                <Route path="/" element={<CoinbaseHome />} />
                <Route path="/assets" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/trade" element={<Dashboard />} />
                <Route path="/earn" element={<Dashboard />} />
                <Route path="/web3" element={<CreateCampaign />} />
                <Route path="/pay" element={<Dashboard />} />
                <Route path="/create" element={<CreateCampaign />} />
                <Route path="/campaign/:id" element={<CampaignDetails />} />
                <Route path="/creator/:address" element={<CreatorProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CoinbaseLayout>
            <Toaster />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;