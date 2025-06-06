
import { Card } from '@/components/ui/card';
import { Brain, Zap, Download, Code, Palette, Shield } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import BeforeAfterSlider from './BeforeAfterSlider';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Multiple AI Models',
      description: 'Access DALL-E, Stable Diffusion, Midjourney-style models and more. Choose the perfect AI for your creative vision.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate high-quality images in seconds, not minutes. Our optimized infrastructure ensures rapid processing.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Download,
      title: 'High Resolution',
      description: 'Download images up to 4K resolution. Perfect for print, web, or any professional application.',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Code,
      title: 'API Integration',
      description: 'Seamlessly integrate our AI image generation into your applications with our developer-friendly API.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Style Control',
      description: 'Fine-tune artistic styles, color palettes, and composition. Full creative control at your fingertips.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Ready',
      description: 'SOC 2 compliant with enterprise-grade security. Safe for business use with commercial licensing.',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  const beforeAfterExamples = [
    {
      beforeImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23333"/><text x="200" y="150" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Original Sketch</text></svg>',
      afterImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="url(%23grad1)"/><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(139,92,246);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="200" y="150" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">AI Enhanced</text></svg>',
      title: 'Sketch to Masterpiece',
      description: 'Transform simple sketches into detailed artwork'
    },
    {
      beforeImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23555"/><text x="200" y="150" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Basic Photo</text></svg>',
      afterImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="url(%23grad2)"/><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(236,72,153);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(168,85,247);stop-opacity:1" /></linearGradient></defs><text x="200" y="150" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Artistic Style</text></svg>',
      title: 'Style Transfer',
      description: 'Apply artistic styles to any image'
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-inter fade-in-up">
            Powerful Features for{' '}
            <span className="text-gradient">Creative Professionals</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed font-inter fade-in-up-delay">
            Everything you need to bring your imagination to life with cutting-edge AI technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-premium hover-lift group p-8 relative overflow-hidden border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 neon-glow-blue fade-in-up tilt-card"
              style={{ 
                animationDelay: `${0.1 * index}s`, 
                opacity: 0, 
                transform: 'translateY(30px)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300 neon-glow floating-element`}>
                <div className="w-full h-full bg-background rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-400 transition-colors duration-300 font-inter">
                {feature.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed font-inter">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Before/After Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 font-inter">
              See the <span className="text-gradient">Transformation</span>
            </h3>
            <p className="text-lg text-foreground/80 font-inter">
              Witness the power of AI image enhancement and style transfer
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {beforeAfterExamples.map((example, index) => (
              <BeforeAfterSlider key={index} {...example} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: 10000000, label: 'Images Generated', suffix: '+' },
            { number: 50000, label: 'Happy Users', suffix: '+' },
            { number: 99.9, label: 'Uptime', suffix: '%' },
            { number: 5, label: 'Avg Generation Time', suffix: 's', prefix: '< ' }
          ].map((stat, index) => (
            <div key={index} className="text-center fade-in-up" style={{ animationDelay: `${0.2 * index}s`, opacity: 0, transform: 'translateY(30px)' }}>
              <AnimatedCounter 
                end={stat.number} 
                suffix={stat.suffix} 
                prefix={stat.prefix}
              />
              <div className="text-foreground/60 text-sm font-inter mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
