import React from 'react';
import { Route, Switch } from 'wouter';
import { PicaLayout } from './components/layout/PicaLayout';
import { PicaHome } from './pages/PicaHome';
import { PicaDashboard } from './pages/PicaDashboard';
import { Web3Provider } from './components/Web3Provider';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Web3Provider>
      <UserProvider>
        <PicaLayout>
          <Switch>
            <Route path="/" component={PicaHome} />
            <Route path="/dashboard" component={PicaDashboard} />
            <Route path="/products" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Products</h1>
                <p className="pica-subtitle mx-auto">Coming soon...</p>
              </div>
            )} />
            <Route path="/features" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Features</h1>
                <p className="pica-subtitle mx-auto">Coming soon...</p>
              </div>
            )} />
            <Route path="/pricing" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Pricing</h1>
                <p className="pica-subtitle mx-auto">Coming soon...</p>
              </div>
            )} />
            <Route path="/docs" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Documentation</h1>
                <p className="pica-subtitle mx-auto">Coming soon...</p>
              </div>
            )} />
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-semibold text-foreground mb-4">404 - Page Not Found</h1>
                  <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
                </div>
              </div>
            </Route>
          </Switch>
        </PicaLayout>
      </UserProvider>
    </Web3Provider>
  );
}

export default App;