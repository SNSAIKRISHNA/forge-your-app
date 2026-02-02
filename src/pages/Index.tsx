import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import crystalAvatar from '@/assets/crystal-avatar.png';

const featurePills = [
  { title: 'CrystalStudio', subtitle: 'Plan + Create' },
  { title: 'CrystalCast', subtitle: 'Publish + Distribute' },
  { title: 'CrystalOptimize', subtitle: 'Test + Improve' },
  { title: 'CrystalVision', subtitle: 'Understand + Recommend' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="font-bold text-primary text-lg">C</span>
          </div>
          <span className="font-semibold text-lg text-foreground">Crystal AI</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-4 pb-16">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          {/* Crystal Avatar Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-64 h-80 md:w-72 md:h-96">
              <img 
                src={crystalAvatar} 
                alt="Crystal AI Avatar" 
                className="w-full h-full object-contain animate-float drop-shadow-[0_0_40px_rgba(0,230,230,0.3)]"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-2xl -z-10" />
            </div>
          </div>

          {/* Welcome badge */}
          <div className="space-y-2 mb-2">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Welcome to Crystal AI Suite
            </span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            Let's Shape Your AI Avatar
          </h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-lg mb-8">
            Your crystal will evolve as you define your brand's voice, personality, and content focus. Together, we'll create an AI agent that truly represents your unique identity.
          </p>
          
          {/* Feature pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 text-sm">
            {featurePills.map((pill) => (
              <div key={pill.title} className="glass-card p-3 text-center">
                <div className="font-semibold text-foreground text-xs">{pill.title}</div>
                <div className="text-muted-foreground text-xs">{pill.subtitle}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/register">
            <GradientButton size="lg" className="h-14 rounded-2xl px-10 text-lg">
              Begin Your Journey
            </GradientButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Crystal AI Suite. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
