
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  CreditCard, 
  Calendar, 
  Settings, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Crown,
  TrendingUp
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useEnhancedCredits } from '@/hooks/useEnhancedCredits';

interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'expired' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
}

const SubscriptionManagement = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const { credits, transactions } = useEnhancedCredits();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .single();
      
      setSubscription(data);
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="glass-premium p-6 border-purple-500/20 animate-pulse">
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </Card>
      </div>
    );
  }

  const creditUsage = credits ? (credits.credits_used / credits.monthly_limit) * 100 : 0;
  const isLowCredits = credits && (credits.credits_remaining + credits.bonus_credits) < 50;
  const nextBilling = subscription ? new Date(subscription.current_period_end) : null;

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-400" />
            Current Subscription
          </h3>
          <Badge className={`${
            subscription?.status === 'active' ? 'bg-gradient-primary' : 'bg-red-500'
          }`}>
            {subscription?.status || 'No subscription'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-foreground/60">Plan</div>
            <div className="text-2xl font-bold text-primary flex items-center">
              <Crown className="w-6 h-6 mr-2 text-yellow-500" />
              {subscription?.plan_type || 'Free'}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-foreground/60">Status</div>
            <div className="text-lg font-medium flex items-center">
              {subscription?.status === 'active' ? (
                <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 mr-1 text-red-400" />
              )}
              {subscription?.status || 'Inactive'}
            </div>
          </div>
          
          {nextBilling && (
            <div className="space-y-2">
              <div className="text-sm text-foreground/60">Next Billing</div>
              <div className="text-lg font-medium flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {nextBilling.toLocaleDateString()}
              </div>
            </div>
          )}
          
          {credits && (
            <div className="space-y-2">
              <div className="text-sm text-foreground/60">Credits Available</div>
              <div className="text-lg font-medium">
                {credits.credits_remaining + credits.bonus_credits}
              </div>
              <Progress value={100 - creditUsage} className="h-2" />
            </div>
          )}
        </div>

        {/* Low credits warning */}
        {isLowCredits && (
          <div className="mt-6 flex items-center p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-400 mr-2" />
            <span className="text-orange-400 text-sm">
              Low credits remaining. Consider upgrading your plan or purchasing additional credits.
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="outline" className="glass border-primary/30">
            <Settings className="w-4 h-4 mr-2" />
            Manage Plan
          </Button>
          <Button variant="outline" className="glass border-primary/30">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment
          </Button>
          {subscription?.status === 'active' && (
            <Button variant="outline" className="glass border-red-500/30 text-red-400 hover:text-red-300">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {subscription.cancel_at_period_end ? 'Reactivate' : 'Cancel'} Subscription
            </Button>
          )}
        </div>
      </Card>

      {/* Enhanced Usage Statistics */}
      {credits && (
        <Card className="glass-premium p-6 border-purple-500/20">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Usage Statistics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 glass rounded-lg">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-400">{credits.credits_used}</div>
                <div className="text-sm text-foreground/60">Credits Used This Month</div>
              </div>
            </div>
            <div className="p-4 glass rounded-lg">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-400">{credits.credits_remaining}</div>
                <div className="text-sm text-foreground/60">Credits Remaining</div>
              </div>
            </div>
            <div className="p-4 glass rounded-lg">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-400">{credits.bonus_credits}</div>
                <div className="text-sm text-foreground/60">Bonus Credits</div>
              </div>
            </div>
            <div className="p-4 glass rounded-lg">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-orange-400">{credits.lifetime_credits_used}</div>
                <div className="text-sm text-foreground/60">Lifetime Usage</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Monthly Progress</span>
              <span>{credits.credits_used} / {credits.monthly_limit}</span>
            </div>
            <Progress value={creditUsage} className="h-2" />
            <div className="text-xs text-foreground/60 text-center">
              Resets on {new Date(credits.reset_date).toLocaleDateString()}
            </div>
          </div>
        </Card>
      )}

      {/* Recent Transactions */}
      {transactions && transactions.length > 0 && (
        <Card className="glass-premium p-6 border-purple-500/20">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-green-400" />
            Recent Credit Activity
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 glass rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.transaction_type === 'debit' ? 'bg-red-400' : 'bg-green-400'
                  }`} />
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-foreground/60">
                      {new Date(transaction.created_at).toLocaleDateString()} • {transaction.reference_type || 'General'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    transaction.transaction_type === 'debit' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {transaction.transaction_type === 'debit' ? '-' : '+'}{transaction.amount}
                  </div>
                  <div className="text-xs text-foreground/60 capitalize">
                    {transaction.transaction_type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Account Actions */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4">Account Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="glass border-blue-500/30 hover:border-blue-500 p-4 h-auto">
            <div className="text-center space-y-2">
              <div className="text-blue-400 font-medium">Upgrade Plan</div>
              <div className="text-xs text-foreground/60">Get more credits and features</div>
            </div>
          </Button>
          <Button className="glass border-green-500/30 hover:border-green-500 p-4 h-auto">
            <div className="text-center space-y-2">
              <div className="text-green-400 font-medium">Buy Credits</div>
              <div className="text-xs text-foreground/60">Purchase additional credits</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;
