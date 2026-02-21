import { useState } from 'react';
import FeatureCard from './FeatureCard';
import { Button } from '@/components/ui/button';
import { Globe, Loader2 } from 'lucide-react';

export default function ExternalApiFetchTest() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (!response.ok) throw new Error('Failed to fetch');
      const json = await response.json();
      setData(json);
    } catch (e: any) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const status = error ? 'NOT SUPPORTED' : 'PASS';

  return (
    <FeatureCard
      title="External API Fetch Test"
      description="Fetch data from public REST API"
      status={status}
      explanation="Frontend can make HTTP requests to public APIs. Backend Motoko cannot access external APIs."
    >
      <div className="space-y-3">
        <Button onClick={fetchData} disabled={loading} className="w-full bg-chart-3 hover:bg-chart-3/90">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Fetching...
            </>
          ) : (
            <>
              <Globe className="w-4 h-4 mr-2" />
              Fetch Data
            </>
          )}
        </Button>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded text-sm text-destructive">
            Error: {error}
          </div>
        )}

        {data && (
          <div className="p-3 bg-muted/30 rounded border border-border/30 max-h-40 overflow-y-auto">
            <pre className="text-xs whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </FeatureCard>
  );
}
