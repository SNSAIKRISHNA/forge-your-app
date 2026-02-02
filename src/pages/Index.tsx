import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import { CrystalAnimation } from '@/components/CrystalAnimation';

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
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="font-display font-bold text-primary text-lg">C</span>
          </div>
          <span className="font-sans font-semibold text-lg text-foreground">Crystal</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-8 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Crystal Animation */}
          <div className="mb-8">
            <CrystalAnimation />
          </div>

          {/* Welcome badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-sans text-primary">Welcome to Crystal Suite</span>
          </div>
          
          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Let's Shape Your</span>
            <br />
            <span className="text-gradient">Brand Identity</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            Your crystal will evolve as you define your brand's voice, personality, and content focus. Together, we'll create content that truly represents your unique identity.
          </p>
          
          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {featurePills.map((pill) => (
              <div key={pill.title} className="feature-pill">
                <p className="font-semibold text-foreground text-sm">{pill.title}</p>
                <p className="text-xs text-muted-foreground">{pill.subtitle}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/register">
            <GradientButton size="lg" className="min-w-[200px]">
              Begin Your Journey
            </GradientButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Crystal Suite. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
