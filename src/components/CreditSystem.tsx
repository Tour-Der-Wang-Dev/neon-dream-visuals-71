
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const CreditSystem = () => {
  const [userCredits] = useState(150);
  const [totalCredits] = useState(1000);
  const creditPercentage = (userCredits / totalCredits) * 100;

  const creditCosts = [
    { action: 'Basic Image Generation', cost: 1, description: 'Standard quality, fast generation' },
    { action: 'HD Image Generation', cost: 2, description: 'High definition, premium quality' },
    { action: '4K Image Generation', cost: 5, description: 'Ultra-high resolution' },
    { action: 'Style Transfer', cost: 3, description: 'Apply artistic styles to images' },
    { action: 'Image Upscaling', cost: 2, description: 'Enhance image resolution' },
    { action: 'Batch Generation (10 images)', cost: 8, description: 'Generate multiple variations' }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-premium p-6 border-purple-500/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Your Credits
            </h3>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {userCredits} / {totalCredits}
            </Badge>
          </div>
          
          <Progress value={creditPercentage} className="h-3" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-400">{userCredits}</div>
              <div className="text-sm text-foreground/60">Available</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-400">{totalCredits - userCredits}</div>
              <div className="text-sm text-foreground/60">Used</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-400">{totalCredits}</div>
              <div className="text-sm text-foreground/60">Total</div>
            </div>
          </div>

          {creditPercentage < 20 && (
            <div className="flex items-center p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-400 mr-2" />
              <span className="text-orange-400 text-sm">Low credits remaining. Consider upgrading your plan.</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4">Credit Usage Guide</h4>
        <div className="space-y-3">
          {creditCosts.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
              <div>
                <div className="font-medium">{item.action}</div>
                <div className="text-sm text-foreground/60">{item.description}</div>
              </div>
              <Badge variant="secondary" className="font-bold">
                {item.cost} {item.cost === 1 ? 'Credit' : 'Credits'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CreditSystem;
