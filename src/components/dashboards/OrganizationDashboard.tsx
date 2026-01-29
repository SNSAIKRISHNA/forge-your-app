import { useState } from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  LogOut,
  Building2,
  UserPlus,
  MoreVertical,
  Mail,
  Shield,
  Trash2,
  FileText,
  Sparkles,
  BarChart3,
  Zap,
} from 'lucide-react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { useAuth, OrganizationMember } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GradientButton } from '@/components/ui/GradientButton';
import { GradientInput } from '@/components/ui/GradientInput';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavItem {
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Dashboard' },
  { icon: Users, label: 'Team' },
  { icon: FileText, label: 'Content' },
  { icon: Sparkles, label: 'AI Tools' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

const OrganizationDashboard = () => {
  const { user, organization, logout, addMemberToOrganization, removeMemberFromOrganization, updateMemberRole } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<OrganizationMember['role']>('member');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddMember = () => {
    if (newMemberEmail && newMemberName) {
      addMemberToOrganization(newMemberEmail, newMemberName, newMemberRole);
      setNewMemberEmail('');
      setNewMemberName('');
      setNewMemberRole('member');
      setIsAddMemberOpen(false);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'owner':
        return 'badge-primary';
      case 'admin':
        return 'badge-warning';
      default:
        return 'badge-success';
    }
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
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {organization?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {organization?.members.length} members
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
          {activeNav === 'Dashboard' && (
            <>
              {/* Header */}
              <div className="mb-10 fade-in">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  {organization?.name}
                </h1>
                <p className="text-muted-foreground font-mono text-sm">
                  Organization dashboard • {organization?.industry}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 stagger-children">
                <StatCard
                  title="Team Members"
                  value={String(organization?.members.length || 0)}
                  icon={Users}
                />
                <StatCard
                  title="Content Created"
                  value="142"
                  icon={FileText}
                />
                <StatCard
                  title="AI Generations"
                  value="1.2k"
                  icon={Sparkles}
                />
                <StatCard
                  title="Brand Score"
                  value="94%"
                  icon={BarChart3}
                />
              </div>

              {/* Team Preview */}
              <div className="slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Team Members
                  </h2>
                  <button 
                    onClick={() => setActiveNav('Team')}
                    className="text-primary text-sm hover:underline"
                  >
                    View all →
                  </button>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="space-y-3">
                    {organization?.members.slice(0, 4).map((member) => (
                      <MemberRow key={member.id} member={member} compact />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeNav === 'Team' && (
            <>
              {/* Team Header */}
              <div className="flex items-center justify-between mb-8 fade-in">
                <div>
                  <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                    Team Management
                  </h1>
                  <p className="text-muted-foreground font-mono text-sm">
                    Manage your organization members and their roles
                  </p>
                </div>
                
                <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                  <DialogTrigger asChild>
                    <GradientButton>
                      <UserPlus className="w-4 h-4" />
                      Add Member
                    </GradientButton>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl">
                        Add Team Member
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <GradientInput
                        label="Full name"
                        placeholder="e.g. John Doe"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                      />
                      <GradientInput
                        label="Email address"
                        type="email"
                        placeholder="john@company.com"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                      />
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Role
                        </label>
                        <Select value={newMemberRole} onValueChange={(v) => setNewMemberRole(v as OrganizationMember['role'])}>
                          <SelectTrigger className="input-dark w-full h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <GradientButton
                        onClick={handleAddMember}
                        className="w-full"
                        disabled={!newMemberEmail || !newMemberName}
                      >
                        Add Member
                      </GradientButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Members List */}
              <div className="bg-card rounded-xl border border-border slide-up">
                <div className="p-6 border-b border-border">
                  <h3 className="font-medium text-foreground">
                    All Members ({organization?.members.length})
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {organization?.members.map((member) => (
                    <MemberRow
                      key={member.id}
                      member={member}
                      onUpdateRole={(role) => updateMemberRole(member.id, role)}
                      onRemove={() => removeMemberFromOrganization(member.id)}
                      canModify={member.role !== 'owner'}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  icon: React.ElementType;
}) => (
  <div className="card-hover bg-card rounded-xl p-6">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
    <p className="text-sm text-muted-foreground">{title}</p>
  </div>
);

const MemberRow = ({
  member,
  compact = false,
  onUpdateRole,
  onRemove,
  canModify = true,
}: {
  member: OrganizationMember;
  compact?: boolean;
  onUpdateRole?: (role: OrganizationMember['role']) => void;
  onRemove?: () => void;
  canModify?: boolean;
}) => {
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'owner':
        return 'badge-primary';
      case 'admin':
        return 'badge-warning';
      default:
        return 'badge-success';
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-4",
      compact ? "py-2" : "p-6"
    )}>
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-semibold text-primary">
          {member.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {member.name}
        </p>
        {!compact && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="w-3 h-3" />
            {member.email}
          </div>
        )}
      </div>
      <span className={cn(
        "px-3 py-1 rounded-full text-xs font-medium capitalize",
        getRoleBadgeClass(member.role)
      )}>
        {member.role}
      </span>
      {!compact && canModify && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem onClick={() => onUpdateRole?.('admin')} className="cursor-pointer">
              <Shield className="w-4 h-4 mr-2" />
              Make Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateRole?.('member')} className="cursor-pointer">
              <Users className="w-4 h-4 mr-2" />
              Make Member
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onRemove}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default OrganizationDashboard;
