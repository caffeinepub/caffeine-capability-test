import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetLeaderboard, useAddLeaderboardEntry } from '../hooks/useLeaderboard';
import FeatureCard from './FeatureCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trophy, Loader2, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LeaderboardTest() {
  const { identity } = useInternetIdentity();
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const { data: leaderboard, isLoading } = useGetLeaderboard();
  const addEntry = useAddLeaderboardEntry();

  const isAuthenticated = !!identity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scoreNum = parseInt(score);
    if (name.trim() && !isNaN(scoreNum) && scoreNum >= 0) {
      addEntry.mutate(
        { name: name.trim(), score: BigInt(scoreNum) },
        {
          onSuccess: () => {
            setName('');
            setScore('');
          },
        }
      );
    }
  };

  return (
    <FeatureCard
      title="Leaderboard Test"
      description="Global leaderboard shared across all users"
      status="PASS"
      explanation="Leaderboard entries are stored in Motoko backend and visible to all users globally."
    >
      <div className="space-y-3">
        {!isAuthenticated ? (
          <Alert>
            <Lock className="w-4 h-4" />
            <AlertDescription>Login required to add entries</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <Label htmlFor="lb-name" className="text-xs">
                Name
              </Label>
              <Input
                id="lb-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={addEntry.isPending}
              />
            </div>
            <div>
              <Label htmlFor="lb-score" className="text-xs">
                Score
              </Label>
              <Input
                id="lb-score"
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="0"
                min="0"
                disabled={addEntry.isPending}
              />
            </div>
            <Button type="submit" className="w-full bg-chart-2 hover:bg-chart-2/90" disabled={addEntry.isPending}>
              {addEntry.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Entry'
              )}
            </Button>
          </form>
        )}

        <div className="border-t border-border/50 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-chart-5" />
            <span className="text-sm font-semibold">Top Scores</span>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {isLoading ? (
              <div className="text-sm text-muted-foreground text-center py-2">Loading...</div>
            ) : leaderboard && leaderboard.length > 0 ? (
              leaderboard.slice(0, 5).map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm p-2 bg-muted/30 rounded">
                  <span className="flex items-center gap-2">
                    <span className="text-chart-5 font-bold">#{idx + 1}</span>
                    <span>{entry.name}</span>
                  </span>
                  <span className="font-semibold text-chart-1">{entry.score.toString()}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-2">No entries yet</div>
            )}
          </div>
        </div>
      </div>
    </FeatureCard>
  );
}
