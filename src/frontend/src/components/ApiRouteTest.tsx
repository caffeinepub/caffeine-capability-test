import { useState } from 'react';
import { useActor } from '../hooks/useActor';
import FeatureCard from './FeatureCard';
import { Button } from '@/components/ui/button';
import { Server, Loader2 } from 'lucide-react';

export default function ApiRouteTest() {
  const { actor } = useActor();
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const result = await actor.testJsonResponse();
      setResponse(result);
    } catch (e: any) {
      setResponse(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeatureCard
      title="API Route / Backend Test"
      description="Test Motoko canister method endpoints"
      status="PASS"
      explanation="Motoko canisters provide backend functionality through actor methods, not traditional REST routes."
    >
      <div className="space-y-3">
        <Button onClick={testBackend} disabled={loading || !actor} className="w-full bg-chart-4 hover:bg-chart-4/90">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calling...
            </>
          ) : (
            <>
              <Server className="w-4 h-4 mr-2" />
              Call Backend Method
            </>
          )}
        </Button>

        {response && (
          <div className="p-3 bg-muted/30 rounded border border-border/30">
            <div className="text-xs font-semibold text-muted-foreground mb-1">Response:</div>
            <pre className="text-xs whitespace-pre-wrap break-words">{response}</pre>
          </div>
        )}
      </div>
    </FeatureCard>
  );
}
