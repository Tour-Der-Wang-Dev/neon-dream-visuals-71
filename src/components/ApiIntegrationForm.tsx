
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Zap, Download, Settings, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  prompt: z.string().min(5, 'Prompt must be at least 5 characters'),
  model: z.string().min(1, 'Please select a model'),
  style: z.string().optional(),
  width: z.number().min(256).max(2048),
  height: z.number().min(256).max(2048),
  quality: z.number().min(1).max(100),
  steps: z.number().min(1).max(50),
  guidanceScale: z.number().min(1).max(20),
  apiKey: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface GeneratedImage {
  url: string;
  prompt: string;
  model: string;
  timestamp: Date;
}

const ApiIntegrationForm = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [usageStats, setUsageStats] = useState({
    imagesGenerated: 42,
    creditsUsed: 128,
    creditsRemaining: 872
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      model: 'stable-diffusion-xl',
      style: 'photorealistic',
      width: 1024,
      height: 1024,
      quality: 80,
      steps: 20,
      guidanceScale: 7,
      apiKey: '',
    },
  });

  const models = [
    { value: 'stable-diffusion-xl', label: 'Stable Diffusion XL' },
    { value: 'dall-e-2', label: 'DALL-E 2' },
    { value: 'midjourney-style', label: 'Midjourney Style' },
    { value: 'realistic-vision', label: 'Realistic Vision' },
  ];

  const styles = [
    { value: 'photorealistic', label: 'Photorealistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'cinematic', label: 'Cinematic' },
  ];

  const sizes = [
    { value: '512x512', label: '512×512 (Square)' },
    { value: '768x768', label: '768×768 (Square)' },
    { value: '1024x1024', label: '1024×1024 (Square)' },
    { value: '1024x768', label: '1024×768 (Landscape)' },
    { value: '768x1024', label: '768×1024 (Portrait)' },
  ];

  const onSubmit = async (data: FormData) => {
    if (!data.apiKey) {
      toast.error('Please enter your Replicate API key');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate API call with progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 20;
        });
      }, 500);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setProgress(100);

      // Mock generated image
      const mockImage: GeneratedImage = {
        url: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="url(%23grad1)"/><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(139,92,246);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="200" y="180" font-family="Arial" font-size="14" fill="white" text-anchor="middle">Generated with</text><text x="200" y="200" font-family="Arial" font-size="16" fill="white" text-anchor="middle">${data.model}</text><text x="200" y="220" font-family="Arial" font-size="12" fill="white" text-anchor="middle">Quality: ${data.quality}%</text></svg>`,
        prompt: data.prompt,
        model: data.model,
        timestamp: new Date()
      };

      setGeneratedImages(prev => [mockImage, ...prev]);
      setUsageStats(prev => ({
        ...prev,
        imagesGenerated: prev.imagesGenerated + 1,
        creditsUsed: prev.creditsUsed + 5,
        creditsRemaining: prev.creditsRemaining - 5
      }));

      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const downloadImage = (imageUrl: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-${prompt.slice(0, 20).replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-inter fade-in-up">
            API <span className="text-gradient">Integration</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed font-inter fade-in-up-delay">
            Complete AI image generation with Replicate API integration
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Controls */}
          <div className="lg:col-span-2">
            <Card className="glass-premium p-8 hover-lift neon-glow-blue border-purple-500/20">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* API Key Section */}
                  <div className="border-b border-purple-500/20 pb-6">
                    <h3 className="text-lg font-semibold mb-4 font-inter flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-purple-400" />
                      API Configuration
                    </h3>
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter">Replicate API Key</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="r8_***************************"
                              className="glass border-purple-500/30 focus:border-purple-500 font-inter"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Prompt Section */}
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter">Prompt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A majestic dragon soaring through clouds at sunset..."
                            className="glass border-purple-500/30 focus:border-purple-500 min-h-20 font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Model Selection */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter">AI Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="glass border-purple-500/30 font-inter">
                                <SelectValue placeholder="Select model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="glass-premium border-purple-500/20">
                              {models.map((model) => (
                                <SelectItem key={model.value} value={model.value}>
                                  {model.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter">Style</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="glass border-purple-500/30 font-inter">
                                <SelectValue placeholder="Select style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="glass-premium border-purple-500/20">
                              {styles.map((style) => (
                                <SelectItem key={style.value} value={style.value}>
                                  {style.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Size Controls */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter">Width: {field.value}px</FormLabel>
                          <FormControl>
                            <Slider
                              min={256}
                              max={2048}
                              step={64}
                              value={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter">Height: {field.value}px</FormLabel>
                          <FormControl>
                            <Slider
                              min={256}
                              max={2048}
                              step={64}
                              value={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Advanced Parameters */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="quality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter">Quality: {field.value}%</FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={100}
                              value={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="steps"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter">Steps: {field.value}</FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={50}
                              value={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guidanceScale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-inter">Guidance: {field.value}</FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={20}
                              value={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Generate Button */}
                  <Button
                    type="submit"
                    disabled={isGenerating}
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

                  {/* Progress Bar */}
                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-inter">
                        <span>Generating image...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}
                </form>
              </Form>
            </Card>
          </div>

          {/* Sidebar - Usage Stats & Generated Images */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <Card className="glass-premium p-6 hover-lift neon-glow border-purple-500/20">
              <h3 className="text-lg font-semibold mb-4 font-inter">Usage Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-foreground/80 font-inter">Images Generated</span>
                  <span className="font-semibold font-inter">{usageStats.imagesGenerated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/80 font-inter">Credits Used</span>
                  <span className="font-semibold font-inter">{usageStats.creditsUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/80 font-inter">Credits Remaining</span>
                  <span className="font-semibold text-green-400 font-inter">{usageStats.creditsRemaining}</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1 font-inter">
                    <span>Credit Usage</span>
                    <span>{Math.round((usageStats.creditsUsed / (usageStats.creditsUsed + usageStats.creditsRemaining)) * 100)}%</span>
                  </div>
                  <Progress value={(usageStats.creditsUsed / (usageStats.creditsUsed + usageStats.creditsRemaining)) * 100} />
                </div>
              </div>
            </Card>

            {/* Generated Images */}
            {generatedImages.length > 0 && (
              <Card className="glass-premium p-6 hover-lift neon-glow border-purple-500/20">
                <h3 className="text-lg font-semibold mb-4 font-inter">Generated Images</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="group relative">
                      <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg overflow-hidden">
                        <img 
                          src={image.url} 
                          alt={image.prompt} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadImage(image.url, image.prompt)}
                            className="glass border-white/30 text-white hover:bg-white/20"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-inter text-foreground/80 line-clamp-2">{image.prompt}</p>
                        <p className="text-xs font-inter text-foreground/60">{image.model}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiIntegrationForm;
