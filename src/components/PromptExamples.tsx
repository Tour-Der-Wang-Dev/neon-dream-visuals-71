
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface PromptExamplesProps {
  onExampleClick: (prompt: string) => void;
}

const PromptExamples = ({ onExampleClick }: PromptExamplesProps) => {
  const categories = [
    {
      name: 'Nature',
      examples: [
        'A serene mountain lake at sunrise with mist',
        'Ancient redwood forest with sunbeams',
        'Tropical waterfall in a lush jungle'
      ]
    },
    {
      name: 'Architecture',
      examples: [
        'Modern glass skyscraper reflecting clouds',
        'Gothic cathedral with intricate details',
        'Futuristic space station interior'
      ]
    },
    {
      name: 'Fantasy',
      examples: [
        'Magical floating castle in the clouds',
        'Dragon perched on a crystal mountain',
        'Enchanted forest with glowing creatures'
      ]
    },
    {
      name: 'Abstract',
      examples: [
        'Swirling colors in geometric patterns',
        'Liquid metal flowing in zero gravity',
        'Fractal landscape of impossible dimensions'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold font-inter">One-Click Examples</h3>
      </div>
      
      {categories.map((category, categoryIndex) => (
        <div key={category.name} className="space-y-2">
          <h4 className="text-sm font-medium text-purple-400 font-inter">{category.name}</h4>
          <div className="flex flex-wrap gap-2">
            {category.examples.map((example, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-purple-500/20 transition-all duration-200 hover-lift text-xs p-2 border-purple-500/30 font-inter"
                onClick={() => onExampleClick(example)}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptExamples;
