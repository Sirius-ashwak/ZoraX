import { Link, useLocation } from 'wouter';
import { 
  Home, 
  BarChart3, 
  TrendingUp, 
  Percent, 
  Globe, 
  CreditCard,
  MoreVertical,
  Gift,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: string;
  isNew?: boolean;
}

const mainItems: SidebarItem[] = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BarChart3, label: 'My assets', href: '/assets' },
  { icon: TrendingUp, label: 'Trade', href: '/trade' },
  { icon: Percent, label: 'Earn', href: '/earn' },
  { icon: Globe, label: 'Web3', href: '/web3', badge: 'NEW', isNew: true },
  { icon: CreditCard, label: 'Pay', href: '/pay' },
];

const bottomItems: SidebarItem[] = [
  { icon: Gift, label: 'Get $10', href: '/rewards' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
  { icon: MoreVertical, label: 'More', href: '/more' },
];

export const CoinbaseSidebar = () => {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location === '/';
    }
    return location.startsWith(href);
  };

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Z</span>
          </div>
          <span className="text-xl font-bold text-foreground">ZoraX</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item ${active ? 'sidebar-item-active' : ''}`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {item.isNew && (
                  <span className="ml-auto px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item ${active ? 'sidebar-item-active' : ''}`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};