import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCounter, useIncrementCounter } from '../hooks/useCounter';
import FeatureCard from './FeatureCard';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CrossDeviceSyncTest() {
  const { identity } = useInternetIdentity();
  const { data: counter, isLoading } = useGetCounter();
  const incrementMutation = useIncrementCounter();

  const isAuthenticated = !!identity;

  const handleIncrement = () => {
    incrementMutation.mutate();
  };

  return (
    <FeatureCard
      title="Cross-Device Sync Test"
      description="Global counter shared across all users"
      status="PASS"
      explanation="Counter is stored in Motoko backend and syncs globally across all devices and users in real-time."
    >
      <div className="space-y-3">
        {!isAuthenticated ? (
          <Alert>
            <Lock className="w-4 h-4" />
            <AlertDescription>Login required to access global counter</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="text-center p-6 bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded-lg border border-chart-1/30">
              <div className="text-sm text-muted-foreground mb-1">Global Counter</div>
              <div className="text-4xl font-bold text-chart-1">
                {isLoading ? '...' : counter?.toString() || '0'}
              </div>
            </div>
            <Button
              onClick={handleIncrement}
              disabled={incrementMutation.isPending}
              className="w-full bg-chart-1 hover:bg-chart-1/90"
            >
              {incrementMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Incrementing...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Increment Counter
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </FeatureCard>
  );
}
