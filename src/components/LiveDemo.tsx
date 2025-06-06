import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Settings, Images, Sparkles } from 'lucide-react';
import PromptSuggestions from '@/components/PromptSuggestions';
import StylePresets from '@/components/StylePresets';
import ParameterControls from '@/components/ParameterControls';
import PromptExamples from '@/components/PromptExamples';
import CommunityGallery from '@/components/CommunityGallery';
import SocialShare from '@/components/SocialShare';

const LiveDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [parameters, setParameters] = useState({
    steps: [25],
    cfgScale: [7],
    seed: 12345,
    aspectRatio: '1:1'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleParameterChange = (param: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate progressive generation with realistic progress
    const progressSteps = [10, 25, 45, 65, 80, 95, 100];
    const stepDuration = 400;
    
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setGenerationProgress(progressSteps[i]);
    }
    
    // Simulate API result
    const mockImages = [
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="url(%23grad1)"/><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(139,92,246);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="256" y="256" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Generated: ' + selectedStyle + '</text></svg>',
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="url(%23grad2)"/><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(236,72,153);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(168,85,247);stop-opacity:1" /></linearGradient></defs><text x="256" y="256" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">AI Creation</text></svg>',
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="url(%23grad3)"/><defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(34,197,94);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="256" y="256" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Digital Art</text></svg>'
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setGeneratedImage(randomImage);
    setIsGenerating(false);
    setGenerationProgress(0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <section id="demo" className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-inter fade-in-up">
            Advanced <span className="text-gradient">AI Generator</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed font-inter fade-in-up-delay">
            Create stunning images with our powerful AI tools and community features
          </p>
        </div>

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-premium mb-8">
            <TabsTrigger value="generator" className="font-inter">
              <Zap className="w-4 h-4 mr-2" />
              Generator
            </TabsTrigger>
            <TabsTrigger value="examples" className="font-inter">
              <Sparkles className="w-4 h-4 mr-2" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="gallery" className="font-inter">
              <Images className="w-4 h-4 mr-2" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Panel - Controls */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-premium p-6 border-purple-500/20">
                  <div className="space-y-6">
                    {/* Prompt Input */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 font-inter">Prompt</label>
                      <Input
                        placeholder="Describe your vision..."
                        value={prompt}
                        onChange={(e) => {
                          setPrompt(e.target.value);
                          setShowSuggestions(e.target.value.length > 2);
                        }}
                        onFocus={() => setShowSuggestions(prompt.length > 2)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="glass border-purple-500/30 focus:border-purple-500 font-inter text-lg py-4"
                      />
                      {showSuggestions && (
                        <PromptSuggestions 
                          prompt={prompt} 
                          onSuggestionClick={handleSuggestionClick}
                        />
                      )}
                    </div>

                    {/* Style Presets */}
                    <StylePresets 
                      selectedStyle={selectedStyle}
                      onStyleChange={setSelectedStyle}
                    />

                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      className="w-full bg-gradient-premium hover:opacity-90 text-white font-medium py-4 neon-glow transition-all duration-300 font-inter text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Generating... {generationProgress}%
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Generate Image
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* Advanced Parameters */}
                <Card className="glass-premium p-6 border-purple-500/20">
                  <ParameterControls 
                    parameters={parameters}
                    onParameterChange={handleParameterChange}
                  />
                </Card>
              </div>

              {/* Right Panel - Result & Sharing */}
              <div className="space-y-6">
                <Card className="glass-premium p-6 border-purple-500/20">
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {isGenerating ? (
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <div className="space-y-2">
                          <p className="text-purple-400 font-inter">Creating your masterpiece...</p>
                          <div className="w-full bg-purple-500/20 rounded-full h-2">
                            <div 
                              className="bg-gradient-premium h-2 rounded-full transition-all duration-300"
                              style={{ width: `${generationProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-foreground/60 font-inter">{generationProgress}% complete</p>
                        </div>
                      </div>
                    ) : generatedImage ? (
                      <img src={generatedImage} alt="Generated" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center text-foreground/60">
                        <Zap className="w-16 h-16 mb-4 mx-auto opacity-40" />
                        <p className="font-inter">Your generated image will appear here</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Social Sharing */}
                {generatedImage && (
                  <Card className="glass-premium p-6 border-purple-500/20">
                    <SocialShare
                      imageUrl={generatedImage}
                      prompt={prompt}
                      onLike={() => setIsLiked(!isLiked)}
                      isLiked={isLiked}
                    />
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examples">
            <Card className="glass-premium p-8 border-purple-500/20">
              <PromptExamples onExampleClick={handleExampleClick} />
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <CommunityGallery />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LiveDemo;
