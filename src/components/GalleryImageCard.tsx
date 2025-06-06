
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, Share, Download, Eye } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { toast } from 'sonner';
import type { GalleryImage } from '@/components/AdvancedImageGallery';

interface GalleryImageCardProps {
  image: GalleryImage;
  onImageClick: () => void;
  onLike: () => void;
  onBookmark: () => void;
}

const GalleryImageCard = ({ image, onImageClick, onLike, onBookmark }: GalleryImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.prompt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  return (
    <Card 
      className="glass-premium hover-lift group cursor-pointer overflow-hidden border-purple-500/20 neon-glow-blue mb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <LazyImage
          src={image.url}
          webpSrc={image.webpUrl}
          alt={image.title}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={image.width}
          height={image.height}
        />
        
        {/* Overlay Controls */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="glass border-white/30 text-white hover:bg-white/20 font-inter"
              onClick={(e) => {
                e.stopPropagation();
                onImageClick();
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass border-white/30 text-white hover:bg-white/20 font-inter"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass border-white/30 text-white hover:bg-white/20 font-inter"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="text-xs border-white/30 text-white bg-black/40 font-inter">
            {image.category}
          </Badge>
        </div>

        {/* Style Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="text-xs border-white/30 text-white bg-black/40 font-inter">
            {image.style}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm font-inter truncate">{image.title}</h3>
          <p className="text-xs text-foreground/60 line-clamp-2 font-inter">{image.prompt}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className={`p-1 h-auto font-inter ${image.isLiked ? 'text-red-400' : 'text-foreground/60'}`}
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
            >
              <Heart className={`w-4 h-4 ${image.isLiked ? 'fill-current' : ''}`} />
              <span className="ml-1 text-xs">{image.likes}</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`p-1 h-auto font-inter ${image.isBookmarked ? 'text-yellow-400' : 'text-foreground/60'}`}
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
            >
              <Bookmark className={`w-4 h-4 ${image.isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
          <div className="text-xs text-foreground/60 font-inter">
            by {image.author} • {image.timestamp}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GalleryImageCard;
