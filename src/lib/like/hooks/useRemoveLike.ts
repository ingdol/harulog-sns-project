import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeLike } from "../api";
import { LIKE_STATUS_KEY } from "../key";

export const useRemoveLike = (feedId: number) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.id;

  return useMutation({
    mutationFn: () => removeLike(feedId, userId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIKE_STATUS_KEY, feedId, userId],
      });
    },
    onError: (error) => {
      console.error("Failed to remove like:", error);
    },
  });
};
