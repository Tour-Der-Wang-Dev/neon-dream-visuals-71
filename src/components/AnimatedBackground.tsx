
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const particleCount = 15;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${particle.delay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <div className="geometric-shape w-32 h-32 border border-purple-500/20 top-20 left-20">
        <div className="w-full h-full border border-blue-500/20 rotate-45" />
      </div>

      <div className="geometric-shape w-24 h-24 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full top-1/3 right-20" 
           style={{ animationDelay: '5s' }} />

      <div className="geometric-shape w-16 h-16 border-2 border-cyan-500/20 rotate-45 bottom-32 left-1/4"
           style={{ animationDelay: '10s' }} />

      <div className="geometric-shape w-20 h-20 bg-gradient-to-br from-purple-600/10 to-pink-500/10 bottom-20 right-1/3 rounded-lg"
           style={{ animationDelay: '7s' }} />

      {/* Large Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse floating-element" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse floating-element-delay" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse floating-element" 
           style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default AnimatedBackground;
