
import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Grid, Filter } from 'lucide-react';
import GalleryFilters from '@/components/GalleryFilters';
import GalleryImageCard from '@/components/GalleryImageCard';
import GalleryLightbox from '@/components/GalleryLightbox';

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
}

const AdvancedImageGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const observer = useRef<IntersectionObserver>();

  // Mock data generator
  const generateMockImages = (startIndex: number, count: number): GalleryImage[] => {
    const categories = ['nature', 'architecture', 'portrait', 'abstract', 'fantasy'];
    const styles = ['photorealistic', 'artistic', 'cartoon', 'oil-painting', 'digital-art'];
    
    return Array.from({ length: count }, (_, i) => {
      const index = startIndex + i;
      const category = categories[index % categories.length];
      const style = styles[index % styles.length];
      
      return {
        id: `img-${index}`,
        url: `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=${300 + (index % 200)}&fit=crop&auto=format`,
        webpUrl: `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=${300 + (index % 200)}&fit=crop&auto=format&fm=webp`,
        title: `AI Generated ${category} ${index}`,
        prompt: `A beautiful ${category} scene in ${style} style`,
        category,
        style,
        likes: Math.floor(Math.random() * 500) + 10,
        isLiked: Math.random() > 0.7,
        isBookmarked: Math.random() > 0.8,
        author: `Artist${(index % 10) + 1}`,
        timestamp: `${Math.floor(Math.random() * 24)}h ago`,
        width: 400,
        height: 300 + (index % 200)
      };
    });
  };

  // Initialize with first batch of images
  useEffect(() => {
    const initialImages = generateMockImages(0, 20);
    setImages(initialImages);
    setFilteredImages(initialImages);
  }, []);

  // Filter images based on search, category, and style
  useEffect(() => {
    let filtered = images;

    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    if (selectedStyle !== 'all') {
      filtered = filtered.filter(img => img.style === selectedStyle);
    }

    setFilteredImages(filtered);
  }, [images, searchTerm, selectedCategory, selectedStyle]);

  // Infinite scroll callback
  const lastImageElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreImages();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const loadMoreImages = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newImages = generateMockImages(page * 20, 20);
      setImages(prev => [...prev, ...newImages]);
      setPage(prev => prev + 1);
      setIsLoading(false);
      
      // Stop loading after 100 images for demo
      if (page >= 4) {
        setHasMore(false);
      }
    }, 1000);
  }, [page, isLoading, hasMore]);

  const handleImageAction = (imageId: string, action: 'like' | 'bookmark') => {
    setImages(prev => prev.map(img => {
      if (img.id === imageId) {
        if (action === 'like') {
          return {
            ...img,
            isLiked: !img.isLiked,
            likes: img.isLiked ? img.likes - 1 : img.likes + 1
          };
        } else {
          return { ...img, isBookmarked: !img.isBookmarked };
        }
      }
      return img;
    }));
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-inter fade-in-up">
            Advanced <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed font-inter fade-in-up-delay">
            Explore, filter, and interact with our AI-generated masterpieces
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input
                placeholder="Search images and prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass border-purple-500/30 font-inter"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="glass border-purple-500/30 hover:border-purple-500 font-inter"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="glass-premium p-6 border-purple-500/20">
              <GalleryFilters
                selectedCategory={selectedCategory}
                selectedStyle={selectedStyle}
                onCategoryChange={setSelectedCategory}
                onStyleChange={setSelectedStyle}
              />
            </Card>
          )}

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-purple-500/30 font-inter">
              {filteredImages.length} Images
            </Badge>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="glass border-purple-500/30 font-inter">
                <Grid className="w-4 h-4 mr-2" />
                Masonry
              </Button>
            </div>
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              ref={index === filteredImages.length - 1 ? lastImageElementRef : null}
              className="break-inside-avoid"
            >
              <GalleryImageCard
                image={image}
                onImageClick={() => setSelectedImage(image)}
                onLike={() => handleImageAction(image.id, 'like')}
                onBookmark={() => handleImageAction(image.id, 'bookmark')}
              />
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-foreground/60 font-inter">Loading more images...</span>
          </div>
        )}

        {/* End of results */}
        {!hasMore && filteredImages.length > 0 && (
          <div className="text-center py-8">
            <p className="text-foreground/60 font-inter">You've reached the end of the gallery</p>
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <GalleryLightbox
            image={selectedImage}
            images={filteredImages}
            onClose={() => setSelectedImage(null)}
            onLike={() => handleImageAction(selectedImage.id, 'like')}
            onBookmark={() => handleImageAction(selectedImage.id, 'bookmark')}
            onNavigate={setSelectedImage}
          />
        )}
      </div>
    </section>
  );
};

export default AdvancedImageGallery;
