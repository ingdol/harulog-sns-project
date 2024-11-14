import { useMutation } from "@tanstack/react-query";
import { followUser } from "../api";

export const useFollowUser = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followingId: string) => followUser(followingId),
    onSuccess: () => {
      // queryClient.invalidateQueries(["following", userId]);
      // queryClient.invalidateQueries(["followers", userId]);
    },
    onError: (error) => {
      console.error("팔로우에 실패했습니다:", error);
    },
  });
};
