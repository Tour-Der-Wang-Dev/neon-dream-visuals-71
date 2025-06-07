
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, Calendar, Plus } from 'lucide-react';
import { useEnhancedCredits } from '@/hooks/useEnhancedCredits';

const EnhancedCreditDisplay = () => {
  const { credits, transactions, loading } = useEnhancedCredits();

  if (loading || !credits) {
    return (
      <Card className="glass-premium p-4 border-purple-500/20">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </Card>
    );
  }

  const totalCredits = credits.credits_remaining + credits.bonus_credits;
  const usagePercentage = (credits.credits_used / credits.monthly_limit) * 100;
  const resetDate = new Date(credits.reset_date);

  return (
    <div className="space-y-4">
      {/* Main credit display */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Your Credits
            </h3>
            <Badge variant="outline" className="text-lg px-3 py-1 capitalize">
              {credits.plan_type} Plan
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{totalCredits}</div>
              <div className="text-sm text-foreground/60">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{credits.credits_used}</div>
              <div className="text-sm text-foreground/60">Used This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{credits.bonus_credits}</div>
              <div className="text-sm text-foreground/60">Bonus Credits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{credits.lifetime_credits_used}</div>
              <div className="text-sm text-foreground/60">Lifetime Used</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Monthly Usage</span>
              <span>{credits.credits_used} / {credits.monthly_limit}</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-sm text-foreground/60">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Resets on {resetDate.toLocaleDateString()}</span>
            </div>
            <Button variant="outline" size="sm" className="glass border-primary/30">
              <Plus className="w-4 h-4 mr-1" />
              Buy Credits
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent transactions */}
      {transactions.length > 0 && (
        <Card className="glass-premium p-6 border-purple-500/20">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Recent Transactions
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {transactions.slice(0, 10).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 glass rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-foreground/60">
                    {new Date(transaction.created_at).toLocaleDateString()} • {transaction.reference_type || 'General'}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    transaction.transaction_type === 'debit' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {transaction.transaction_type === 'debit' ? '-' : '+'}{transaction.amount}
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {transaction.transaction_type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default EnhancedCreditDisplay;
