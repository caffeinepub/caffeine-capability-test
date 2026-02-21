import { useState, useEffect } from 'react';
import FeatureCard from './FeatureCard';
import { Link2, Unlock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function UrlStateTest() {
  const [params, setParams] = useState<Record<string, string>>({});
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramsObj: Record<string, string> = {};
    urlParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    setParams(paramsObj);
    setIsUnlocked(urlParams.get('code') === '237');
  }, []);

  return (
    <FeatureCard
      title="URL State / Query Parameter Test"
      description="Read query parameters from URL"
      status="PASS"
      explanation="URL query parameters work reliably in React. Add ?code=237 to the URL to unlock the hidden section."
    >
      <div className="space-y-3">
        <div className="p-3 bg-muted/30 rounded border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold">Detected Parameters:</span>
          </div>
          {Object.keys(params).length > 0 ? (
            <div className="space-y-1">
              {Object.entries(params).map(([key, value]) => (
                <div key={key} className="text-xs">
                  <span className="font-mono text-chart-1">{key}</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="font-mono">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">No query parameters detected</div>
          )}
        </div>

        {isUnlocked ? (
          <Alert className="bg-chart-2/10 border-chart-2/30">
            <Unlock className="w-4 h-4 text-chart-2" />
            <AlertDescription className="text-chart-2">
              🎉 Hidden section unlocked! You found the secret code.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="text-xs text-muted-foreground text-center p-2">
            Add <span className="font-mono text-chart-1">?code=237</span> to the URL to unlock
          </div>
        )}
      </div>
    </FeatureCard>
  );
}
