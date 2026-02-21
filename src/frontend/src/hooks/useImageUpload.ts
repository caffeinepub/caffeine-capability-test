import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';

export function useGetAllImages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      if (!actor) return [];
      const images = await actor.getAllImages();
      return Promise.all(
        images.map(async (img) => {
          const metadata = await actor.getImageMetadata(img.imageId);
          if (!metadata) return null;
          return {
            imageId: img.imageId,
            name: img.name,
            contentType: img.contentType,
            url: metadata.blob.getDirectURL(),
          };
        })
      ).then((results) => results.filter((r) => r !== null));
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUploadImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      filename,
      contentType,
      bytes,
      onProgress,
    }: {
      filename: string;
      contentType: string;
      bytes: Uint8Array;
      onProgress: (percentage: number) => void;
    }) => {
      if (!actor) throw new Error('Actor not available');
      // Cast to the expected type for ExternalBlob.fromBytes
      const typedBytes = new Uint8Array(bytes.buffer) as Uint8Array<ArrayBuffer>;
      const blob = ExternalBlob.fromBytes(typedBytes).withUploadProgress(onProgress);
      return actor.uploadImage(filename, contentType, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
}
