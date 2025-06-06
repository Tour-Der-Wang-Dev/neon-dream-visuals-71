
import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage, title, description }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <Card className="glass-premium hover-lift group overflow-hidden border-purple-500/20 neon-glow-blue">
      <div 
        className="relative aspect-video cursor-col-resize"
        onMouseMove={handleSliderChange}
      >
        {/* After Image */}
        <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Before Image with Clip */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-inter">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-inter">
          After
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 font-inter">{title}</h3>
        <p className="text-foreground/80 font-inter">{description}</p>
      </div>
    </Card>
  );
};

export default BeforeAfterSlider;
