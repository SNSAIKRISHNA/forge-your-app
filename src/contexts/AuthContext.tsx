import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'individual' | 'organization_admin' | 'organization_member';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  occupation?: string;
  organizationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  teamSize: string;
  website?: string;
  ownerId: string;
  members: OrganizationMember[];
  createdAt: Date;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUserProfile: (profile: Partial<User>) => void;
  createOrganization: (org: Omit<Organization, 'id' | 'ownerId' | 'members' | 'createdAt'>) => void;
  addMemberToOrganization: (email: string, name: string, role: OrganizationMember['role']) => void;
  removeMemberFromOrganization: (memberId: string) => void;
  updateMemberRole: (memberId: string, role: OrganizationMember['role']) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users database for demo
const mockUsers: { email: string; password: string; user: User }[] = [];
const mockOrganizations: Organization[] = [];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('crystal_user');
    const storedOrg = localStorage.getItem('crystal_organization');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedOrg) {
      setOrganization(JSON.parse(storedOrg));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (existingUser) {
      setUser(existingUser.user);
      localStorage.setItem('crystal_user', JSON.stringify(existingUser.user));
      
      // Load organization if user is part of one
      if (existingUser.user.organizationId) {
        const org = mockOrganizations.find(o => o.id === existingUser.user.organizationId);
        if (org) {
          setOrganization(org);
          localStorage.setItem('crystal_organization', JSON.stringify(org));
        }
      }
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const exists = mockUsers.find(u => u.email === email);
    if (exists) {
      return { success: false, error: 'Email already registered' };
    }
    
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      role: 'individual', // Default role, will be updated in onboarding
    };
    
    mockUsers.push({ email, password, user: newUser });
    setUser(newUser);
    localStorage.setItem('crystal_user', JSON.stringify(newUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    localStorage.removeItem('crystal_user');
    localStorage.removeItem('crystal_organization');
  };

  const setUserProfile = (profile: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);
      localStorage.setItem('crystal_user', JSON.stringify(updatedUser));
      
      // Update in mock database
      const userIndex = mockUsers.findIndex(u => u.user.id === user.id);
      if (userIndex >= 0) {
        mockUsers[userIndex].user = updatedUser;
      }
    }
  };

  const createOrganization = (org: Omit<Organization, 'id' | 'ownerId' | 'members' | 'createdAt'>) => {
    if (!user) return;
    
    const newOrg: Organization = {
      ...org,
      id: crypto.randomUUID(),
      ownerId: user.id,
      members: [{
        id: crypto.randomUUID(),
        userId: user.id,
        email: user.email,
        name: user.fullName || user.email,
        role: 'owner',
        joinedAt: new Date(),
      }],
      createdAt: new Date(),
    };
    
    mockOrganizations.push(newOrg);
    setOrganization(newOrg);
    localStorage.setItem('crystal_organization', JSON.stringify(newOrg));
    
    // Update user role and org ID
    setUserProfile({ 
      role: 'organization_admin',
      organizationId: newOrg.id,
    });
  };

  const addMemberToOrganization = (email: string, name: string, role: OrganizationMember['role']) => {
    if (!organization) return;
    
    const newMember: OrganizationMember = {
      id: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      email,
      name,
      role,
      joinedAt: new Date(),
    };
    
    const updatedOrg = {
      ...organization,
      members: [...organization.members, newMember],
    };
    
    setOrganization(updatedOrg);
    localStorage.setItem('crystal_organization', JSON.stringify(updatedOrg));
    
    // Update in mock database
    const orgIndex = mockOrganizations.findIndex(o => o.id === organization.id);
    if (orgIndex >= 0) {
      mockOrganizations[orgIndex] = updatedOrg;
    }
  };

  const removeMemberFromOrganization = (memberId: string) => {
    if (!organization) return;
    
    const updatedOrg = {
      ...organization,
      members: organization.members.filter(m => m.id !== memberId),
    };
    
    setOrganization(updatedOrg);
    localStorage.setItem('crystal_organization', JSON.stringify(updatedOrg));
    
    const orgIndex = mockOrganizations.findIndex(o => o.id === organization.id);
    if (orgIndex >= 0) {
      mockOrganizations[orgIndex] = updatedOrg;
    }
  };

  const updateMemberRole = (memberId: string, role: OrganizationMember['role']) => {
    if (!organization) return;
    
    const updatedOrg = {
      ...organization,
      members: organization.members.map(m => 
        m.id === memberId ? { ...m, role } : m
      ),
    };
    
    setOrganization(updatedOrg);
    localStorage.setItem('crystal_organization', JSON.stringify(updatedOrg));
    
    const orgIndex = mockOrganizations.findIndex(o => o.id === organization.id);
    if (orgIndex >= 0) {
      mockOrganizations[orgIndex] = updatedOrg;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        organization,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setUserProfile,
        createOrganization,
        addMemberToOrganization,
        removeMemberFromOrganization,
        updateMemberRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
