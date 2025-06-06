
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Copy, Download, Search, Filter } from 'lucide-react';

interface CommunityImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  likes: number;
  author: string;
  timestamp: string;
}

const CommunityGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for community images
  const communityImages: CommunityImage[] = [
    {
      id: '1',
      url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="url(%23grad1)"/><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(139,92,246);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="150" y="150" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">Futuristic City</text></svg>',
      prompt: 'A futuristic cityscape at sunset with neon lights',
      style: 'Photorealistic',
      likes: 156,
      author: 'ArtMaster',
      timestamp: '2h ago'
    },
    {
      id: '2',
      url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="url(%23grad2)"/><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(236,72,153);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(168,85,247);stop-opacity:1" /></linearGradient></defs><text x="150" y="150" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">Dragon Art</text></svg>',
      prompt: 'Majestic dragon flying over mountains',
      style: 'Fantasy',
      likes: 243,
      author: 'DragonLord',
      timestamp: '4h ago'
    },
    {
      id: '3',
      url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="url(%23grad3)"/><defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(34,197,94);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><text x="150" y="150" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">Forest Scene</text></svg>',
      prompt: 'Peaceful zen garden with cherry blossoms',
      style: 'Artistic',
      likes: 89,
      author: 'ZenMaster',
      timestamp: '6h ago'
    }
  ];

  const filteredImages = communityImages.filter(image => {
    const matchesSearch = image.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || image.style.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold font-inter">Community Gallery</h3>
        <Badge variant="outline" className="border-purple-500/30 font-inter">
          {communityImages.length} Images
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <Input
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-purple-500/30 font-inter"
          />
        </div>
        <div className="flex space-x-2">
          {['all', 'photorealistic', 'artistic', 'fantasy'].map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 capitalize font-inter ${
                selectedFilter === filter 
                  ? 'bg-gradient-premium text-white' 
                  : 'border-purple-500/30 hover:border-purple-500'
              }`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="glass-premium hover-lift transition-all duration-300 group overflow-hidden border-purple-500/20">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={image.url} 
                alt={image.prompt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass border-white/30 text-white hover:bg-white/20 font-inter"
                  onClick={() => handleCopyPrompt(image.prompt)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass border-white/30 text-white hover:bg-white/20 font-inter"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass border-white/30 text-white hover:bg-white/20 font-inter"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-foreground/80 line-clamp-2 font-inter">{image.prompt}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs border-purple-500/30 font-inter">
                  {image.style}
                </Badge>
                <div className="flex items-center space-x-2 text-xs text-foreground/60 font-inter">
                  <Heart className="w-3 h-3" />
                  <span>{image.likes}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-foreground/60 font-inter">
                <span>by {image.author}</span>
                <span>{image.timestamp}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityGallery;
