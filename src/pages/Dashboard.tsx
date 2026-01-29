import { useAuth } from '@/contexts/AuthContext';
import IndividualDashboard from '@/components/dashboards/IndividualDashboard';
import OrganizationDashboard from '@/components/dashboards/OrganizationDashboard';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ParticlesBackground />
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  // Route to appropriate dashboard based on role
  if (user.role === 'organization_admin' || user.role === 'organization_member') {
    return <OrganizationDashboard />;
  }

  return <IndividualDashboard />;
};

export default Dashboard;
