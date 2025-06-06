
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  RefreshCw,
  Activity,
  Globe
} from 'lucide-react';

const ApiRateLimits = () => {
  const [apiUsage] = useState({
    requests: { used: 1247, limit: 5000, resetTime: '2024-06-30T15:30:00Z' },
    creditsPerMinute: { used: 24, limit: 100, resetTime: '2024-06-30T12:31:00Z' },
    creditsPerHour: { used: 456, limit: 2000, resetTime: '2024-06-30T13:00:00Z' },
    creditsPerDay: { used: 3421, limit: 10000, resetTime: '2024-07-01T00:00:00Z' }
  });

  const [endpoints] = useState([
    { name: '/api/generate', requests: 523, avgResponse: '2.3s', status: 'healthy' },
    { name: '/api/enhance', requests: 234, avgResponse: '1.8s', status: 'healthy' },
    { name: '/api/styles', requests: 145, avgResponse: '0.5s', status: 'healthy' },
    { name: '/api/models', requests: 89, avgResponse: '0.3s', status: 'healthy' }
  ]);

  const getTimeUntilReset = (resetTime: string) => {
    const now = new Date();
    const reset = new Date(resetTime);
    const diff = reset.getTime() - now.getTime();
    
    if (diff <= 0) return 'Reset now';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  const getUsageColor = (used: number, limit: number) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Rate Limit Overview */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-400" />
            API Rate Limits
          </h3>
          <Button variant="outline" size="sm" className="glass">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Requests per Day */}
          <div className="p-4 glass rounded-lg border border-white/10">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Requests/Day</div>
                <Badge variant="outline" className="text-xs">
                  {getTimeUntilReset(apiUsage.requests.resetTime)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getUsageColor(apiUsage.requests.used, apiUsage.requests.limit)}`}>
                  {apiUsage.requests.used.toLocaleString()}
                </div>
                <div className="text-xs text-foreground/60">
                  of {apiUsage.requests.limit.toLocaleString()} limit
                </div>
                <Progress 
                  value={(apiUsage.requests.used / apiUsage.requests.limit) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </div>

          {/* Credits per Minute */}
          <div className="p-4 glass rounded-lg border border-white/10">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Credits/Min</div>
                <Badge variant="outline" className="text-xs">
                  {getTimeUntilReset(apiUsage.creditsPerMinute.resetTime)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getUsageColor(apiUsage.creditsPerMinute.used, apiUsage.creditsPerMinute.limit)}`}>
                  {apiUsage.creditsPerMinute.used}
                </div>
                <div className="text-xs text-foreground/60">
                  of {apiUsage.creditsPerMinute.limit} limit
                </div>
                <Progress 
                  value={(apiUsage.creditsPerMinute.used / apiUsage.creditsPerMinute.limit) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </div>

          {/* Credits per Hour */}
          <div className="p-4 glass rounded-lg border border-white/10">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Credits/Hour</div>
                <Badge variant="outline" className="text-xs">
                  {getTimeUntilReset(apiUsage.creditsPerHour.resetTime)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getUsageColor(apiUsage.creditsPerHour.used, apiUsage.creditsPerHour.limit)}`}>
                  {apiUsage.creditsPerHour.used}
                </div>
                <div className="text-xs text-foreground/60">
                  of {apiUsage.creditsPerHour.limit} limit
                </div>
                <Progress 
                  value={(apiUsage.creditsPerHour.used / apiUsage.creditsPerHour.limit) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </div>

          {/* Credits per Day */}
          <div className="p-4 glass rounded-lg border border-white/10">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Credits/Day</div>
                <Badge variant="outline" className="text-xs">
                  {getTimeUntilReset(apiUsage.creditsPerDay.resetTime)}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getUsageColor(apiUsage.creditsPerDay.used, apiUsage.creditsPerDay.limit)}`}>
                  {apiUsage.creditsPerDay.used.toLocaleString()}
                </div>
                <div className="text-xs text-foreground/60">
                  of {apiUsage.creditsPerDay.limit.toLocaleString()} limit
                </div>
                <Progress 
                  value={(apiUsage.creditsPerDay.used / apiUsage.creditsPerDay.limit) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Warning if approaching limits */}
        {apiUsage.requests.used / apiUsage.requests.limit > 0.8 && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 text-sm">
              You're approaching your daily API limit. Consider upgrading your plan to avoid interruptions.
            </span>
          </div>
        )}
      </Card>

      {/* Endpoint Performance */}
      <Card className="glass-premium p-6 border-purple-500/20">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-green-400" />
          Endpoint Performance
        </h4>
        <div className="space-y-3">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  endpoint.status === 'healthy' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div>
                  <div className="font-medium font-mono text-sm">{endpoint.name}</div>
                  <div className="text-xs text-foreground/60">
                    {endpoint.requests} requests today
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{endpoint.avgResponse}</div>
                <div className="text-xs text-foreground/60">avg response</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Usage Tips */}
      <Card className="glass-premium p-6 border-blue-500/20">
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
          Optimization Tips
        </h4>
        <div className="space-y-3">
          <div className="p-3 glass rounded-lg">
            <div className="font-medium text-sm mb-1">Batch Your Requests</div>
            <div className="text-xs text-foreground/60">
              Use batch endpoints to generate multiple images in a single request to optimize rate limits.
            </div>
          </div>
          <div className="p-3 glass rounded-lg">
            <div className="font-medium text-sm mb-1">Cache Results</div>
            <div className="text-xs text-foreground/60">
              Implement caching to avoid regenerating identical images and save credits.
            </div>
          </div>
          <div className="p-3 glass rounded-lg">
            <div className="font-medium text-sm mb-1">Monitor Usage Patterns</div>
            <div className="text-xs text-foreground/60">
              Track your usage patterns to predict when you might hit rate limits.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApiRateLimits;
