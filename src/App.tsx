import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

// Import pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Dashboard } from './pages/Dashboard';
import { CreateCampaign } from './pages/CreateCampaign';
import { CampaignDetails } from './pages/CampaignDetails';
import { CreatorProfile } from './pages/CreatorProfile';
import { NotFound } from './pages/NotFound';

// Import components
import { Navbar } from './components/layout/Navbar';
import { Toaster } from './components/ui/toaster';
import { FloatingOrbs } from './components/ui/floating-orbs';

import '@rainbow-me/rainbowkit/styles.css';

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
              <FloatingOrbs />
              <div className="relative z-10">
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create" element={<CreateCampaign />} />
                    <Route path="/campaign/:id" element={<CampaignDetails />} />
                    <Route path="/creator/:address" element={<CreatorProfile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
              <Toaster />
            </div>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;