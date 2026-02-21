import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Entry } from '../backend';

export function useGetLeaderboard() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Entry[]>({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddLeaderboardEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, score }: { name: string; score: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addLeaderboardEntry(name, score);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
}
