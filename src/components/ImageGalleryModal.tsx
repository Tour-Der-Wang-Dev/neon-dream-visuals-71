
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Download, Share, Heart, Eye } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

interface GalleryImage {
  id: number;
  src: string;
  webpSrc: string;
  title: string;
  prompt: string;
  model: string;
}

const ImageGalleryModal = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop&auto=format',
      webpSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop&auto=format&fm=webp',
      title: 'Futuristic Cityscape',
      prompt: 'A futuristic cityscape at sunset with flying cars',
      model: 'Stable Diffusion'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=600&fit=crop&auto=format',
      webpSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=600&fit=crop&auto=format&fm=webp',
      title: 'Digital Portrait',
      prompt: 'Portrait of a cyberpunk character with neon lights',
      model: 'DALL-E 2'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop&auto=format',
      webpSrc: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop&auto=format&fm=webp',
      title: 'Fantasy Landscape',
      prompt: 'Magical forest with glowing mushrooms and fairy lights',
      model: 'Midjourney Style'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=600&fit=crop&auto=format',
      webpSrc: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=600&fit=crop&auto=format&fm=webp',
      title: 'Abstract Art',
      prompt: 'Colorful abstract geometric patterns',
      model: 'Stable Diffusion'
    }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-inter fade-in-up">
            <span className="text-gradient">Gallery</span> Showcase
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed font-inter fade-in-up-delay">
            Explore amazing creations from our AI image generation community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {galleryImages.map((image, index) => (
            <Dialog key={image.id} open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Card 
                  className="glass-premium hover-lift group cursor-pointer overflow-hidden border-purple-500/20 neon-glow-blue"
                  onClick={() => {
                    setSelectedImage(index);
                    setIsOpen(true);
                  }}
                >
                  <div className="aspect-square relative">
                    <LazyImage
                      src={image.src}
                      webpSrc={image.webpSrc}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm font-inter truncate">{image.title}</h3>
                    <p className="text-xs text-foreground/60 font-inter">{image.model}</p>
                  </div>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl glass-premium border-purple-500/20 p-0">
                <div className="relative">
                  <div className="aspect-video relative">
                    <LazyImage
                      src={galleryImages[selectedImage].src}
                      webpSrc={galleryImages[selectedImage].webpSrc}
                      alt={galleryImages[selectedImage].title}
                      className="w-full h-full object-cover"
                      width={800}
                      height={450}
                    />
                    
                    {/* Navigation */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 glass border-white/30 text-white hover:bg-white/20"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 glass border-white/30 text-white hover:bg-white/20"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Image Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 font-inter">{galleryImages[selectedImage].title}</h3>
                        <p className="text-foreground/80 font-inter mb-2">{galleryImages[selectedImage].prompt}</p>
                        <p className="text-sm text-purple-400 font-inter">Generated with {galleryImages[selectedImage].model}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="glass border-purple-500/30">
                          <Heart className="w-4 h-4 mr-2" />
                          Like
                        </Button>
                        <Button size="sm" variant="outline" className="glass border-purple-500/30">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button size="sm" className="bg-gradient-premium">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGalleryModal;
