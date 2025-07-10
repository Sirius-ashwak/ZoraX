import { ArrowUpRight, ArrowDownRight, TrendingUp, Gift, Check } from 'lucide-react';

export const CoinbaseHome = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to ZoraX</h1>
          <p className="text-muted-foreground">Your Web3 creator economy platform</p>
        </div>
        <button className="coinbase-button flex items-center gap-2">
          <Gift size={16} />
          Send gift
        </button>
      </div>

      {/* Progress Section */}
      <div className="coinbase-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Check size={14} className="text-primary-foreground" />
          </div>
          <span className="font-medium text-foreground">You're almost there</span>
        </div>
        
        <h2 className="text-xl font-bold text-foreground mb-2">Fund your account</h2>
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
        <p className="text-sm text-muted-foreground mb-6">2/4</p>

        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Remaining steps</h3>
          <p className="text-sm text-muted-foreground">
            You're close to finishing your account setup. Next up, add a payment method.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-muted-foreground">Account created</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-muted-foreground">Verify your info</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 bg-border rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              </div>
              <span className="text-foreground font-medium">Add a payment method</span>
              <span className="text-xs text-muted-foreground">Get ready to trade</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 bg-border rounded-full"></div>
              <span className="text-muted-foreground">Buy your first crypto</span>
              <span className="text-xs text-muted-foreground">Jump start your crypto portfolio</span>
            </div>
          </div>

          <button className="coinbase-button w-full mt-6">
            Add payment method
          </button>
        </div>
      </div>

      {/* Top Movers Section */}
      <div className="coinbase-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Top Movers</h2>
          <button className="text-primary text-sm font-medium hover:text-primary/80">
            See less
          </button>
        </div>

        <div className="space-y-4">
          {/* Crypto Asset Row */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Convex Finance</div>
                <div className="text-sm text-muted-foreground">CVX</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-foreground">$4.91</div>
              <div className="text-sm text-success flex items-center gap-1">
                <TrendingUp size={12} />
                25.67%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Pawtoool</div>
                <div className="text-sm text-muted-foreground">UPI</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-foreground">$0.00</div>
              <div className="text-sm text-success flex items-center gap-1">
                <TrendingUp size={12} />
                25.21%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Decentraland</div>
                <div className="text-sm text-muted-foreground">MANA</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-foreground">$0.70</div>
              <div className="text-sm text-success flex items-center gap-1">
                <TrendingUp size={12} />
                21.77%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Golem (Old)</div>
                <div className="text-sm text-muted-foreground">GNT</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-foreground">$0.18</div>
              <div className="text-sm text-destructive flex items-center gap-1">
                <TrendingUp size={12} className="rotate-180" />
                17.45%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="coinbase-card p-6">
          <h3 className="font-bold text-foreground mb-2">Create Campaign</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Launch your creator campaign with ZoraX
          </p>
          <button className="coinbase-button w-full">
            Get started
          </button>
        </div>

        <div className="coinbase-card p-6">
          <h3 className="font-bold text-foreground mb-2">Explore Creators</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Discover and support amazing creators
          </p>
          <button className="coinbase-button-secondary w-full">
            Explore now
          </button>
        </div>
      </div>
    </div>
  );
};