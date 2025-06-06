
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Zap, Settings, Download, Share, Heart, Maximize2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MobileImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('stable-diffusion');
  const [quality, setQuality] = useState([80]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const isMobile = useIsMobile();

  const mockImages = [
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="url(%23grad1)"/><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(139,92,246);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="200" y="200" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Generated Image</text></svg>',
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="url(%23grad2)"/><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(236,72,153);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(168,85,247);stop-opacity:1" /></linearGradient></defs><text x="200" y="200" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">AI Creation</text></svg>',
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

  const promptSuggestions = [
    "A futuristic cityscape at sunset",
    "Mystical forest with glowing mushrooms",
    "Abstract digital art with neon colors",
    "Cute robot in a garden"
  ];

  if (!isMobile) return null;

  return (
    <div className="w-full space-y-4">
      {/* Prompt Input */}
      <Card className="glass-premium p-4 border-purple-500/20">
        <div className="space-y-4">
          <Input
            placeholder="Describe the image you want to create..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="glass border-purple-500/30 focus:border-purple-500 text-base py-4 font-inter bg-transparent touch-manipulation"
            style={{ fontSize: '16px' }} // Prevents zoom on iOS
          />
          
          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="px-3 py-2 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:bg-purple-500/30 transition-colors touch-manipulation active:scale-95 font-inter"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Controls */}
      <div className="flex gap-3">
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="flex-1 bg-gradient-premium hover:opacity-90 text-white font-medium py-4 neon-glow transition-all duration-300 font-inter touch-manipulation active:scale-98"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate
            </>
          )}
        </Button>

        {/* Settings Sheet */}
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="glass border-purple-500/30 p-4 touch-manipulation active:scale-95"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="glass-premium border-purple-500/20">
            <SheetHeader>
              <SheetTitle className="font-inter">Generation Settings</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-3 font-inter">AI Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="glass border-purple-500/30 font-inter h-12">
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
                <label className="block text-sm font-medium mb-3 font-inter">
                  Quality: {quality[0]}%
                </label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  min={10}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Result */}
      <Card className="glass-premium p-4 border-purple-500/20">
        <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
          {isGenerating ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-purple-400 font-inter text-sm">Creating your masterpiece...</p>
            </div>
          ) : generatedImage ? (
            <div className="w-full h-full relative group">
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full h-full object-cover rounded-lg" 
              />
              
              {/* Mobile Action Buttons */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                <Button 
                  size="sm" 
                  className="bg-black/60 text-white hover:bg-black/80 touch-manipulation active:scale-95 backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button 
                  size="sm" 
                  className="bg-black/60 text-white hover:bg-black/80 touch-manipulation active:scale-95 backdrop-blur-sm"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button 
                  size="sm" 
                  className="bg-black/60 text-white hover:bg-black/80 touch-manipulation active:scale-95 backdrop-blur-sm"
                  onClick={() => setShowFullscreen(true)}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-foreground/60">
              <Zap className="w-16 h-16 mb-4 mx-auto opacity-40" />
              <p className="font-inter text-sm">Your generated image will appear here</p>
            </div>
          )}
        </div>
      </Card>

      {/* Fullscreen Image Modal */}
      {showFullscreen && generatedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <div className="relative max-w-full max-h-full">
            <img 
              src={generatedImage} 
              alt="Generated (Fullscreen)" 
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center touch-manipulation active:scale-95"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileImageGenerator;
