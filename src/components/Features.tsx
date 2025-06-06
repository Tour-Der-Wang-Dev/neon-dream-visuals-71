
import { Card } from '@/components/ui/card';
import { Brain, Zap, Download, Code, Palette, Shield } from 'lucide-react';

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

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Powerful Features for{' '}
            <span className="text-gradient">Creative Professionals</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Everything you need to bring your imagination to life with cutting-edge AI technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass hover-lift group p-8 relative overflow-hidden border-white/10 hover:border-primary/30 transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-background rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10M+', label: 'Images Generated' },
            { number: '50K+', label: 'Happy Users' },
            { number: '99.9%', label: 'Uptime' },
            { number: '< 5s', label: 'Average Generation Time' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-foreground/60 text-sm">
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
