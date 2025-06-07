
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, Share, Download, Eye } from 'lucide-react';
import { useImageInteractions } from '@/hooks/useImageInteractions';
import { toast } from 'sonner';

interface ImageInteractionButtonsProps {
  imageId: string;
  imageUrl: string;
  onView?: () => void;
}

const ImageInteractionButtons = ({ imageId, imageUrl, onView }: ImageInteractionButtonsProps) => {
  const { toggleInteraction, trackView, getInteractions, loading } = useImageInteractions();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const loadInteractions = async () => {
      const interactions = await getInteractions(imageId);
      setIsLiked(interactions.some(i => i.interaction_type === 'like'));
      setIsBookmarked(interactions.some(i => i.interaction_type === 'bookmark'));
      
      if (!hasViewed) {
        await trackView(imageId);
        setHasViewed(true);
        onView?.();
      }
    };

    loadInteractions();
  }, [imageId]);

  const handleLike = async () => {
    const newLikeState = await toggleInteraction(imageId, 'like');
    setIsLiked(newLikeState);
  };

  const handleBookmark = async () => {
    const newBookmarkState = await toggleInteraction(imageId, 'bookmark');
    setIsBookmarked(newBookmarkState);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this AI-generated image',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-image-${imageId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        disabled={loading}
        className={`hover:bg-red-500/20 ${isLiked ? 'text-red-500' : 'text-foreground/60'}`}
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        disabled={loading}
        className={`hover:bg-yellow-500/20 ${isBookmarked ? 'text-yellow-500' : 'text-foreground/60'}`}
      >
        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="hover:bg-blue-500/20 text-foreground/60 hover:text-blue-500"
      >
        <Share className="w-4 h-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownload}
        className="hover:bg-green-500/20 text-foreground/60 hover:text-green-500"
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ImageInteractionButtons;
