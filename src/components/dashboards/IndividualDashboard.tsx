import { 
  Home, 
  FileText, 
  Settings, 
  LogOut,
  User,
  BarChart3,
  Palette,
  Zap,
  Layers,
} from 'lucide-react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Content' },
  { icon: Layers, label: 'Projects' },
  { icon: Palette, label: 'Brand Voice' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

const IndividualDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      <ParticlesBackground />
      
      {/* Sidebar */}
      <aside className="w-64 bg-card/50 backdrop-blur-sm border-r border-border p-6 flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl icon-container flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">Crystal</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                activeNav === item.label
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.fullName || user?.email}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.occupation || 'Individual'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative z-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 fade-in">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.fullName?.split(' ')[0] || 'Creator'}
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              Here's your personal dashboard overview
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 stagger-children">
            <StatCard
              title="Content Created"
              value="24"
              change="+12%"
              icon={FileText}
            />
            <StatCard
              title="Active Projects"
              value="8"
              change="+28%"
              icon={Layers}
            />
            <StatCard
              title="Brand Score"
              value="89%"
              change="+5%"
              icon={BarChart3}
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-10 slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard
                icon={FileText}
                title="New Content"
                description="Create new content piece"
              />
              <QuickActionCard
                icon={Layers}
                title="New Project"
                description="Start a new project"
              />
              <QuickActionCard
                icon={Palette}
                title="Brand Voice"
                description="Update your voice"
              />
              <QuickActionCard
                icon={Settings}
                title="Preferences"
                description="Adjust settings"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Recent Activity
            </h2>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-border last:border-0"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Created blog post content
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                    <span className="badge-success px-3 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  change: string;
  icon: React.ElementType;
}) => (
  <div className="card-hover bg-card rounded-xl p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="badge-success px-2 py-1 rounded text-xs font-mono">
        {change}
      </span>
    </div>
    <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
    <p className="text-sm text-muted-foreground">{title}</p>
  </div>
);

const QuickActionCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <button className="card-hover bg-card rounded-xl p-5 text-left transition-all group">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h3 className="font-medium text-foreground mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground">{description}</p>
  </button>
);

export default IndividualDashboard;
