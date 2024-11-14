import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike } from "../api";
import { LIKE_STATUS_KEY } from "../key";

export const useAddLike = (feedId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addLike(feedId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIKE_STATUS_KEY, feedId],
      });
    },
    onError: (error) => {
      console.error("Failed to add like:", error);
    },
  });
};
