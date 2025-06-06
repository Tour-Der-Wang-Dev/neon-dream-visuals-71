
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Star, Sparkles, Calculator, Users, Building2 } from 'lucide-react';
import CreditSystem from '@/components/CreditSystem';
import FeatureMatrix from '@/components/FeatureMatrix';
import UsageCalculator from '@/components/UsageCalculator';
import PaymentIntegration from '@/components/PaymentIntegration';
import SubscriptionManagement from '@/components/SubscriptionManagement';
import ApiRateLimits from '@/components/ApiRateLimits';
import EnterpriseContact from '@/components/EnterpriseContact';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      credits: 10,
      features: [
        '10 images per month',
        'Basic AI models',
        'Standard resolution',
        'Community support',
        'Personal use only'
      ],
      cta: 'Get Started',
      popular: false,
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Pro',
      description: 'For creative professionals',
      price: { monthly: 29, yearly: 290 },
      credits: 1000,
      features: [
        '1,000 images per month',
        'All AI models',
        'High resolution (4K)',
        'Priority support',
        'Commercial license',
        'API access',
        'Advanced customization'
      ],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Enterprise',
      description: 'For teams and businesses',
      price: { monthly: 99, yearly: 990 },
      credits: 'unlimited',
      features: [
        'Unlimited images',
        'All AI models + early access',
        'Ultra-high resolution',
        'Dedicated support',
        'Enterprise license',
        'Custom API limits',
        'SSO integration',
        'Custom training'
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Comprehensive{' '}
            <span className="text-gradient">Pricing Solutions</span>
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed mb-8">
            Complete pricing management with credits, subscriptions, and enterprise solutions
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center glass rounded-lg p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                !isYearly
                  ? 'bg-gradient-primary text-white'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isYearly
                  ? 'bg-gradient-primary text-white'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Comprehensive Pricing Tabs */}
        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 glass-premium mb-8">
            <TabsTrigger value="plans" className="font-inter text-xs">
              <Star className="w-4 h-4 mr-1" />
              Plans
            </TabsTrigger>
            <TabsTrigger value="credits" className="font-inter text-xs">
              <Sparkles className="w-4 h-4 mr-1" />
              Credits
            </TabsTrigger>
            <TabsTrigger value="calculator" className="font-inter text-xs">
              <Calculator className="w-4 h-4 mr-1" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="compare" className="font-inter text-xs">
              Compare
            </TabsTrigger>
            <TabsTrigger value="payment" className="font-inter text-xs">
              Payment
            </TabsTrigger>
            <TabsTrigger value="manage" className="font-inter text-xs">
              <Users className="w-4 h-4 mr-1" />
              Manage
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="font-inter text-xs">
              <Building2 className="w-4 h-4 mr-1" />
              Enterprise
            </TabsTrigger>
          </TabsList>

          {/* Pricing Plans */}
          <TabsContent value="plans" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`glass hover-lift relative overflow-hidden border-white/10 transition-all duration-300 ${
                    plan.popular
                      ? 'border-primary/50 scale-105'
                      : 'hover:border-primary/30'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-foreground/60 mb-6">{plan.description}</p>
                      
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl md:text-5xl font-bold">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-foreground/60 ml-2">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      
                      {isYearly && plan.price.monthly > 0 && (
                        <p className="text-sm text-green-400 mt-2">
                          Save ${(plan.price.monthly * 12) - plan.price.yearly} annually
                        </p>
                      )}

                      <div className="mt-4 p-2 glass rounded-lg">
                        <div className="text-lg font-bold text-primary">
                          {typeof plan.credits === 'number' ? `${plan.credits} Credits` : 'Unlimited Credits'}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className={`w-full py-3 font-medium transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-primary hover:opacity-90 text-white animate-pulse-neon'
                          : 'glass border-primary/30 hover:border-primary hover:bg-primary/10'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>

                  {/* Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 hover:opacity-5 transition-opacity duration-300`} />
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Credit System */}
          <TabsContent value="credits">
            <CreditSystem />
          </TabsContent>

          {/* Usage Calculator */}
          <TabsContent value="calculator">
            <UsageCalculator />
          </TabsContent>

          {/* Feature Comparison */}
          <TabsContent value="compare">
            <FeatureMatrix />
          </TabsContent>

          {/* Payment Integration */}
          <TabsContent value="payment">
            <PaymentIntegration />
          </TabsContent>

          {/* Subscription Management & API Limits */}
          <TabsContent value="manage" className="space-y-8">
            <SubscriptionManagement />
            <ApiRateLimits />
          </TabsContent>

          {/* Enterprise Contact */}
          <TabsContent value="enterprise">
            <EnterpriseContact />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Pricing;
