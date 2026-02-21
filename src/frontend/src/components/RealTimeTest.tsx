import FeatureCard from './FeatureCard';
import { Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RealTimeTest() {
  return (
    <FeatureCard
      title="Real-Time Test"
      description="WebSocket-based real-time updates"
      status="NOT SUPPORTED"
      explanation="WebSockets and Socket.io are not supported on the Internet Computer platform. Use polling or query-based updates for near-real-time functionality."
    >
      <Alert className="bg-destructive/10 border-destructive/30">
        <Zap className="w-4 h-4 text-destructive" />
        <AlertDescription className="text-destructive">
          Real-time WebSocket connections are not available. Alternative: Implement polling with React Query's refetchInterval
          for near-real-time updates.
        </AlertDescription>
      </Alert>
    </FeatureCard>
  );
}
