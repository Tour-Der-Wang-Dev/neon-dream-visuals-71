
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const UsageCalculator = () => {
  const [basicImages, setBasicImages] = useState([50]);
  const [hdImages, setHdImages] = useState([20]);
  const [ultraHdImages, setUltraHdImages] = useState([5]);
  const [batchGenerations, setBatchGenerations] = useState([3]);

  const pricing = {
    basic: 1, // credits
    hd: 2,
    ultraHd: 5,
    batch: 8
  };

  const creditPackages = [
    { credits: 100, price: 9.99, popular: false },
    { credits: 500, price: 39.99, popular: true, savings: 20 },
    { credits: 1000, price: 69.99, popular: false, savings: 30 },
    { credits: 2500, price: 149.99, popular: false, savings: 40 }
  ];

  const calculateTotalCredits = () => {
    return (
      basicImages[0] * pricing.basic +
      hdImages[0] * pricing.hd +
      ultraHdImages[0] * pricing.ultraHd +
      batchGenerations[0] * pricing.batch
    );
  };

  const recommendPackage = () => {
    const totalCredits = calculateTotalCredits();
    return creditPackages.find(pkg => pkg.credits >= totalCredits) || creditPackages[creditPackages.length - 1];
  };

  const totalCredits = calculateTotalCredits();
  const recommended = recommendPackage();

  return (
    <div className="space-y-6">
      <Card className="glass-premium p-6 border-purple-500/20">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold flex items-center justify-center mb-2">
            <Calculator className="w-5 h-5 mr-2 text-blue-400" />
            Usage Calculator
          </h3>
          <p className="text-foreground/60">Calculate your monthly credit needs</p>
        </div>

        <div className="space-y-6">
          {/* Basic Images */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Basic Images (1 credit each)</label>
              <Badge variant="outline">{basicImages[0]} images</Badge>
            </div>
            <Slider
              value={basicImages}
              onValueChange={setBasicImages}
              max={500}
              step={5}
              className="w-full"
            />
          </div>

          {/* HD Images */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">HD Images (2 credits each)</label>
              <Badge variant="outline">{hdImages[0]} images</Badge>
            </div>
            <Slider
              value={hdImages}
              onValueChange={setHdImages}
              max={200}
              step={2}
              className="w-full"
            />
          </div>

          {/* Ultra HD Images */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">4K Images (5 credits each)</label>
              <Badge variant="outline">{ultraHdImages[0]} images</Badge>
            </div>
            <Slider
              value={ultraHdImages}
              onValueChange={setUltraHdImages}
              max={50}
              step={1}
              className="w-full"
            />
          </div>

          {/* Batch Generations */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Batch Generations (8 credits each)</label>
              <Badge variant="outline">{batchGenerations[0]} batches</Badge>
            </div>
            <Slider
              value={batchGenerations}
              onValueChange={setBatchGenerations}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          {/* Total Calculation */}
          <div className="p-4 glass rounded-lg border border-primary/20">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Credits Needed:</span>
              <Badge className="bg-gradient-primary text-lg px-3 py-1">
                {totalCredits} credits
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommended Package */}
      <Card className="glass-premium p-6 border-green-500/20">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
          Recommended Package
        </h4>
        <div className="flex items-center justify-between p-4 glass rounded-lg border border-green-500/20">
          <div>
            <div className="font-bold text-lg">{recommended.credits} Credits</div>
            <div className="text-sm text-foreground/60">
              {recommended.savings && `Save ${recommended.savings}% compared to individual purchases`}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">${recommended.price}</div>
            <Button className="mt-2 bg-gradient-primary">
              <DollarSign className="w-4 h-4 mr-2" />
              Purchase
            </Button>
          </div>
        </div>
      </Card>

      {/* All Credit Packages */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4">Credit Packages</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {creditPackages.map((pkg, index) => (
            <div
              key={index}
              className={`p-4 glass rounded-lg border transition-all duration-200 hover:border-primary/50 ${
                pkg.popular ? 'border-primary/30 ring-1 ring-primary/20' : 'border-white/10'
              }`}
            >
              {pkg.popular && (
                <Badge className="bg-gradient-primary mb-2 text-xs">Most Popular</Badge>
              )}
              <div className="text-center space-y-2">
                <div className="text-lg font-bold">{pkg.credits} Credits</div>
                <div className="text-2xl font-bold text-primary">${pkg.price}</div>
                {pkg.savings && (
                  <div className="text-xs text-green-400">Save {pkg.savings}%</div>
                )}
                <Button 
                  className={`w-full ${pkg.popular ? 'bg-gradient-primary' : 'glass border-primary/30'}`}
                  variant={pkg.popular ? 'default' : 'outline'}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UsageCalculator;
