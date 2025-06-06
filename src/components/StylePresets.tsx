
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StylePresetsProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const StylePresets = ({ selectedStyle, onStyleChange }: StylePresetsProps) => {
  const presets = [
    { id: 'photorealistic', name: 'Photorealistic', description: 'Ultra-realistic photos', color: 'bg-blue-500' },
    { id: 'artistic', name: 'Artistic', description: 'Traditional art styles', color: 'bg-purple-500' },
    { id: 'cartoon', name: 'Cartoon', description: 'Animated and fun', color: 'bg-orange-500' },
    { id: 'abstract', name: 'Abstract', description: 'Modern and creative', color: 'bg-pink-500' },
    { id: 'digital-art', name: 'Digital Art', description: 'Contemporary digital', color: 'bg-cyan-500' },
    { id: 'oil-painting', name: 'Oil Painting', description: 'Classic painting style', color: 'bg-amber-500' },
    { id: 'watercolor', name: 'Watercolor', description: 'Soft and flowing', color: 'bg-teal-500' },
    { id: 'sketch', name: 'Sketch', description: 'Hand-drawn style', color: 'bg-gray-500' }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium mb-2 font-inter">Style Presets</label>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset) => (
          <Card
            key={preset.id}
            className={`p-3 cursor-pointer transition-all duration-200 hover-lift ${
              selectedStyle === preset.id 
                ? 'glass-premium border-purple-500 neon-glow' 
                : 'glass border-purple-500/20 hover:border-purple-500/40'
            }`}
            onClick={() => onStyleChange(preset.id)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${preset.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium font-inter truncate">{preset.name}</p>
                <p className="text-xs text-foreground/60 font-inter">{preset.description}</p>
              </div>
              {selectedStyle === preset.id && (
                <Badge variant="outline" className="text-xs border-purple-500/30 font-inter">
                  Active
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StylePresets;
