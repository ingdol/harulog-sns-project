import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { followUser } from "../api";

export const useFollowUser = () => {
  // const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.id;

  return useMutation({
    mutationFn: (followingId: string) =>
      followUser(userId as string, followingId),
    onSuccess: () => {
      // queryClient.invalidateQueries(["following", userId]);
      // queryClient.invalidateQueries(["followers", userId]);
    },
    onError: (error) => {
      console.error("팔로우에 실패했습니다:", error);
    },
  });
};
