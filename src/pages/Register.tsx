import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { GradientButton } from '@/components/ui/GradientButton';
import { GradientInput } from '@/components/ui/GradientInput';
import { IconBadge } from '@/components/ui/IconBadge';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    const result = await register(email, password);
    
    if (result.success) {
      navigate('/onboarding');
    } else {
      setError(result.error || 'Registration failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <ParticlesBackground />
      
      <div className="w-full max-w-md z-10 fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <IconBadge icon={UserPlus} size="lg" />
          </div>
          
          <h1 className="font-display text-4xl font-bold italic text-foreground mb-3">
            Join Us Today
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Create your account and start your journey
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
          
          <GradientInput
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? 'Creating account...' : 'Create Account'}
          </GradientButton>
        </form>

        <p className="text-center mt-6 text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
