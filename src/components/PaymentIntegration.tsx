
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Zap, Shield, Clock, CheckCircle } from 'lucide-react';

const PaymentIntegration = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      credits: 10,
      features: ['10 images/month', 'Basic models', 'Community support']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      credits: 1000,
      features: ['1,000 images/month', 'All models', 'Priority support', 'API access'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      credits: 'unlimited',
      features: ['Unlimited images', 'Custom models', 'Dedicated support', 'SLA']
    }
  ];

  const handlePayment = async (planId: string) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would integrate with actual payment processor
    console.log(`Processing payment for plan: ${planId}`);
    
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h3 className="text-xl font-bold mb-6 text-center">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id
                  ? 'border-primary bg-primary/5'
                  : 'border-white/10 hover:border-white/20'
              } ${plan.popular ? 'ring-1 ring-primary/30' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="bg-gradient-primary mb-2 text-xs">Most Popular</Badge>
              )}
              <div className="text-center space-y-3">
                <h4 className="font-bold text-lg">{plan.name}</h4>
                <div className="text-3xl font-bold text-primary">
                  ${plan.price}
                  {plan.price > 0 && <span className="text-sm text-foreground/60">/month</span>}
                </div>
                <div className="text-sm text-foreground/60">
                  {typeof plan.credits === 'number' ? `${plan.credits} credits` : plan.credits}
                </div>
                <ul className="space-y-1 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-green-400 mr-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Methods */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-400" />
          Payment Methods
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 glass rounded-lg border border-white/10 hover:border-primary/30 cursor-pointer transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <div className="font-medium">Credit/Debit Card</div>
                <div className="text-xs text-foreground/60">Visa, Mastercard, American Express</div>
              </div>
            </div>
          </div>
          <div className="p-4 glass rounded-lg border border-white/10 hover:border-primary/30 cursor-pointer transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                PP
              </div>
              <div>
                <div className="font-medium">PayPal</div>
                <div className="text-xs text-foreground/60">Fast and secure payments</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Features */}
      <Card className="glass-premium p-6 border-green-500/20">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-400" />
          Secure Payment Processing
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <Shield className="w-8 h-8 text-green-400 mx-auto" />
            <div className="font-medium">SSL Encrypted</div>
            <div className="text-xs text-foreground/60">Bank-level security</div>
          </div>
          <div className="text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto" />
            <div className="font-medium">PCI Compliant</div>
            <div className="text-xs text-foreground/60">Industry standard</div>
          </div>
          <div className="text-center space-y-2">
            <Clock className="w-8 h-8 text-green-400 mx-auto" />
            <div className="font-medium">Instant Activation</div>
            <div className="text-xs text-foreground/60">Credits added immediately</div>
          </div>
        </div>
      </Card>

      {/* Payment Button */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <div className="text-lg">Selected Plan: <span className="font-bold text-primary">{plans.find(p => p.id === selectedPlan)?.name}</span></div>
            <div className="text-3xl font-bold">
              ${plans.find(p => p.id === selectedPlan)?.price || 0}
              {selectedPlan !== 'free' && <span className="text-sm text-foreground/60">/month</span>}
            </div>
          </div>
          
          {selectedPlan !== 'free' ? (
            <Button
              onClick={() => handlePayment(selectedPlan)}
              disabled={isProcessing}
              className="bg-gradient-primary hover:opacity-90 text-white font-medium py-3 px-8 text-lg"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Subscribe Now
                </>
              )}
            </Button>
          ) : (
            <Button className="bg-gradient-primary hover:opacity-90 text-white font-medium py-3 px-8 text-lg">
              <Zap className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
          )}
          
          <div className="text-xs text-foreground/60">
            Cancel anytime • No hidden fees • 30-day money-back guarantee
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentIntegration;
