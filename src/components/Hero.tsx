
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, Image as ImageIcon, Zap } from 'lucide-react';

const Hero = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const exampleImages = [
    { title: 'Digital Art', description: 'Futuristic cityscape' },
    { title: 'Portrait', description: 'Realistic character' },
    { title: 'Landscape', description: 'Ethereal mountains' },
    { title: 'Abstract', description: 'Geometric patterns' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-premium rounded-full px-6 py-3 mb-8 fade-in-up neon-glow-cyan">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium font-inter">Powered by Advanced AI Models</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight fade-in-up-delay font-inter">
            Transform Your Ideas Into{' '}
            <span className="text-gradient floating-element">Stunning Images</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed fade-in-up font-inter" 
             style={{ animationDelay: '0.4s', opacity: 0, transform: 'translateY(30px)' }}>
            Harness the power of AI to create breathtaking visuals from simple text prompts.
            Professional-quality images in seconds.
          </p>

          {/* Demo Generator */}
          <div className="max-w-2xl mx-auto mb-12 fade-in-up" 
               style={{ animationDelay: '0.6s', opacity: 0, transform: 'translateY(30px)' }}>
            <Card className="glass-premium p-6 hover-lift neon-glow border-purple-500/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Describe the image you want to create..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="glass border-purple-500/30 focus:border-purple-500 text-lg py-3 font-inter bg-transparent"
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-gradient-premium hover:opacity-90 text-white font-medium px-8 py-3 neon-glow transition-all duration-300 font-inter"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>
              
              {isGenerating && (
                <div className="mt-6 p-4 glass-premium rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-purple-400 animate-pulse" />
                    <span className="text-purple-400 font-inter">Creating your masterpiece...</span>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 fade-in-up"
               style={{ animationDelay: '0.8s', opacity: 0, transform: 'translateY(30px)' }}>
            <Button size="lg" className="bg-gradient-premium hover:opacity-90 text-white font-medium px-8 py-4 neon-glow transition-all duration-300 font-inter">
              Generate Your First Image
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="glass-premium border-purple-500/30 hover:border-purple-500 px-8 py-4 hover:bg-purple-500/10 transition-all duration-300 font-inter">
              View Examples
            </Button>
          </div>

          {/* Example Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-in-up"
               style={{ animationDelay: '1s', opacity: 0, transform: 'translateY(30px)' }}>
            {exampleImages.map((image, index) => (
              <Card key={index} className="glass-premium hover-lift group cursor-pointer overflow-hidden border-purple-500/20 neon-glow-blue transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center relative">
                  <ImageIcon className="w-12 h-12 text-purple-400/60 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white font-medium text-sm font-inter">{image.title}</h4>
                    <p className="text-white/80 text-xs font-inter">{image.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
