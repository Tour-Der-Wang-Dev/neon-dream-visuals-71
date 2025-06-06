
import { Button } from '@/components/ui/button';
import { Share2, Download, Copy, Heart, Twitter, Instagram, Facebook } from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareProps {
  imageUrl: string;
  prompt: string;
  onLike?: () => void;
  isLiked?: boolean;
}

const SocialShare = ({ imageUrl, prompt, onLike, isLiked = false }: SocialShareProps) => {
  const handleShare = (platform: string) => {
    const shareText = `Check out this AI-generated image: "${prompt}"`;
    const shareUrl = window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we copy the prompt instead
        navigator.clipboard.writeText(prompt);
        toast.success('Prompt copied! You can paste it on Instagram.');
        break;
      default:
        break;
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium font-inter">Share & Download</h4>
        <Button
          size="sm"
          variant="outline"
          onClick={onLike}
          className={`glass border-purple-500/30 font-inter ${
            isLiked ? 'text-red-400 border-red-400/50' : ''
          }`}
        >
          <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
          Like
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleDownload}
          className="bg-gradient-premium hover:opacity-90 text-white font-inter"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button
          onClick={handleCopyPrompt}
          variant="outline"
          className="glass border-purple-500/30 hover:border-purple-500 font-inter"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Prompt
        </Button>
      </div>

      {/* Social Media Buttons */}
      <div className="space-y-3">
        <h5 className="text-xs font-medium text-foreground/60 font-inter">Share on Social Media</h5>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('twitter')}
            className="glass border-blue-500/30 hover:border-blue-500 text-blue-400 font-inter"
          >
            <Twitter className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('facebook')}
            className="glass border-blue-600/30 hover:border-blue-600 text-blue-500 font-inter"
          >
            <Facebook className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('instagram')}
            className="glass border-pink-500/30 hover:border-pink-500 text-pink-400 font-inter"
          >
            <Instagram className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="glass border-purple-500/30 hover:border-purple-500 font-inter"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
