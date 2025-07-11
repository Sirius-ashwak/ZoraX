import { Route, Switch, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Users, MessageSquare, BookOpen, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
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
import { AboutPage } from './pages/AboutPage';
import { CampaignDetailsPage } from './pages/CampaignDetailsPage';
import { ReputationProfile } from './pages/ReputationProfile';
import { ApiDocsPage } from './pages/ApiDocsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { ModernDashboard } from './pages/ModernDashboard';
import { SmartDashboard } from './pages/SmartDashboard';
import { SupporterDashboard } from './pages/SupporterDashboard';
import { Web3Provider } from './components/Web3Provider';
import { UserProvider } from './context/UserContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { analytics } from './services/analytics';
import { performanceService } from './services/performance';
import { seoService } from './services/seo';

// Initialize production services
if (import.meta.env.PROD) {
  // Set default SEO meta tags
  seoService.updateMeta({
    title: 'ZoraX - The Future of Web3 Creator Economy',
    description: 'Launch NFT campaigns, build onchain reputation, and connect with supporters on the most elegant Web3 creator platform.',
    keywords: ['NFT', 'Web3', 'Creator Economy', 'Blockchain', 'Zora', 'Optimism']
  });
  
  // Track initial page load
  analytics.trackPageView();
  performanceService.trackPageLoad();
}

function App() {
  return (
    <ErrorBoundary>
      <Web3Provider>
        <UserProvider>
          <ZoraxLayout>
          <Switch>
            <Route path="/" component={ZoraxHome} />
            <Route path="/dashboard" component={SmartDashboard} />
            <Route path="/modern-dashboard" component={SmartDashboard} />
            <Route path="/creator-dashboard" component={ModernDashboard} />
            <Route path="/supporter-dashboard" component={SupporterDashboard} />
            <Route path="/profile" component={() => <ZoraCreditProfile />} />
            <Route path="/profile" component={() => <ZoraCreditProfile />} />
            <Route path="/profile/:address" component={({ params }) => <ZoraCreditProfile address={params.address} />} />
            <Route path="/community" component={() => (
              <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-background border-b border-border">
                  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Join the ZoraX Community
                      </h1>
                      <p className="text-xl text-muted-foreground">
                        Connect with creators, supporters, and builders shaping the future of Web3 creativity
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Community Features */}
                <div className="max-w-6xl mx-auto px-4 py-16">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-blue-500" />
                      </div>
                      <h2 className="text-xl font-semibold mb-4">Discord Community</h2>
                      <p className="text-muted-foreground mb-6">
                        Join our vibrant Discord server with 5,000+ creators. Get real-time support, share your work, and collaborate on projects.
                      </p>
                      <a 
                        href="https://discord.gg/zorax" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Join Discord
                      </a>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-purple-500" />
                      </div>
                      <h2 className="text-xl font-semibold mb-4">Creator Forums</h2>
                      <p className="text-muted-foreground mb-6">
                        Connect with fellow creators and supporters in our community forums. Share insights, ask questions, and learn from others.
                      </p>
                      <a 
                        href="/forums" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Visit Forums
                      </a>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                        <Calendar className="w-6 h-6 text-green-500" />
                      </div>
                      <h2 className="text-xl font-semibold mb-4">Community Events</h2>
                      <p className="text-muted-foreground mb-6">
                        Join weekly creator showcases, AMAs, and workshops. Learn from successful creators and grow your skills.
                      </p>
                      <a 
                        href="/events" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        <Calendar className="w-4 h-4" />
                        View Events
                      </a>
                    </motion.div>
                  </div>

                  {/* Community Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center"
                  >
                    <h3 className="text-2xl font-semibold mb-6">Growing Community</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                        <div className="text-muted-foreground">Active Creators</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
                        <div className="text-muted-foreground">Community Members</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">500+</div>
                        <div className="text-muted-foreground">Daily Messages</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )} />
            <Route path="/docs" component={DocsPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/create-campaign" component={CreateCampaignPage} />
            <Route path="/campaigns" component={CampaignsPage} />
            <Route path="/campaign/:id" component={({ params }) => <CampaignDetailsPage params={params} />} />
            <Route path="/analytics" component={AnalyticsPage} />
            <Route path="/supporters" component={SupportersPage} />
            <Route path="/reputation" component={ReputationProfile} />
            <Route path="/api" component={ApiDocsPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/careers" component={() => (
              <div className="min-h-screen bg-background flex items-center">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Join Our Mission</h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    We're building the future of creator economies. If you're passionate about empowering creators 
                    and revolutionizing digital ownership, we'd love to hear from you.
                  </p>
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="p-6 rounded-xl bg-muted/30">
                      <h3 className="font-semibold text-foreground mb-2">Remote First</h3>
                      <p className="text-muted-foreground text-sm">Work from anywhere in the world with flexible hours</p>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30">
                      <h3 className="font-semibold text-foreground mb-2">Cutting Edge</h3>
                      <p className="text-muted-foreground text-sm">Work with the latest blockchain and web3 technologies</p>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30">
                      <h3 className="font-semibold text-foreground mb-2">Impact Driven</h3>
                      <p className="text-muted-foreground text-sm">Help creators build sustainable businesses</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Currently building our team. Opportunities coming soon!</p>
                    <a href="/contact" className="pica-button inline-block">Get in Touch</a>
                  </div>
                </div>
              </div>
            )} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/guides" component={() => (
              <div className="min-h-screen bg-background py-12">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Creator Guides</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Learn how to maximize your creator potential and build sustainable relationships with supporters
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Getting Started</h3>
                      <p className="text-muted-foreground text-sm mb-4">Set up your profile and launch your first campaign</p>
                      <a href="/docs" className="text-accent hover:text-accent/80 text-sm font-medium">Read Guide →</a>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Building Community</h3>
                      <p className="text-muted-foreground text-sm mb-4">Strategies for growing and engaging your supporter base</p>
                      <a href="/docs" className="text-accent hover:text-accent/80 text-sm font-medium">Read Guide →</a>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Monetization</h3>
                      <p className="text-muted-foreground text-sm mb-4">Best practices for pricing and campaign optimization</p>
                      <a href="/docs" className="text-accent hover:text-accent/80 text-sm font-medium">Read Guide →</a>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Reputation Building</h3>
                      <p className="text-muted-foreground text-sm mb-4">How to build trust and credibility on ZoraX</p>
                      <a href="/docs" className="text-accent hover:text-accent/80 text-sm font-medium">Read Guide →</a>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Technical Setup</h3>
                      <p className="text-muted-foreground text-sm mb-4">Wallet setup, blockchain basics, and troubleshooting</p>
                      <a href="/docs" className="text-accent hover:text-accent/80 text-sm font-medium">Read Guide →</a>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Advanced Features</h3>
                      <p className="text-muted-foreground text-sm mb-4">Remixing, collaborations, and platform integrations</p>
                      <a href="/docs" className="text-accent hover:text-accent/80 text-sm font-medium">Read Guide →</a>
                    </div>
                  </div>
                </div>
              </div>
            )} />
            <Route path="/tutorials" component={() => (
              <div className="min-h-screen bg-background py-12">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Video Tutorials</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Step-by-step video tutorials to help you master the ZoraX platform
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-xl bg-muted/30">
                      <div className="aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <div className="w-0 h-0 border-l-[8px] border-l-accent border-y-[6px] border-y-transparent ml-1"></div>
                          </div>
                          <p className="text-muted-foreground text-sm">Coming Soon</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Setting Up Your Profile</h3>
                      <p className="text-muted-foreground text-sm">Complete walkthrough of profile creation and customization</p>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30">
                      <div className="aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <div className="w-0 h-0 border-l-[8px] border-l-accent border-y-[6px] border-y-transparent ml-1"></div>
                          </div>
                          <p className="text-muted-foreground text-sm">Coming Soon</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Creating Your First Campaign</h3>
                      <p className="text-muted-foreground text-sm">From concept to launch - everything you need to know</p>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30">
                      <div className="aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <div className="w-0 h-0 border-l-[8px] border-l-accent border-y-[6px] border-y-transparent ml-1"></div>
                          </div>
                          <p className="text-muted-foreground text-sm">Coming Soon</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Understanding Reputation</h3>
                      <p className="text-muted-foreground text-sm">How ZoraCred works and building your reputation score</p>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30">
                      <div className="aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <div className="w-0 h-0 border-l-[8px] border-l-accent border-y-[6px] border-y-transparent ml-1"></div>
                          </div>
                          <p className="text-muted-foreground text-sm">Coming Soon</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Wallet Integration</h3>
                      <p className="text-muted-foreground text-sm">Connecting and managing your crypto wallet securely</p>
                    </div>
                  </div>
                  <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-6">More tutorials are on the way! Subscribe to stay updated.</p>
                    <a href="/contact" className="pica-button">Request a Tutorial</a>
                  </div>
                </div>
              </div>
            )} />
            <Route path="/support" component={() => (
              <div className="min-h-screen bg-background py-12">
                <div className="max-w-4xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Support Center</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Get help with your creator journey on ZoraX
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="p-6 rounded-xl bg-muted/30">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Common Issues</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Wallet connection problems</li>
                        <li>• Campaign creation issues</li>
                        <li>• Profile setup questions</li>
                        <li>• Payment and withdrawal help</li>
                      </ul>
                    </div>
                    <div className="p-6 rounded-xl bg-muted/30">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Resources</h3>
                      <ul className="space-y-2">
                        <li><a href="/docs" className="text-accent hover:text-accent/80">Documentation</a></li>
                        <li><a href="/guides" className="text-accent hover:text-accent/80">Creator Guides</a></li>
                        <li><a href="/tutorials" className="text-accent hover:text-accent/80">Video Tutorials</a></li>
                        <li><a href="/api" className="text-accent hover:text-accent/80">API Reference</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-6">Can't find what you're looking for?</p>
                    <a href="/contact" className="pica-button">Contact Support</a>
                  </div>
                </div>
              </div>
            )} />
            <Route path="/privacy" component={() => (
              <div className="min-h-screen bg-background py-12">
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
                  <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p className="text-lg">Last updated: July 11, 2025</p>
                    
                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
                      <p>At ZoraX, we are committed to protecting your privacy and ensuring transparent data practices. This policy explains how we collect, use, and protect your information.</p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                      <ul className="space-y-2">
                        <li>• Wallet addresses and blockchain transaction data</li>
                        <li>• Profile information you choose to share</li>
                        <li>• Usage analytics to improve our platform</li>
                        <li>• Communication preferences</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Data</h2>
                      <ul className="space-y-2">
                        <li>• To provide and improve our services</li>
                        <li>• To display your public creator profile</li>
                        <li>• To calculate reputation scores</li>
                        <li>• To communicate important updates</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
                      <p>We implement industry-standard security measures to protect your data. Your private keys remain under your control at all times.</p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                      <p>If you have questions about this privacy policy, please <a href="/contact" className="text-accent hover:text-accent/80">contact us</a>.</p>
                    </section>
                  </div>
                </div>
              </div>
            )} />
            <Route path="/terms" component={() => (
              <div className="min-h-screen bg-background py-12">
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
                  <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p className="text-lg">Last updated: July 11, 2025</p>
                    
                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
                      <p>By accessing and using ZoraX, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Platform Rules</h2>
                      <ul className="space-y-2">
                        <li>• You must be 18 years or older to use this platform</li>
                        <li>• You are responsible for the security of your wallet and private keys</li>
                        <li>• Content must not violate copyright or other intellectual property rights</li>
                        <li>• No fraudulent, misleading, or illegal activities</li>
                        <li>• Respectful communication with other users</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Creator Responsibilities</h2>
                      <ul className="space-y-2">
                        <li>• Deliver promised rewards to supporters</li>
                        <li>• Provide accurate campaign information</li>
                        <li>• Maintain professional communication</li>
                        <li>• Comply with applicable tax obligations</li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Platform Fees</h2>
                      <p>ZoraX charges a small platform fee on successful campaigns to maintain and improve our services. Current fee structure is available in our documentation.</p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                      <p>ZoraX provides the platform "as is" and is not responsible for disputes between creators and supporters, blockchain network issues, or external service failures.</p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
                      <p>For questions about these terms, please <a href="/contact" className="text-accent hover:text-accent/80">contact us</a>.</p>
                    </section>
                  </div>
                </div>
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
            </Route>            </Switch>
          </ZoraxLayout>
        </UserProvider>
      </Web3Provider>
    </ErrorBoundary>
  );
}

export default App;