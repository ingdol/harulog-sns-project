import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike } from "../api";
import { LIKE_STATUS_KEY } from "../key";

export const useAddLike = (feedId: number) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.id;

  return useMutation({
    mutationFn: () => addLike(feedId, userId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LIKE_STATUS_KEY, feedId, userId],
      });
    },
    onError: (error) => {
      console.error("Failed to add like:", error);
    },
  });
};
