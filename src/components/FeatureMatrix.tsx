
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star } from 'lucide-react';

const FeatureMatrix = () => {
  const features = [
    { 
      category: 'Generation Limits',
      items: [
        { name: 'Images per month', free: '10', pro: '1,000', enterprise: 'Unlimited' },
        { name: 'Batch generation', free: '1 image', pro: '10 images', enterprise: '50 images' },
        { name: 'Queue priority', free: 'Standard', pro: 'High', enterprise: 'Highest' },
        { name: 'Generation speed', free: '30-60s', pro: '10-30s', enterprise: '5-15s' }
      ]
    },
    {
      category: 'AI Models',
      items: [
        { name: 'Basic models', free: true, pro: true, enterprise: true },
        { name: 'Premium models', free: false, pro: true, enterprise: true },
        { name: 'Latest models', free: false, pro: false, enterprise: true },
        { name: 'Custom model training', free: false, pro: false, enterprise: true }
      ]
    },
    {
      category: 'Image Quality',
      items: [
        { name: 'Standard resolution (512x512)', free: true, pro: true, enterprise: true },
        { name: 'HD resolution (1024x1024)', free: false, pro: true, enterprise: true },
        { name: '4K resolution (2048x2048)', free: false, pro: false, enterprise: true },
        { name: 'Custom resolutions', free: false, pro: false, enterprise: true }
      ]
    },
    {
      category: 'Features',
      items: [
        { name: 'Style presets', free: '5 styles', pro: '20 styles', enterprise: 'All styles + custom' },
        { name: 'Image editing tools', free: false, pro: true, enterprise: true },
        { name: 'API access', free: false, pro: true, enterprise: true },
        { name: 'Webhook support', free: false, pro: false, enterprise: true }
      ]
    },
    {
      category: 'Support & Collaboration',
      items: [
        { name: 'Community support', free: true, pro: true, enterprise: true },
        { name: 'Email support', free: false, pro: true, enterprise: true },
        { name: 'Priority support', free: false, pro: false, enterprise: true },
        { name: 'Dedicated account manager', free: false, pro: false, enterprise: true }
      ]
    }
  ];

  const renderValue = (value: any, plan: string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-400 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-400 mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <Card className="glass-premium p-6 border-purple-500/20">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Feature Comparison</h3>
        <p className="text-foreground/60">Compare plans and find the perfect fit for your needs</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-2 font-medium">Features</th>
              <th className="text-center py-4 px-2">
                <div className="space-y-1">
                  <div className="font-bold">Free</div>
                  <Badge variant="outline" className="text-xs">$0/month</Badge>
                </div>
              </th>
              <th className="text-center py-4 px-2">
                <div className="space-y-1 relative">
                  <div className="font-bold">Pro</div>
                  <Badge className="bg-gradient-primary text-xs">$29/month</Badge>
                  <Star className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                </div>
              </th>
              <th className="text-center py-4 px-2">
                <div className="space-y-1">
                  <div className="font-bold">Enterprise</div>
                  <Badge variant="outline" className="text-xs">$99/month</Badge>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((category, categoryIndex) => (
              <>
                <tr key={`category-${categoryIndex}`}>
                  <td colSpan={4} className="py-4">
                    <div className="font-semibold text-primary text-sm uppercase tracking-wide">
                      {category.category}
                    </div>
                  </td>
                </tr>
                {category.items.map((feature, featureIndex) => (
                  <tr key={`${categoryIndex}-${featureIndex}`} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-2 text-sm">{feature.name}</td>
                    <td className="py-3 px-2 text-center">
                      {renderValue(feature.free, 'free')}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {renderValue(feature.pro, 'pro')}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {renderValue(feature.enterprise, 'enterprise')}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default FeatureMatrix;
