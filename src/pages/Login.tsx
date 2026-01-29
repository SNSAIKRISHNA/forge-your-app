import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { GradientButton } from '@/components/ui/GradientButton';
import { GradientInput } from '@/components/ui/GradientInput';
import { IconBadge } from '@/components/ui/IconBadge';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // Navigate based on user role
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <ParticlesBackground />
      
      <div className="w-full max-w-md z-10 fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <IconBadge icon={LogIn} size="lg" />
          </div>
          
          <h1 className="font-display text-4xl font-bold italic text-foreground mb-3">
            Welcome Back
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Sign in to continue your Onboarding
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <GradientInput
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <GradientInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          <GradientButton
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </GradientButton>
        </form>

        <p className="text-center mt-6 text-muted-foreground text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
