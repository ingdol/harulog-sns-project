import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeLike } from "../api";
import { LIKE_STATUS_KEY } from "../key";

export const useRemoveLike = (feedId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeLike(feedId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIKE_STATUS_KEY, feedId],
      });
    },
    onError: (error) => {
      console.error("Failed to remove like:", error);
    },
  });
};
