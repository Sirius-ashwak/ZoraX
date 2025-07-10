import React from 'react';
import { Route, Switch, Link } from 'wouter';
import { ZoraxLayout } from './components/layout/ZoraxLayout';
import { ZoraxHome } from './pages/ZoraxHome';
import { ZoraxDashboard } from './pages/ZoraxDashboard';
import { ZoraCreditProfile } from './pages/ZoraCreditProfile';
import { Web3Provider } from './components/Web3Provider';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Web3Provider>
      <UserProvider>
        <ZoraxLayout>
          <Switch>
            <Route path="/" component={ZoraxHome} />
            <Route path="/dashboard" component={ZoraxDashboard} />
            <Route path="/profile" component={ZoraCreditProfile} />
            <Route path="/profile/:address" component={({ params }) => <ZoraCreditProfile address={params.address} />} />
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
            <Route path="/get-started" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Get Started</h1>
                <p className="pica-subtitle mx-auto">Connect your wallet to begin your creator journey</p>
                <div className="mt-8">
                  <button className="pica-button">Connect Wallet</button>
                </div>
              </div>
            )} />
            <Route path="/login" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Log In</h1>
                <p className="pica-subtitle mx-auto">Connect your wallet to access your account</p>
                <div className="mt-8">
                  <button className="pica-button">Connect Wallet</button>
                </div>
              </div>
            )} />
            <Route path="/signup" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Sign Up</h1>
                <p className="pica-subtitle mx-auto">Join Zorax and start building your creator reputation</p>
                <div className="mt-8">
                  <button className="pica-button">Get Started</button>
                </div>
              </div>
            )} />
            <Route path="/create-campaign" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Create Campaign</h1>
                <p className="pica-subtitle mx-auto">Launch your NFT campaign and connect with supporters</p>
                <div className="mt-8">
                  <button className="pica-button">Start Creating</button>
                </div>
              </div>
            )} />
            <Route path="/campaigns" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">All Campaigns</h1>
                <p className="pica-subtitle mx-auto">Browse all your creator campaigns</p>
              </div>
            )} />
            <Route path="/analytics" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Analytics</h1>
                <p className="pica-subtitle mx-auto">Track your campaign performance and supporter engagement</p>
              </div>
            )} />
            <Route path="/supporters" component={() => (
              <div className="pica-section text-center">
                <h1 className="pica-hero-text">Supporters</h1>
                <p className="pica-subtitle mx-auto">Manage your supporter community</p>
              </div>
            )} />
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
  );
}

export default App;