import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { unfollowUser } from "../api";

export const useUnfollowUser = () => {
  // const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.id;

  return useMutation({
    mutationFn: (followingId: string) =>
      unfollowUser(userId as string, followingId),
    onSuccess: () => {
      // 팔로잉과 팔로워 목록을 최신화
      // queryClient.invalidateQueries(["following", userId]);
      // queryClient.invalidateQueries(["followers", userId]);
    },
    onError: (error) => {
      console.error("언팔로우에 실패했습니다:", error);
    },
  });
};
