import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

// Import pages
import { CosmicHome } from './pages/CosmicHome';
import { SmartHub } from './pages/SmartHub';
import { Explore } from './pages/Explore';
import { Dashboard } from './pages/Dashboard';
import { CreateCampaign } from './pages/CreateCampaign';
import { CampaignDetails } from './pages/CampaignDetails';
import { CreatorProfile } from './pages/CreatorProfile';
import { NotFound } from './pages/NotFound';

// Import components
import { CosmicLayout } from './components/layout/CosmicLayout';
import { Toaster } from './components/ui/toaster';

import '@rainbow-me/rainbowkit/styles.css';

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <CosmicLayout>
              <Routes>
                <Route path="/" element={<CosmicHome />} />
                <Route path="/hub" element={<SmartHub />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/create" element={<CreateCampaign />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/campaign/:id" element={<CampaignDetails />} />
                <Route path="/profile/:address" element={<CreatorProfile />} />
                <Route path="/profile" element={<CreatorProfile />} />
                <Route path="/frame/:id" element={<CampaignDetails />} />
                <Route path="/settings" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CosmicLayout>
            <Toaster />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;