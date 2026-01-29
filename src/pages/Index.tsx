import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Users, Sparkles, Shield } from 'lucide-react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { GradientButton } from '@/components/ui/GradientButton';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl icon-container flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">Crystal</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <GradientButton variant="outline" size="sm">
              Sign In
            </GradientButton>
          </Link>
          <Link to="/register">
            <GradientButton size="sm">
              Get Started
            </GradientButton>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">AI-Powered Content Platform</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Create content that
            <br />
            <span className="text-gradient italic">defines your brand</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-mono">
            Crystal helps creators and teams build their brand voice, generate content, and scale their presence with AI-powered tools.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <GradientButton size="lg">
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </Link>
            <Link to="/login">
              <GradientButton variant="outline" size="lg">
                Sign In
              </GradientButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-6 lg:px-12 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Users}
              title="For Individuals"
              description="Build your personal brand with AI-tailored content that matches your unique voice and style."
            />
            <FeatureCard
              icon={Shield}
              title="For Organizations"
              description="Collaborate with your team, manage brand guidelines, and scale content creation together."
            />
            <FeatureCard
              icon={Sparkles}
              title="AI-Powered"
              description="Generate high-quality content instantly with advanced AI that learns your preferences."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">Crystal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Crystal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="card-hover bg-card rounded-2xl p-8 gradient-bar-bottom">
    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="font-display text-xl font-bold text-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default Index;
