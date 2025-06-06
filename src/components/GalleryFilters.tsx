
import { Badge } from '@/components/ui/badge';

interface GalleryFiltersProps {
  selectedCategory: string;
  selectedStyle: string;
  onCategoryChange: (category: string) => void;
  onStyleChange: (style: string) => void;
}

const GalleryFilters = ({
  selectedCategory,
  selectedStyle,
  onCategoryChange,
  onStyleChange
}: GalleryFiltersProps) => {
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'nature', name: 'Nature' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'fantasy', name: 'Fantasy' }
  ];

  const styles = [
    { id: 'all', name: 'All Styles' },
    { id: 'photorealistic', name: 'Photorealistic' },
    { id: 'artistic', name: 'Artistic' },
    { id: 'cartoon', name: 'Cartoon' },
    { id: 'oil-painting', name: 'Oil Painting' },
    { id: 'digital-art', name: 'Digital Art' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 font-inter">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 font-inter ${
                selectedCategory === category.id
                  ? 'bg-gradient-premium text-white'
                  : 'border-purple-500/30 hover:border-purple-500'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 font-inter">Styles</h4>
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <Badge
              key={style.id}
              variant={selectedStyle === style.id ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 font-inter ${
                selectedStyle === style.id
                  ? 'bg-gradient-premium text-white'
                  : 'border-purple-500/30 hover:border-purple-500'
              }`}
              onClick={() => onStyleChange(style.id)}
            >
              {style.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryFilters;
