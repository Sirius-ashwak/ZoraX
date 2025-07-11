import React from 'react';
import { Route, Switch, Link } from 'wouter';
import { ZoraxLayout } from './components/layout/ZoraxLayout';
import { ZoraxHome } from './pages/ZoraxHome';
import { ZoraxDashboard } from './pages/ZoraxDashboard';
import { ZoraCreditProfile } from './pages/ZoraCreditProfile';
import { CampaignsPage } from './pages/CampaignsPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SupportersPage } from './pages/SupportersPage';
import { SettingsPage } from './pages/SettingsPage';
import { DocsPage } from './pages/DocsPage';
import { Web3Provider } from './components/Web3Provider';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './components/FirebaseAuth';
import { AuthRedirectHandler } from './components/AuthRedirectHandler';

function App() {
  return (
    <AuthProvider>
      <Web3Provider>
        <UserProvider>
          <AuthRedirectHandler />
          <ZoraxLayout>
          <Switch>
            <Route path="/" component={ZoraxHome} />
            <Route path="/dashboard" component={ZoraxDashboard} />
            <Route path="/profile" component={ZoraCreditProfile} />
            <Route path="/profile/:address" component={({ params }) => <ZoraCreditProfile address={params.address} />} />
            <Route path="/community" component={() => (
              <div className="min-h-screen bg-background py-16">
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-4xl font-bold text-center mb-8">ZoraX Community</h1>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-card rounded-lg p-6 border">
                      <h2 className="text-xl font-semibold mb-4">Discord Community</h2>
                      <p className="text-muted-foreground mb-4">Join our vibrant creator community</p>
                      <a href="https://discord.gg/zorax" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                        Join Discord
                      </a>
                    </div>
                    <div className="bg-card rounded-lg p-6 border">
                      <h2 className="text-xl font-semibold mb-4">Creator Forums</h2>
                      <p className="text-muted-foreground mb-4">Connect with fellow creators and supporters</p>
                      <a href="/forums" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                        Visit Forums
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )} />
            <Route path="/docs" component={DocsPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/create-campaign" component={CreateCampaignPage} />
            <Route path="/campaigns" component={CampaignsPage} />
            <Route path="/analytics" component={AnalyticsPage} />
            <Route path="/supporters" component={SupportersPage} />
            <Route path="/reputation" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Reputation</h1>
                <p className="pica-subtitle mx-auto">View your creator reputation status and growth</p>
              </div>
            )} />
            <Route path="/api" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">API Documentation</h1>
                <p className="pica-subtitle mx-auto">Developer resources and API reference</p>
              </div>
            )} />
            <Route path="/about" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">About Zorax</h1>
                <p className="pica-subtitle mx-auto">Building the future of creator economies</p>
              </div>
            )} />
            <Route path="/blog" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Blog</h1>
                <p className="pica-subtitle mx-auto">Latest updates from the Zorax team</p>
              </div>
            )} />
            <Route path="/careers" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Careers</h1>
                <p className="pica-subtitle mx-auto">Join our mission to revolutionize creator economies</p>
              </div>
            )} />
            <Route path="/contact" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Contact</h1>
                <p className="pica-subtitle mx-auto">Get in touch with our team</p>
              </div>
            )} />
            <Route path="/guides" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Guides</h1>
                <p className="pica-subtitle mx-auto">Learn how to maximize your creator potential</p>
              </div>
            )} />
            <Route path="/tutorials" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Tutorials</h1>
                <p className="pica-subtitle mx-auto">Step-by-step tutorials for creators</p>
              </div>
            )} />
            <Route path="/community" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Community</h1>
                <p className="pica-subtitle mx-auto">Join the Zorax creator community</p>
              </div>
            )} />
            <Route path="/support" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Support</h1>
                <p className="pica-subtitle mx-auto">Get help with your creator journey</p>
              </div>
            )} />
            <Route path="/privacy" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Privacy Policy</h1>
                <p className="pica-subtitle mx-auto">How we protect your data</p>
              </div>
            )} />
            <Route path="/terms" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Terms of Service</h1>
                <p className="pica-subtitle mx-auto">Platform terms and conditions</p>
              </div>
            )} />
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-semibold text-foreground mb-4">404 - Page Not Found</h1>
                  <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
                  <div className="mt-8">
                    <Link href="/" className="pica-button">Go Home</Link>
                  </div>
                </div>
              </div>
            </Route>
          </Switch>
          </ZoraxLayout>
        </UserProvider>
      </Web3Provider>
    </AuthProvider>
  );
}

export default App;