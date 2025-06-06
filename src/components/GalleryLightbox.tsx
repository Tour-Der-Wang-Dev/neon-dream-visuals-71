
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Heart, Bookmark, Share, Download } from 'lucide-react';
import { toast } from 'sonner';
import SocialShare from '@/components/SocialShare';
import type { GalleryImage } from '@/components/AdvancedImageGallery';

interface GalleryLightboxProps {
  image: GalleryImage;
  images: GalleryImage[];
  onClose: () => void;
  onLike: () => void;
  onBookmark: () => void;
  onNavigate: (image: GalleryImage) => void;
}

const GalleryLightbox = ({ 
  image, 
  images, 
  onClose, 
  onLike, 
  onBookmark, 
  onNavigate 
}: GalleryLightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  
  const currentIndex = images.findIndex(img => img.id === image.id);
  const canGoNext = currentIndex < images.length - 1;
  const canGoPrev = currentIndex > 0;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (canGoPrev) handlePrevious();
          break;
        case 'ArrowRight':
          if (canGoNext) handleNext();
          break;
        case '+':
        case '=':
          setZoom(prev => Math.min(prev + 0.25, 3));
          break;
        case '-':
          setZoom(prev => Math.max(prev - 0.25, 0.5));
          break;
        case '0':
          setZoom(1);
          break;
        case 'i':
          setShowInfo(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, canGoNext, canGoPrev, onClose]);

  const handleNext = () => {
    if (canGoNext) {
      onNavigate(images[currentIndex + 1]);
      setZoom(1);
    }
  };

  const handlePrevious = () => {
    if (canGoPrev) {
      onNavigate(images[currentIndex - 1]);
      setZoom(1);
    }
  };

  const handleDownload = (format: string = 'jpg') => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Image downloaded as ${format.toUpperCase()}!`);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] glass-premium border-purple-500/20 p-0 overflow-hidden">
        <div className="relative h-full">
          {/* Header Controls */}
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs border-white/30 text-white bg-black/60 font-inter">
                {currentIndex + 1} of {images.length}
              </Badge>
              <Badge variant="outline" className="text-xs border-white/30 text-white bg-black/60 font-inter">
                {Math.round(zoom * 100)}%
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/20 font-inter"
                onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/20 font-inter"
                onClick={() => setZoom(1)}
              >
                Fit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/20 font-inter"
                onClick={() => setZoom(prev => Math.min(prev + 0.25, 3))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/20 font-inter"
                onClick={() => setShowInfo(!showInfo)}
              >
                Info
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/20 font-inter"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          {canGoPrev && (
            <Button
              size="icon"
              variant="outline"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 glass border-white/30 text-white hover:bg-white/20"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}

          {canGoNext && (
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 glass border-white/30 text-white hover:bg-white/20"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          )}

          {/* Image Container */}
          <div className="h-[70vh] flex items-center justify-center bg-black/40 overflow-auto">
            <img
              src={image.url}
              alt={image.title}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          {/* Info Panel */}
          {showInfo && (
            <div className="h-[25vh] p-6 glass-premium border-t border-purple-500/20 overflow-y-auto">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-inter">{image.title}</h3>
                    <p className="text-foreground/80 font-inter mb-2">{image.prompt}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="border-purple-500/30 font-inter">
                        {image.category}
                      </Badge>
                      <Badge variant="outline" className="border-purple-500/30 font-inter">
                        {image.style}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/60 font-inter">
                      by {image.author} • {image.timestamp}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className={`glass border-purple-500/30 font-inter ${
                        image.isLiked ? 'text-red-400 border-red-400/50' : ''
                      }`}
                      onClick={onLike}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${image.isLiked ? 'fill-current' : ''}`} />
                      {image.likes}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`glass border-purple-500/30 font-inter ${
                        image.isBookmarked ? 'text-yellow-400 border-yellow-400/50' : ''
                      }`}
                      onClick={onBookmark}
                    >
                      <Bookmark className={`w-4 h-4 mr-2 ${image.isBookmarked ? 'fill-current' : ''}`} />
                      Save
                    </Button>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-purple-500/30 font-inter"
                        onClick={() => handleDownload('jpg')}
                      >
                        JPG
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-purple-500/30 font-inter"
                        onClick={() => handleDownload('png')}
                      >
                        PNG
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-purple-500/30 font-inter"
                        onClick={() => handleDownload('webp')}
                      >
                        WebP
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <SocialShare
                    imageUrl={image.url}
                    prompt={image.prompt}
                    onLike={onLike}
                    isLiked={image.isLiked}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryLightbox;
