
import { useState } from 'react';
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
  Clock
} from 'lucide-react';

const SubscriptionManagement = () => {
  const [currentPlan] = useState({
    name: 'Pro',
    price: 29,
    nextBilling: '2024-07-15',
    status: 'active',
    credits: { used: 342, total: 1000 }
  });

  const [billingHistory] = useState([
    { date: '2024-06-15', amount: 29, status: 'paid', invoice: 'INV-001' },
    { date: '2024-05-15', amount: 29, status: 'paid', invoice: 'INV-002' },
    { date: '2024-04-15', amount: 29, status: 'paid', invoice: 'INV-003' }
  ]);

  const creditUsage = (currentPlan.credits.used / currentPlan.credits.total) * 100;

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-400" />
            Current Subscription
          </h3>
          <Badge className="bg-gradient-primary">
            {currentPlan.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-foreground/60">Plan</div>
            <div className="text-2xl font-bold text-primary">{currentPlan.name}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-foreground/60">Monthly Cost</div>
            <div className="text-2xl font-bold">${currentPlan.price}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-foreground/60">Next Billing</div>
            <div className="text-lg font-medium flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(currentPlan.nextBilling).toLocaleDateString()}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-foreground/60">Credits Used</div>
            <div className="text-lg font-medium">
              {currentPlan.credits.used} / {currentPlan.credits.total}
            </div>
            <Progress value={creditUsage} className="h-2" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="outline" className="glass border-primary/30">
            <Settings className="w-4 h-4 mr-2" />
            Manage Plan
          </Button>
          <Button variant="outline" className="glass border-primary/30">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment
          </Button>
          <Button variant="outline" className="glass border-red-500/30 text-red-400 hover:text-red-300">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Cancel Subscription
          </Button>
        </div>
      </Card>

      {/* Usage Statistics */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4">Usage This Month</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 glass rounded-lg">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-400">342</div>
              <div className="text-sm text-foreground/60">Images Generated</div>
            </div>
          </div>
          <div className="p-4 glass rounded-lg">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-400">24</div>
              <div className="text-sm text-foreground/60">API Calls</div>
            </div>
          </div>
          <div className="p-4 glass rounded-lg">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-400">12.5</div>
              <div className="text-sm text-foreground/60">GB Storage Used</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Billing History */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-green-400" />
          Billing History
        </h4>
        <div className="space-y-3">
          {billingHistory.map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  bill.status === 'paid' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div>
                  <div className="font-medium">{new Date(bill.date).toLocaleDateString()}</div>
                  <div className="text-sm text-foreground/60">Invoice {bill.invoice}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-bold">${bill.amount}</div>
                  <div className="text-xs text-green-400 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {bill.status}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="glass">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

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
              <div className="text-green-400 font-medium">Add Credits</div>
              <div className="text-xs text-foreground/60">Purchase additional credits</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;
