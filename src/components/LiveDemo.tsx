
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Zap, Download, Share, Heart } from 'lucide-react';

const LiveDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('stable-diffusion');
  const [quality, setQuality] = useState([80]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const mockImages = [
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="url(%23grad1)"/><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(139,92,246);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="200" y="200" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Generated Image</text></svg>',
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="url(%23grad2)"/><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(236,72,153);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(168,85,247);stop-opacity:1" /></linearGradient></defs><text x="200" y="200" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">AI Creation</text></svg>',
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="url(%23grad3)"/><defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(34,197,94);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="200" y="200" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Digital Art</text></svg>'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      setGeneratedImage(randomImage);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-inter fade-in-up">
            Try Our <span className="text-gradient">AI Generator</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed font-inter fade-in-up-delay">
            Experience the power of AI image generation with our live demo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Controls */}
          <Card className="glass-premium p-8 hover-lift neon-glow-blue border-purple-500/20">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 font-inter">Prompt</label>
                <Input
                  placeholder="A futuristic cityscape at sunset..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="glass border-purple-500/30 focus:border-purple-500 font-inter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 font-inter">AI Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="glass border-purple-500/30 font-inter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-premium border-purple-500/20">
                    <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                    <SelectItem value="dall-e">DALL-E 2</SelectItem>
                    <SelectItem value="midjourney">Midjourney Style</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 font-inter">Quality: {quality[0]}%</label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  min={10}
                  step={10}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-premium hover:opacity-90 text-white font-medium py-4 neon-glow transition-all duration-300 font-inter"
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
          </Card>

          {/* Result */}
          <Card className="glass-premium p-8 hover-lift neon-glow border-purple-500/20">
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isGenerating ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-purple-400 font-inter">Creating your masterpiece...</p>
                </div>
              ) : generatedImage ? (
                <div className="w-full h-full relative group">
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button size="sm" variant="outline" className="glass border-white/30 text-white hover:bg-white/20">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="glass border-white/30 text-white hover:bg-white/20">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" variant="outline" className="glass border-white/30 text-white hover:bg-white/20">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-foreground/60">
                  <Zap className="w-16 h-16 mb-4 mx-auto opacity-40" />
                  <p className="font-inter">Your generated image will appear here</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
