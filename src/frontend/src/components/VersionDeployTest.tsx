import { useState, useEffect } from 'react';
import FeatureCard from './FeatureCard';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Package } from 'lucide-react';

const CHANGELOG_KEY = 'caffeine-changelog';

export default function VersionDeployTest() {
  const [changelog, setChangelog] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(CHANGELOG_KEY);
    if (stored) {
      setChangelog(stored);
    }
  }, []);

  const handleChangelogUpdate = (value: string) => {
    setChangelog(value);
    localStorage.setItem(CHANGELOG_KEY, value);
  };

  return (
    <FeatureCard
      title="Version / Deploy Test"
      description="App version and deployment info"
      status="PASS"
      explanation="Version number is displayed and changelog persists locally. Deployment info shows current environment."
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-chart-1/20 to-chart-2/20 rounded border border-chart-1/30">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-chart-1" />
            <span className="font-semibold">Version</span>
          </div>
          <span className="text-2xl font-bold text-chart-1">v1.0</span>
        </div>

        <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded border border-border/30">
          <div>Environment: {import.meta.env.MODE}</div>
          <div>Build: {import.meta.env.DEV ? 'Development' : 'Production'}</div>
        </div>

        <div>
          <Label htmlFor="changelog" className="text-xs">
            Changelog (editable)
          </Label>
          <Textarea
            id="changelog"
            value={changelog}
            onChange={(e) => handleChangelogUpdate(e.target.value)}
            placeholder="Enter changelog notes..."
            rows={4}
            className="text-xs"
          />
        </div>
      </div>
    </FeatureCard>
  );
}
