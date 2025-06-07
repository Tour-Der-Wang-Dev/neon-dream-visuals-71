import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List, Eye, Heart, Bookmark } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LazyImage from '@/components/LazyImage';
import ImageInteractionButtons from '@/components/ImageInteractionButtons';
import CollectionManager from '@/components/CollectionManager';

export interface GalleryImage {
  id: string;
  url: string;
  webpUrl?: string;
  title: string;
  prompt: string;
  category: string;
  style: string;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  author: string;
  timestamp: string;
  width: number;
  height: number;
  viewCount?: number;
}

const AdvancedImageGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, searchTerm, selectedCategory, selectedStyle, sortBy]);

  const loadImages = async () => {
    setLoading(true);
    try {
      // Fetch images from Supabase (replace with your actual table name)
      const { data, error } = await supabase
        .from('generated_images')
        .select('*');

      if (error) {
        console.error('Error fetching images:', error);
        return;
      }

      // Map the data to the GalleryImage interface
      const galleryImages: GalleryImage[] = data.map((img: any) => ({
        id: img.id,
        url: img.image_url,
        webpUrl: img.image_url_webp,
        title: img.title,
        prompt: img.prompt,
        category: img.category,
        style: img.style,
        likes: img.likes || 0,
        isLiked: false,
        isBookmarked: false,
        author: img.author,
        timestamp: img.created_at,
        width: img.width,
        height: img.height,
        viewCount: img.view_count || 0,
      }));

      setImages(galleryImages);
    } catch (error) {
      console.error('Failed to load images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    let filtered = [...images];

    if (searchTerm) {
      filtered = filtered.filter(image =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(image => image.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedStyle !== 'all') {
      filtered = filtered.filter(image => image.style.toLowerCase() === selectedStyle.toLowerCase());
    }

    // Sorting logic
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'views') {
      filtered.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    }

    setFilteredImages(filtered);
  };

  const handleImageView = (imageId: string) => {
    // Update view count in database
    supabase
      .from('generated_images')
      .update({ view_count: supabase.sql`view_count + 1` })
      .eq('id', imageId)
      .then(() => {
        // Update local state
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, viewCount: (img.viewCount || 0) + 1 }
            : img
        ));
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-purple-500/30 font-inter"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-2">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] glass border-purple-500/30 font-inter">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="glass-premium border-purple-500/20">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              {/* Add more categories as needed */}
            </SelectContent>
          </Select>

          {/* Style Filter */}
          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
            <SelectTrigger className="w-[180px] glass border-purple-500/30 font-inter">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent className="glass-premium border-purple-500/20">
              <SelectItem value="all">All Styles</SelectItem>
              <SelectItem value="photorealistic">Photorealistic</SelectItem>
              <SelectItem value="artistic">Artistic</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
              {/* Add more styles as needed */}
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px] glass border-purple-500/30 font-inter">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="glass-premium border-purple-500/20">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="views">Views</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <Button
            variant="outline"
            className="glass border-purple-500/30 p-2"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Loading Skeletons */}
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="glass-premium p-4 border-purple-500/20 animate-pulse">
              <div className="aspect-square bg-gray-300 rounded-lg"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {filteredImages.map((image) => (
            <Card 
              key={image.id} 
              className="glass-premium hover-lift group cursor-pointer overflow-hidden border-purple-500/20 neon-glow-blue"
            >
              <div className="relative">
                <LazyImage
                  src={image.url}
                  webpSrc={image.webpUrl}
                  alt={image.title}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={image.width}
                  height={image.height}
                  onClick={() => {
                    setSelectedImage(image);
                    handleImageView(image.id);
                  }}
                />
                
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="text-xs border-white/30 text-white bg-black/40">
                    {image.category}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="text-xs border-white/30 text-white bg-black/40">
                    {image.style}
                  </Badge>
                </div>

                {/* Enhanced stats overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text-white text-xs bg-black/60 rounded px-2 py-1">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {image.viewCount || 0}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {image.likes}
                      </span>
                    </div>
                    <span>{image.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1">{image.title}</h3>
                  <p className="text-xs text-foreground/60 line-clamp-2">{image.prompt}</p>
                </div>

                <div className="flex items-center justify-between">
                  <ImageInteractionButtons
                    imageId={image.id}
                    imageUrl={image.url}
                    onView={() => handleImageView(image.id)}
                  />
                  <div className="text-xs text-foreground/60">
                    by {image.author}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Enhanced image modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl glass-premium border-purple-500/20">
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title}
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold">{selectedImage.title}</h2>
                  <p className="text-foreground/80">{selectedImage.prompt}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <ImageInteractionButtons
                    imageId={selectedImage.id}
                    imageUrl={selectedImage.url}
                  />
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <Eye className="w-4 h-4" />
                    <span>{selectedImage.viewCount || 0} views</span>
                  </div>
                </div>
                
                <CollectionManager
                  imageId={selectedImage.id}
                  onImageAdded={() => {
                    // Optionally refresh or update UI
                  }}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvancedImageGallery;
