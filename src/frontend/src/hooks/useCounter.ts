import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetCounter() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['counter'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCounter();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useIncrementCounter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.incrementAndGetCounter();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counter'] });
    },
  });
}
