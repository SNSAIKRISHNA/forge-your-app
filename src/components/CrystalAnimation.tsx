import { useEffect, useRef } from 'react';

export const CrystalAnimation = () => {
  const crystalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const crystal = crystalRef.current;
    if (!crystal) return;

    let animationFrame: number;
    let rotation = 0;

    const animate = () => {
      rotation += 0.3;
      crystal.style.transform = `rotateY(${rotation}deg) rotateX(5deg)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative w-64 h-80 mx-auto perspective-1000">
      {/* Glow effect behind crystal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* 3D Crystal */}
      <div 
        ref={crystalRef}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Crystal body - using CSS shapes */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="crystal-gem">
            {/* Main crystal body */}
            <div className="crystal-face crystal-front" />
            <div className="crystal-face crystal-back" />
            <div className="crystal-face crystal-left" />
            <div className="crystal-face crystal-right" />
            <div className="crystal-face crystal-top" />
            <div className="crystal-face crystal-bottom" />
            
            {/* Inner glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-40 bg-gradient-to-b from-primary/40 via-accent/30 to-primary/20 blur-md rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles around crystal */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
