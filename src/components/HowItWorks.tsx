
import { Card } from '@/components/ui/card';
import { Edit3, Settings, Download } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      icon: Edit3,
      title: 'Enter Your Prompt',
      description: 'Describe your vision in natural language. Be as detailed or creative as you want.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      icon: Settings,
      title: 'Choose AI Model',
      description: 'Select from our collection of advanced AI models optimized for different styles and use cases.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '03',
      icon: Download,
      title: 'Download Your Image',
      description: 'Get your high-resolution image in seconds. Edit, share, or use commercially.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Create stunning images in three simple steps. No design experience required.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent transform -translate-x-1/2" />
                )}
                
                <Card className="glass hover-lift group p-8 text-center relative overflow-hidden border-white/10 hover:border-primary/30 transition-all duration-300">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors duration-300">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connector Dot (Desktop) */}
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-3 h-3 bg-primary rounded-full transform -translate-y-1/2 animate-pulse-neon" />
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="glass p-8 max-w-2xl mx-auto hover-lift">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-foreground/80 mb-6">
              Join thousands of creators who are already using AI to bring their ideas to life.
            </p>
            <button className="bg-gradient-primary hover:opacity-90 text-white font-medium px-8 py-3 rounded-lg transition-opacity duration-300 animate-pulse-neon">
              Start Creating Now
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
